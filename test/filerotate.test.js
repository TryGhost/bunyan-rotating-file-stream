const sinon = require('sinon');
const assert = require('assert');
const sandbox = sinon.createSandbox();
const bunyan = require('bunyan');

const RotatingFileStream = require('../index');
const testConfig = {
    path: 'logs/foo.log',
    totalFiles: 10,
    threshold: '1k',
    rotateExisting: true,
    gzip: true
};

describe('RotatingFileStream', function () {
    afterEach(function () {
        sandbox.restore();
    });

    it('Processes client configuration', async function () {
        const rfs = new RotatingFileStream(testConfig);
        assert.strictEqual(rfs._path, 'logs/foo.log');
        await rfs.end();
    });

    it('Writes log files', async function () {
        const stream = new RotatingFileStream(testConfig);
        const logger = bunyan.createLogger({
            name: 'foo',
            streams: [{
                stream
            }]
        });
        setTimeout(async () => {
            for (let i = 0; i < 100; i++) {
                logger.info('Testing ' + i);
            }
            await stream.end();
        }, 1000);
    });
});
