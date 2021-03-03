const {EventEmitter} = require('events');
const {Rotate} = require('./customEvents');
const {processSize} = require('../util/configProcessors');

class ThresholdTrigger extends EventEmitter {
    constructor(threshold) {
        super();
        this._threshold = processSize(threshold);
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