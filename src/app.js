import Cell from './cell.js';
import recursiveBackTrack from './algos/recursiveBacktracking.js';
import kruskal from './algos/kruskal.js'
import Algorithm from './algos/algorithm.js';
import {drawGrid} from './canvas_functions.js';

let width = 10;
let height = 10;
const cellSize = 20;
const algorithms = {"recursive backtrack": recursiveBackTrack, "kruskal's": kruskal};
let cells = [];
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let algo = {};


let widthInput = window.document.getElementById("width");
let handleChangeWidth = (e) => {
    widthInput.value = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : 0;
    width = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : 0;
}
widthInput.addEventListener("input", handleChangeWidth)
widthInput.addEventListener("focus", () => {widthInput.value = ''});
widthInput.addEventListener("focusout", () => {widthInput.value = width});


let heightInput = window.document.getElementById("height");
let handleChangeHeight = (e) => {
    heightInput.value = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : 0;
    height = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : 0;
}
heightInput.addEventListener("input", handleChangeHeight)
heightInput.addEventListener("focus", () => {heightInput.value = ''});
heightInput.addEventListener("focusout", () => {heightInput.value = height});

let startBtn = window.document.getElementById("startBtn");
let handleClickStartBtn = () => {
    pauseBtn.innerHTML = 'pause';
    pauseBtn.removeEventListener('click', handleClickContinueBtn);
    pauseBtn.addEventListener('click', handleClickPauseBtn);
    pauseBtn.disabled = false;
    if(algo instanceof Algorithm) {
        algo.pause();
    }
    init();
    let algoSelect = document.getElementById("algorithms");
    let algoClass = algorithms[algoSelect.options[algoSelect.selectedIndex].text];
    algo = new algoClass(cells, cellSize, width, height, 1000 / runSpeedSlider.value, disablePause);
    algo.execute(0,0);
};
startBtn.addEventListener("click", handleClickStartBtn);

let disablePause = () => {
    pauseBtn.disabled = true;
}

let pauseBtn = window.document.getElementById('pauseBtn');
let handleClickPauseBtn = () => {
    algo.pause();
    pauseBtn.innerHTML = 'continue';
    pauseBtn.removeEventListener('click', handleClickPauseBtn);
    pauseBtn.addEventListener('click', handleClickContinueBtn);
};
pauseBtn.addEventListener("click", handleClickPauseBtn);


let handleClickContinueBtn = () => {
    pauseBtn.innerHTML = 'pause';
    pauseBtn.removeEventListener('click', handleClickContinueBtn);
    pauseBtn.addEventListener('click', handleClickPauseBtn);
    algo.continue();
}

let finishBtn = window.document.getElementById("finishBtn");
let handleClickFinishBtn = () => {
    if(!(algo instanceof Algorithm) || algo.width !== width || algo.height !== height) {
        init();
        let algoSelect = document.getElementById("algorithms");
        let algoClass = algorithms[algoSelect.options[algoSelect.selectedIndex].text];
        algo = new algoClass(cells, cellSize, width, height, 1000 / runSpeedSlider.value, disablePause);
    }
    algo.finishUp();
};
finishBtn.addEventListener("click", handleClickFinishBtn);

let stepBtn = window.document.getElementById("stepBtn");
let handleClickStepBtn = () => {
    if(!(algo instanceof Algorithm) || algo.width !== width || algo.height !== height) {
        init();
        let algoSelect = document.getElementById("algorithms");
        let algoClass = algorithms[algoSelect.options[algoSelect.selectedIndex].text];
        algo = new algoClass(cells, cellSize, width, height, 1000 / runSpeedSlider.value, disablePause);
    }
    algo.step();
}
stepBtn.addEventListener('click', handleClickStepBtn);

let resetBtn = window.document.getElementById('resetBtn');
let handleClickResetBtn = () => {
    init();
    let algoSelect = document.getElementById("algorithms");
    let algoClass = algorithms[algoSelect.options[algoSelect.selectedIndex].text];
    algo = new algoClass(cells, cellSize, width, height, 1000 / runSpeedSlider.value, disablePause);
}
resetBtn.addEventListener('click', handleClickResetBtn);

let runSpeedSlider = window.document.getElementById("runSpeed");
runSpeedSlider.addEventListener("change", () => {
    algo.runSpeed = 1000 / runSpeedSlider.value;
})

let init = () => {
    // I think I might need to do this for the clearing of the edges
    ctx.canvas.width = width * cellSize + 1;
    ctx.canvas.height = height * cellSize + 1;
    cells = [];
    for(let i = 0; i <= width * height - 1; i++) {
        let set = {id: i}
        cells[i] = {visited: false, set: [i]};
    }
    drawGrid(height, width, cellSize)
}
init()


let algoSelect = document.getElementById("algorithms");
for (algo in algorithms) {
    let option = document.createElement("option");
    option.text = algo;
    algoSelect.options.add(option);
}
