const sinon = require('sinon');
const assert = require('assert');
const sandbox = sinon.createSandbox();
const bunyan = require('bunyan');
const path = require('path');
const mkdirp = require('mkdirp');

const RotatingFileStream = require('../index');
const testConfig = {
    path: 'logs/foo.log',
    totalFiles: 10,
    threshold: '1k',
    rotateExisting: true,
    gzip: true
};

describe('RotatingFileStream', function () {
    before(async function () {
        await mkdirp(path.parse(testConfig.path).dir);
    });

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

    it('Sets up period correctly', async function () {
        const stream = new RotatingFileStream({
            period: '1w',
            ...testConfig
        });
        bunyan.createLogger({
            name: 'foo',
            streams: [{
                stream
            }]
        });
        await stream.end();
    });
});
