const canvas = document.querySelector("#canvas");
const body = document.querySelector("body");

let currentSize = 16; // Default size
let currentColor = "rgba(37, 37, 37, 1)";

let isColorBtnDown = true; // Default Color Button is On
let isCanvasSizeBtnDown = false;
let isEraserBtnDown = false;
let isGridBtnDown = true; // Default Grid Button is On

function updateCanvasGrid() {
    canvas.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
}

function changeCanvasSize() {
    let canvasSizes = document.querySelector("#canvas-sizes");
    let canvasSlider = document.querySelector("#size-slider");

    canvasSlider.addEventListener('input', () => {
        currentSize = canvasSlider.value;
        canvasSizes.textContent = `${currentSize}x${currentSize}`;
        updateCanvasGrid();
        pixelGenerator();
    });
}

function pixelGenerator() {
    canvas.innerHTML = ''; // Clear the canvas

    for (let i = 1; i <= currentSize * currentSize; i++) {
        let pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.id = 'pixel' + i;

        pixel.style.width = `${400 / currentSize}px`;
        pixel.style.height = `${400 / currentSize}px`;

        if (isGridBtnDown) {
            // Determine the row and column of the pixel
            let row = Math.floor((i - 1) / currentSize);
            let col = (i - 1) % currentSize;

            // Check if the pixel should be dark or light
            if ((row + col) % 2 === 0) {
                pixel.style.backgroundColor = 'rgba(229, 229, 247, 0.25)'; // light-gray in rgb                        
            } else {
                pixel.style.backgroundColor = 'rgba(136, 136, 136, 0.25)'; // dark-gray in rgba
            }
        } else {
            pixel.style.backgroundColor = 'var(--std-grey)';
        }

        canvas.appendChild(pixel);
    }
    pixels = document.querySelectorAll(".pixel");
}

function pixelColoring() {
    let isMouseDown;

    canvas.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        let target = event.target;

        if (isMouseDown && target.classList.contains('pixel')) {
            if (isEraserBtnDown) {
                if (!isGridBtnDown) {
                    target.style.backgroundColor = 'var(--std-grey)';
                } else {
                    let row = Math.floor((parseInt(target.id.replace('pixel', '')) - 1) / currentSize);
                    let col = (parseInt(target.id.replace('pixel', '')) - 1) % currentSize;
                    if ((row + col) % 2 === 0) {
                        target.style.backgroundColor = 'rgba(229, 229, 247, 0.25)'; // light-gray in rgba                        
                    } else {
                        target.style.backgroundColor = 'rgba(136, 136, 136, 0.25)'; // dark-gray in rgba
                    }
                }
                target.style.border = "2px solid red";
                
            } else {
                target.style.backgroundColor = currentColor; 
                target.style.border = "1px solid white";
            }            
        }
    });

    canvas.addEventListener('mouseup', (event) => {
        isMouseDown = false;
    });

    canvas.addEventListener('mouseover', (event) => {
        let target = event.target;

        if (isMouseDown && target.classList.contains('pixel')) {
            if (isEraserBtnDown) {
                if (!isGridBtnDown) {
                    target.style.backgroundColor = 'var(--std-grey)';
                } else {
                    let row = Math.floor((parseInt(target.id.replace('pixel', '')) - 1) / currentSize);
                    let col = (parseInt(target.id.replace('pixel', '')) - 1) % currentSize;
                    if ((row + col) % 2 === 0) {
                        target.style.backgroundColor = 'rgba(229, 229, 247, 0.25)'; // light-gray in rgba                        
                    } else {
                        target.style.backgroundColor = 'rgba(136, 136, 136, 0.25)'; // dark-gray in rgba
                    }
                }
                target.style.border = "3px solid red";
            } else {
                target.style.backgroundColor = currentColor;
                target.style.border = "1px solid white";
            }
            
        } else {
            if (isEraserBtnDown) {
                target.style.border = "2px solid red";
            } else {
                target.style.border = "1px solid black";
            }
            
        }
    });

    body.addEventListener('mouseout', (event) => {
        let target = event.target;
        if (target.classList.contains('pixel')) {
            target.style.border = "none";
        } else {
            isMouseDown = false;
        }
    });
}

function chosenColor() {
    const colors = document.querySelectorAll(".clr-color");

    colors.forEach(colorBtn => {
        colorBtn.addEventListener('click', () => {
            colors.forEach(btn => btn.classList.remove('active'));
            colorBtn.classList.add('active');
            currentColor = colorBtn.style.backgroundColor;
        });
    });
}

function chosenTools() {
    const tools = document.querySelector("#tools");
    const colors = document.querySelector(".colors");
    const sizeOfCanvas = document.querySelector("#size-of-canvas");

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
                    colors.style.display = "flex";
                    sizeOfCanvas.style.display = "none";

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
                    sizeOfCanvas.style.display = "flex";
                    colors.style.display = "none";

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
                    gridButton(); // Update grid state
                } else {
                    isGridBtnDown = true;
                    target.classList.add('active');
                    gridButton(); // Update grid state
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

function gridButton() {
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        if (isGridBtnDown) {
            if (pixel.style.backgroundColor === 'var(--std-grey)') {
                let row = Math.floor((parseInt(pixel.id.replace('pixel', '')) - 1) / currentSize);
                let col = (parseInt(pixel.id.replace('pixel', '')) - 1) % currentSize;
                if ((row + col) % 2 === 0) {
                    pixel.style.backgroundColor = 'rgba(229, 229, 247, 0.25)'; // light-gray in rgba                    
                } else {
                    pixel.style.backgroundColor = 'rgba(136, 136, 136, 0.25)'; // dark-gray in rgba
                }
            }
        } else {
            if (pixel.style.backgroundColor === 'rgba(136, 136, 136, 0.25)' ||
                 pixel.style.backgroundColor === 'rgba(229, 229, 247, 0.25)') {
                pixel.style.backgroundColor = 'var(--std-grey)';
            }
                
        }
    });
}

function clearButton() {
    const btn = document.querySelector("#clear-btn");    

    btn.addEventListener('click', (event) => {
        let pixels = document.querySelectorAll(".pixel");
        if (!isGridBtnDown) {
            pixels.forEach(pixel => {
                pixel.style.backgroundColor = "var(--std-grey)";
            });
        } else {
            pixels.forEach(pixel => {
                let row = Math.floor((parseInt(pixel.id.replace('pixel', '')) - 1) / currentSize);
                let col = (parseInt(pixel.id.replace('pixel', '')) - 1) % currentSize;
                if ((row + col) % 2 === 0) {
                    pixel.style.backgroundColor = 'rgba(229, 229, 247, 0.25)'; // light-gray in rgba
                } else {                
                    pixel.style.backgroundColor = 'rgba(136, 136, 136, 0.25)'; // dark-gray in rgba
                }
            });
        }
    });
}

function saveButton() {
    const saveBtn = document.querySelector("#save-btn");
    saveBtn.addEventListener('click', (event) => {
        let canvasElement = document.createElement('canvas');
        canvasElement.width = currentSize * 25; // width of grid * pixel size
        canvasElement.height = currentSize * 25; // height of grid * pixel size
        let ctx = canvasElement.getContext('2d');

        let pixels = document.querySelectorAll('.pixel');
        pixels.forEach((pixel, index) => {
            let x = (index % currentSize) * 25;
            let y = Math.floor(index / currentSize) * 25;

            let color = window.getComputedStyle(pixel).backgroundColor;
            // Check if the color is one of the transparent colors
            if (
                color === 'rgba(136, 136, 136, 0.25)' ||
                color === 'rgba(229, 229, 247, 0.25)' ||
                color === 'rgba(37, 37, 37, 0.05)'
            ) {
                // Set transparent fill style
                ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Transparent color
            } else {
                // Set regular fill style
                ctx.fillStyle = color;
            }

            // Draw the rectangle
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
    updateCanvasGrid();
    changeCanvasSize();     
    chosenColor();    
    pixelColoring();
    chosenTools();
    clearButton();
    saveButton();
});
