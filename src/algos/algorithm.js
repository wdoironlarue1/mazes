import {drawPath, saveMaze} from '../canvas_functions.js';

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

    /**
     * Do a depth first search from a random node and use the end of the longest path as the starting node
     * do another dfs and the resulting longest path will be the maze's longest path
     * 
     * returns an array of nodes
     */
    longestPath = () => {
        saveMaze();
        let startNodePromise = this.getFurthestAwayNode((Math.random() * this.cells.length) | 0);
        startNodePromise.then((startNode) => {
            let endNodePromise = this.getFurthestAwayNode(startNode.y * this.width + startNode.x);

            endNodePromise.then((endNode) => {
                drawPath([...endNode.path, endNode]);
            })
        })
    }

    getFurthestAwayNode = async (index) => {
        this.cells.forEach(cell => {cell.visited = false})
        let furthestAway = {x: index % this.width, y: Math.floor(index / this.width), dist: 0, path: []};
        let stack = [furthestAway];
        let current = {};
        while(stack.length > 0) {
            current = stack.pop();
            this.cells[current.y * this.width + current.x].visited = true;
            let neigbors = this.getUnvisitedNeighbors(current);
            stack = stack.concat(neigbors);
            if(current.dist > furthestAway.dist) {
                furthestAway = current;
            }
            drawPath([...current.path, current]);
        }
        return furthestAway;
    }

    getUnvisitedNeighbors = (cell) => {
        let walls = this.cells[cell.y * this.width + cell.x].walls;
        let neighbors = [];
        let path = cell.path.slice();
        path.push(cell);
        if (!(walls & 0b1000) && !this.cells[(cell.y - 1) * this.width + cell.x].visited) {
            neighbors.push({x: cell.x, y: cell.y - 1, dist: cell.dist + 1, path});
        }
        if (!(walls & 0b0100) && !this.cells[cell.y * this.width + cell.x + 1].visited) {
            neighbors.push({x: cell.x + 1, y: cell.y, dist: cell.dist + 1, path});
        }
        if (!(walls & 0b0010) && !this.cells[(cell.y + 1) * this.width + cell.x].visited) {
            neighbors.push({x: cell.x, y: cell.y + 1, dist: cell.dist + 1, path});
        }
        if (!(walls & 0b0001) && !this.cells[cell.y * this.width + cell.x - 1].visited) {
            neighbors.push({x: cell.x - 1, y: cell.y, dist: cell.dist + 1, path});
        }
        return neighbors
    }

    breakWall = (p1, p2) => {
        //making p1 the upmost or leftmost point for easier code
        if(p1.x > p2.x || p1.y > p2.y) {
            let temp = p1;
            p1 = p2;
            p2 = temp;
        }
        const cell1 = this.cells[p1.y * this.width + p1.x];
        const cell2 = this.cells[p2.y * this.width + p2.x];
        if (p1.x === p2.x) {
            cell1.walls = cell1.walls & 0b1101;
            cell2.walls = cell2.walls & 0b0111;
        } else if (p1.y === p2.y) {
            cell1.walls = cell1.walls & 0b1011;
            cell2.walls = cell2.walls & 0b1110;
        }
    }
}

export default Algorithm