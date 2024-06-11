import axios from 'axios';
import https from 'https';
import http from 'http';

export default function download(urlStr, w, progress = () => {
}, proxy = '') {
  return new Promise((resolve, reject) => {

    progress(0);

    const options = {
      url: urlStr,
      method: 'GET',
      responseType: 'stream',
      onDownloadProgress: (progressEvent) => {
        const totalLength = progressEvent.total;
        const completed = progressEvent.loaded;
        progress(completed / totalLength);
      }
    };

    if (proxy) {
      options.proxy = proxy;
      options.httpsAgent = new https.Agent({
        rejectUnauthorized: false
      });
      options.httpAgent = new http.Agent({
        rejectUnauthorized: false
      });
    }

    axios(options)
      .then(response => {
        response.data.pipe(w);
        response.data.on('end', resolve);
        response.data.on('error', reject);
      })
      .catch(reject);
  });
}
