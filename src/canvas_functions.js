const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
let imgData;

//p1 and p2 represent cells on the grid
export const removeEdge = (p1, p2, cellSize) => {
    //p1 needs to be the point upmost or leftmost
    if(p1.x > p2.x || p1.y > p2.y) {
        let temp = p1;
        p1 = p2;
        p2 = temp;
    }

    if(p1.x === p2.x) {
        ctx.clearRect((p2.x+.05) * cellSize, (p2.y * cellSize) - 1, cellSize - (.1 * cellSize), 2);
    }
    else {
        ctx.clearRect((p2.x-.05) * cellSize, (p2.y * cellSize) + 1, 2, cellSize - (.1 * cellSize));
    }
}


export const drawGrid = (height, width, cellSize) => {
    ctx.clearRect(0, 0, c.width, c.height);
    for(let i = 0; i <= width; i++) {
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, height * cellSize);
        ctx.stroke();
    }
    for(let i = 0; i <= height; i++) {
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(width * cellSize, i * cellSize);
        ctx.stroke();
    }
}

export const drawPath = (path) => {
    restoreMaze();
    ctx.globalCompositeOperation = 'destination-over';
    // ctx.fillStyle = "#ffffff";
    // ctx.fillRect(0, 0, c.width, c.height)
    for(let i = 0; i < path.length; i++) {
        if(i === 0 || i === path.length - 1) {
            ctx.fillStyle = "#0000ff";
        } else {
            ctx.fillStyle = "#FF0000";
        }
        ctx.fillRect(path[i].x * 20, path[i].y * 20, 20, 20);
    }
    // restoreMaze();
}

export const saveMaze = () => {
    imgData = ctx.getImageData(0, 0, c.width, c.height);
}

const restoreMaze = () => {
    ctx.putImageData(imgData, 0, 0);
}
