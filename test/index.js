import downloadRelease from '../src';

describe('fetch-gh-release', () => {
  it('should expose a function', () => {
    downloadRelease.should.be.a.Function();
  });
});
