

class Algorithm {
    constructor(cells, cellSize, width, height, runSpeed, callBack) {
        this.cells = cells;
        this.cellSize = cellSize;
        this.width = width;
        this.height = height;
        this.finish = false;
        this.callBack = () => {};
        this.runSpeed = runSpeed;
        this.callBack = callBack;
    }
}

export default Algorithm