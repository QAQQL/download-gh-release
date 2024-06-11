# Fetch Github Release

A node module to download Github release assets. It will also uncompress zip files.

```
$ fetch-gh-release -s darwin-x64 electron electron
Downloading electron/electron@v1.3.1...
electron-v1.3.1-darwi... ▇▇▇▇▇---------------------------------------------------- 662.8s
electron-v1.3.1-darwi... ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇--------- 13.4s
electron-v1.3.1-darwi... ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇--- 3.6s
ffmpeg-v1.3.1-darwin-... ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 0.0s
```

This is useful for instance if you have a project that depends on binaries released via Github.

## Command line

### Installation

```bash
npm install -g fetch-gh-release --registry=https://registry.npmjs.org/
```

### Usage

```
Usage: fetch-gh-release [options] <user> <repo> [outputdir]

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -p, --prerelease       download prerelease
  -s, --search <regexp>  filter assets name
  -z, --zipped           don't extract zip files
  --proxy                use proxy setting like 'http://127.0.0.1:7890'
```

### Example

Download `electron/electron` assets whose name contains `darwin-x64` to `/tmp`.

```
$ fetch-gh-release -s darwin-x64 electron electron /tmp
```


Download `electron/electron` use proxy `http://127.0.0.1:7890` to `/tmp`.

```
$ fetch-gh-release --proxy 'http://127.0.0.1:7890' electron electron /tmp
```
## API

### Installation

```bash
npm install --save fetch-gh-release --registry=https://registry.npmjs.org/
```

### Usage

```javascript
var downloadRelease = require('fetch-gh-release');

var user = 'some user';
var repo = 'some repo';
var outputdir = 'some output directory';
var leaveZipped = false;

// Define a function to filter releases.
function filterRelease(release) {
  // Filter out prereleases.
  return release.prerelease === false;
}

// Define a function to filter assets.
function filterAsset(asset) {
  // Select assets that contain the string 'windows'.
  return asset.name.indexOf('windows') >= 0;
}

downloadRelease(user, repo, outputdir, filterRelease, filterAsset, leaveZipped)
  .then(function () {
    console.log('All done!');
  })
  .catch(function (err) {
    console.error(err.message);
  });
```
