const {EventEmitter} = require('events');
const {Rotate} = require('./customEvents');

const processThreshold = (threshold) => {
    const multipliers = {
        b: 1,
        k: 1024,
        m: 1024 * 1024,
        g: 1024 * 1024 * 1024
    };
    
    if (typeof (threshold) === 'string') {
        const [num, unit] = /^([1-9][0-9]*)([bkmg])$/.exec(threshold).slice(1);
        return Number(num) * multipliers[unit];
    } else {
        return threshold;
    }
};

class ThresholdTrigger extends EventEmitter {
    constructor(threshold) {
        super();
        this._threshold = processThreshold(threshold);
        this._totalWritten = 0;
    }

    newFile() {
        this._totalWritten = 0;
    }

    updateWritten(bytes) {
        this._totalWritten += bytes;
        if (this._totalWritten > this._threshold) {
            this.emit(Rotate);
        }
    }

    shutdown() {
        // no-op
    }
}

module.exports = ThresholdTrigger;