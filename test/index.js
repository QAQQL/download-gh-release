import downloadRelease from '../src';

describe('download-gh-release', () => {
  it('should expose a function', () => {
    downloadRelease.should.be.a.Function();
  });
});
