/*
recursive backtrack algorithm:
pick a cell to start from
mark it as visited
choose a random valid neighbor
remove the wall separating the two
put current node on the stack
call the function for the neighbor
if there are no valid nieghbors pop the stack and call the function on the popped value
if the stack is empty, return

*/

import Algorithm from './algorithm.js';
import {drawGrid, removeEdge} from '../canvas_functions.js';

class recursiveBackTrack extends Algorithm {   
    stack = [];  
    currentCell = {x:0, y:0};
    timeout;

    execute = () => {
        let x = this.currentCell.x;
        let y = this.currentCell.y;
        this.cells[y * this.width + x].visited = true;
        let neighbors = this.getValidNeighBors(x, y);
        //grab a random neighbor, remove the wall between the two, recursively call this algo
        if(neighbors.length > 0) {
            let rand = neighbors[Math.floor(Math.random() * neighbors.length)];
            removeEdge({x, y},{x: rand.x, y: rand.y}, this.cellSize);
            this.stack.push({x,y});
            this.currentCell = rand;
            if(this.finish) {
                this.execute(rand.x, rand.y);
            } else {
                this.timeout = setTimeout(() => this.execute(rand.x, rand.y), this.runSpeed);
            }
        } else if(this.stack.length === 0) {
            this.callBack();
            return true;
        } else {
            this.currentCell = this.stack.pop();
            this.execute();
        }
    }
    
    getValidNeighBors = (x, y) => {
        let validNeighBors = [];
        if(x > 0 && !this.cells[y * this.width + x - 1].visited) {
            validNeighBors.push({x: x-1, y: y});
        }
        if(y > 0 && !this.cells[(y-1) * this.width + x].visited) {
            validNeighBors.push({x: x, y: y-1})
        }
        if(x < this.width - 1 && !this.cells[y * this.width + x + 1].visited) {
            validNeighBors.push({x: x+1, y: y});
        }
        if(y < this.height - 1 && !this.cells[(y+1) * this.width + x].visited) {
            validNeighBors.push({x: x, y: y+1});
        }
        return validNeighBors;
    }

    pause = () => {
        clearTimeout(this.timeout);
    }

    continue = () => {
        this.execute(this.currentCell.x, this.currentCell.y)
    }

    step = () => {
        let x = this.currentCell.x;
        let y = this.currentCell.y;
        this.cells[y * this.width + x].visited = true;
        let neighbors = this.getValidNeighBors(x, y);

        //grab a random neighbor, remove the wall between the two, recursively call this algo
        if(neighbors.length > 0) {
            let rand = neighbors[Math.floor(Math.random() * neighbors.length)];
            removeEdge({x, y},{x: rand.x, y: rand.y}, this.cellSize);
            this.stack.push({x,y});
            this.currentCell = rand;
        } else if(this.stack.length === 0) {
            this.callBack();
            return true;
        } else {
            this.currentCell = this.stack.pop();
            this.step()
        }
    }

    finishUp = () => {
        if(this.stack.length === 0) {
            this.cells.forEach(cell => {
                cell.visited = false;
            });
            this.currentCell = {x: 0, y: 0};
            drawGrid(this.height, this.width, this.cellSize);
        }
        this.finish = true;
        clearTimeout(this.timeout);
        this.execute(this.currentCell.x, this.currentCell.y);
    }
}

export default recursiveBackTrack;