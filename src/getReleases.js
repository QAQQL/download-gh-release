import axios from 'axios';
import https from 'https';
import http from 'http';

export default function getReleases(user, repo, proxy = '') {
  const url = `https://api.github.com/repos/${user}/${repo}/releases`;

  return new Promise((resolve, reject) => {

    const options = {
      url: url,
      method: 'GET'
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
        resolve(response.data);
      })
      .catch(reject);
  });
}
