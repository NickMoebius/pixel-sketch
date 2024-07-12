const canvas = document.querySelector("#canvas");


function pixelGenerator() {
    for (let i = 1; i <= 256; i++) { 
        let pixel = document.createElement('div'); 
    
        pixel.className = 'pixel';
        pixel.id = 'pixel' + i;
    
        canvas.appendChild(pixel);
        console.log(`Pixel${i} loaded!`)
    }
}



document.addEventListener("DOMContentLoaded", (event) => {
    pixelGenerator(); 
});