module.exports = {
    // Emitted when a new rotation is needed
    Rotate: Symbol('rotate'),
    // Emitted when a new file descriptor is in use, after a rotation
    NewFile: Symbol('newFile'),
    // Emitted once with the 'created at' of the initial file
    FileStartTime: Symbol('fileStartTime'),
    // Emitted whenever data is written to the file with the number of bytes
    BytesWritten: Symbol('bytesWritten')
};