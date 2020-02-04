//
// A SVG.js-equivalent canvas wrapper
//

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function clearCanvas(canvas, id) {
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,xmax,ymax);
}
