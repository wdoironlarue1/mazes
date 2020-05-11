//p1 and p2 represent cells on the grid
export let removeEdge = (p1, p2, cellSize) => {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
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


export let drawGrid = (height, width, cellSize) => {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
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

