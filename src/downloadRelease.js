import os from 'os';
import fs from 'fs';
import path from 'path';
import MultiProgress from 'multi-progress';
import getReleases from './getReleases';
import getLatest from './getLatest';
import download from './download';
import extract from './extract';
import rpad from './rpad';

function pass() {
  return true;
}

function downloadRelease(
  user, repo, outputdir,
  filterRelease = pass, filterAsset = pass, leaveZipped = false, proxyUrl = ''
) {
  let proxy = '';
  const bars = new MultiProgress(process.stdout);
  if (proxyUrl) {
    const urlParts = new URL(proxyUrl);
    proxy = {
      protocol: urlParts.protocol,
      host: urlParts.hostname,
      port: urlParts.port
    };
    console.log(`Using proxy ${proxy.protocol}://${proxy.host}:${proxy.port}`);
  }

  return getReleases(user, repo, proxy)
    .then(releases => getLatest(releases, filterRelease, filterAsset))
    .then(release => {
      if (!release) {
        throw new Error(
          `could not find a release for ${user}/${repo} (${os.platform()} ${os.arch()})`
        );
      }

      console.log(`Downloading ${user}/${repo}@${release.tag_name}...`);

      const promises = release.assets.map(asset => {
        const bar = bars.newBar(`${rpad(asset.name, 24)} :bar :etas`, {
          complete: '▇',
          incomplete: '-',
          width: process.stdout.columns - 36,
          total: 100
        });

        const progress = process.stdout.isTTY ? bar.update.bind(bar) : pass;

        const destf = path.join(outputdir, asset.name);
        const dest = fs.createWriteStream(destf);

        return download(asset.browser_download_url, dest, progress, proxy)
          .then(() => {
            if (!leaveZipped && /\.zip$/.exec(destf)) {
              return extract(destf, outputdir)
                .then(() => fs.unlinkSync(destf));
            }

            return null;
          });
      });

      return Promise.all(promises);
    });
}

export default downloadRelease;
