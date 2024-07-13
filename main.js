const canvas = document.querySelector("#canvas");
const body = document.querySelector("body");


function pixelGenerator() {
    for (let i = 1; i <= 256; i++) { 
        let pixel = document.createElement('div'); 
    
        pixel.className = 'pixel';
        pixel.id = 'pixel' + i;
    
        canvas.appendChild(pixel);
        console.log(`Pixel${i} loaded!`)
    }
}

function pixelColoring() {

    let isMouseDown;    
    
    canvas.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        let target = event.target;
        
        if (isMouseDown && target.id != 'canvas') {
            console.log(target.id);
            target.style.backgroundColor = "rgba(37, 37, 37, 100%)";
            target.style.border = "1px solid white";
        }
    });

    canvas.addEventListener('mouseup', (event) => {
        isMouseDown = false;
    });

    canvas.addEventListener('mouseover', (event) => {
        let target = event.target;

        console.log(event);
        if (isMouseDown || target.style.backgroundColor === "rgba(37, 37, 37)") {            
            target.style.backgroundColor = "rgba(37, 37, 37, 100%)";
            target.style.border = "1px solid white";
        } else {
            target.style.border = "1px solid black";
        } 
    });

    body.addEventListener('mouseout', (event) => {
        let target = event.target; 
        
        if (target.className === "pixel") {
            target.style.border = "none"; 
        } else {
            isMouseDown = false;
        }
               
    });   
}

let isColorBtnDown = true;
let isCanvasSizeBtnDown = false;
let isEraserBtnDown = false;
let isGridBtnDown = false;

function chosenTools() {
    const tools = document.querySelector("#tools");
    
    tools.addEventListener('click', (event) => {
        let target = event.target;

        switch (target.id) {
            case 'color-btn':
                    if (isColorBtnDown) {
                        isColorBtnDown = false;
                        target.classList.remove('active');
                        if (target.nextElementSibling) {
                            target.nextElementSibling.classList.remove('active');
                        }
                    } else {
                        isColorBtnDown = true;
                        target.classList.add('active');
                        isCanvasSizeBtnDown = false;
                        if (target.nextElementSibling) {
                            target.nextElementSibling.classList.remove('active');
                        }
                    }
                    console.log("color-btn");
                    break;
                case 'canvas-size-btn':
                    if (isCanvasSizeBtnDown) {
                        isCanvasSizeBtnDown = false;
                        target.classList.remove('active');
                    } else {
                        isCanvasSizeBtnDown = true;
                        target.classList.add('active');
                        isColorBtnDown = false;
                        if (target.previousElementSibling) {
                            target.previousElementSibling.classList.remove('active');
                        }
                    }
                    console.log("canvas-size-btn");
                    break;
            case 'eraser-btn':
                if (isEraserBtnDown) {
                    isEraserBtnDown = false;
                    target.classList.remove('active');
                } else {
                    isEraserBtnDown = true;
                    target.classList.add('active');
                }
                console.log("eraser-btn");
                break;
            case 'grid-btn':
                if (isGridBtnDown) {
                    isGridBtnDown = false;
                    target.classList.remove('active');
                } else {
                    isGridBtnDown = true;
                    target.classList.add('active');
                }
                console.log("grid-btn");
                break;            
        }
        updateSubmenuVisibility();
    });
    
}

function updateSubmenuVisibility() {
    const submenu = document.querySelector("#tools-submenu");
    if (!isColorBtnDown && !isCanvasSizeBtnDown) {
        submenu.style.display = "none";
    } else {
        submenu.style.display = "block";
    }
}

// function colorButton() {
//     let isColorButtonDown = true;

//     const tools = document.querySelector(".tools");


//     tools.addEventListener
// }

function clearButton() {
    const btn = document.querySelector("#clear-btn");
    let pixels = document.querySelectorAll(".pixel");

    btn.addEventListener('click', (event) => {
        for (let pixel of pixels) {
            pixel.style.backgroundColor = "rgba(37, 37, 37, 5%)";
        }
        
    });      
}

function saveButton() {
    const saveBtn = document.querySelector("#save-btn");
    saveBtn.addEventListener('click', (event) => {
        let canvasElement = document.createElement('canvas');
        canvasElement.width = 16 * 25; // width of grid * pixel size
        canvasElement.height = 16 * 25; // height of grid * pixel size
        let ctx = canvasElement.getContext('2d');

        let pixels = document.querySelectorAll('.pixel');
        pixels.forEach((pixel, index) => {
            let x = (index % 16) * 25;
            let y = Math.floor(index / 16) * 25;
            let color = window.getComputedStyle(pixel).backgroundColor;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 25, 25);
        });

        let dataURL = canvasElement.toDataURL("image/png");
        let link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}


document.addEventListener("DOMContentLoaded", (event) => {
    pixelGenerator();
    pixelColoring();
    chosenTools();
    // colorButton();
    clearButton();
    saveButton();
});