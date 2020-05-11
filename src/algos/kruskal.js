 /*
Kruskal's algorithm
usually used to make a minimum spanning tree
the dividers between cells are edges
put all the edges in a collection
choose an edge at random
if the two cells connected by the edge aren't in the same set, connect them
repeat until no more edges left to check
 */

import Algorithm from './algorithm.js';
import {removeEdge, drawGrid} from '../canvas_functions.js';

const EDGE_ACROSS = 'across';
const EDGE_VERTICAL = 'vertical';

class kruskal extends Algorithm {
    edges = [];
    stop = false;

    execute = async () => {
        if(this.edges.length === 0) {
            this.loadEdges();
        }

        while (this.edges.length !== 0) {
            let edge = this.edges.splice(Math.floor(Math.random() * this.edges.length), 1)[0];
            if(edge.direction === EDGE_ACROSS) {
                if (!this.cells[edge.y * this.width + edge.x].set.includes((edge.y + 1) * this.width + edge.x)){
                    this.addToSet((edge.y + 1) * this.width + edge.x, this.cells[edge.y * this.width + edge.x].set);
                    removeEdge({x: edge.x, y: edge.y}, {x: edge.x, y: edge.y + 1}, this.cellSize);
                    if(!this.finish) {
                        await new Promise(r => setTimeout(r, this.runSpeed));
                    }
                    if (this.stop){
                        return;
                    }
                }
            }
            if (edge.direction === EDGE_VERTICAL) {
                if (!this.cells[edge.y * this.width + edge.x].set.includes(edge.y * this.width + edge.x + 1)) {
                    this.addToSet(edge.y * this.width + edge.x + 1, this.cells[edge.y * this.width + edge.x].set)
                    removeEdge({x: edge.x, y: edge.y}, {x: edge.x + 1, y: edge.y}, this.cellSize);
                    if(!this.finish) {
                        await new Promise(r => setTimeout(r, this.runSpeed));
                    }
                    if (this.stop){
                        return;
                    }
                }
            }
        };
        this.callBack();
    }

    loadEdges = () => {
        for (let i = 0; i < this.cells.length - 1; i++) {
            let x = i % this.width;
            let y = Math.floor(i / this.width);
            if (y < this.height - 1) {
                this.edges.push({x, y, direction: EDGE_ACROSS});
            }
            if (x < this.width - 1) {
                this.edges.push({x, y, direction: EDGE_VERTICAL});
            }
        }
    }

    addToSet = (cellIndex, set) => {
        set.push(...this.cells[cellIndex].set);
        let oldSet = this.cells[cellIndex].set.slice();
        for (let i = 0; i < oldSet.length; i++) {
            this.cells[oldSet[i]].set = set;
        }
    }

    pause = () => {
        this.stop = true;
    }

    continue = () => {
        this.stop = false;
        this.execute();
    }

    step = () => {
        if(this.edges.length === 0) {
            this.loadEdges();
        }
        let edgeRemoved = false;
        while(!edgeRemoved && this.edges.length !== 0) {
            let edge = this.edges.splice(Math.floor(Math.random() * this.edges.length), 1)[0];
            if(edge.direction === EDGE_ACROSS) {
                if (!this.cells[edge.y * this.width + edge.x].set.includes((edge.y + 1) * this.width + edge.x)){
                    this.addToSet((edge.y + 1) * this.width + edge.x, this.cells[edge.y * this.width + edge.x].set);
                    removeEdge({x: edge.x, y: edge.y}, {x: edge.x, y: edge.y + 1}, this.cellSize);
                    edgeRemoved = true;
                }
            }
            if (edge.direction === EDGE_VERTICAL) {
                if (!this.cells[edge.y * this.width + edge.x].set.includes(edge.y * this.width + edge.x + 1)) {
                    this.addToSet(edge.y * this.width + edge.x + 1, this.cells[edge.y * this.width + edge.x].set)
                    removeEdge({x: edge.x, y: edge.y}, {x: edge.x + 1, y: edge.y}, this.cellSize);
                    edgeRemoved = true;
                }
            }
        }
    }

    finishUp = () => {
        if (this.edges.length === 0) {
            drawGrid(this.height, this.width, this.cellSize);
            this.cells.forEach((cell, index) => {
                cell.set = [index];
            });
        }
        this.finish = true;
        this.pause();
        this.continue();
    }
}


export default kruskal