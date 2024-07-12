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

function clearButton() {
    const btn = document.querySelector("#clear-btn");
    let pixels = document.querySelectorAll(".pixel");

    btn.addEventListener('click', (event) => {
        for (let pixel of pixels) {
            pixel.style.backgroundColor = "rgba(37, 37, 37, 5%)";
        }
        
    });      
}



document.addEventListener("DOMContentLoaded", (event) => {
    pixelGenerator(),
    pixelColoring(),
    clearButton()
});