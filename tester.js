const RotatingFileStream = require('./index');
const testConfig = {
    path: 'foo.log',
    totalFiles: 10,
    threshold: '1k',
    rotateExisting: true,
    gzip: true
};

async function main() {
    const rfs = new RotatingFileStream(testConfig);
    rfs.write('Hello!\n');
    rfs.write('It\'s me again!\n');
    await rfs.end();
}

main();