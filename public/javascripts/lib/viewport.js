var xoffset = 0
var yoffset = 0
var modifier = 10
var scale = 1
var theta = 0
var prime1 = 20023
var prime2 = 40063

getViewport = function(coords) {
	result = coords;
	// translation + scaling
	result = [(result[0]+xoffset-xmax/2)*scale+xmax/2, (result[1]+yoffset-ymax/2)*scale+ymax/2]
	// rotation
	result = [(result[0]-xmax/2)*Math.cos(theta) - (result[1]-ymax/2)*Math.sin(theta) + xmax/2, (result[0]-xmax/2)*Math.sin(theta) + (result[1] - ymax/2)*Math.cos(theta) + ymax/2]
	return result;
}

updateViewport = function(domID) {
	$(domID).empty();
	render();
}

multiplyModifier = function(multiple) {
	modifier*=multiple;
}

divideModifier = function(multiple) {
	modifier/=multiple;
}

moveRight = function() {
	xoffset+=modifier;
}

moveLeft = function() {
	xoffset-=modifier;
}

moveUp = function() {
	yoffset-=modifier;
}

moveDown = function() {
	yoffset+=modifier;
}

moveForward = function() {
	scale+=0.1;
}

moveBackward = function() {
	scale-=0.1;
}

rotateRight = function() {
	theta-=0.1;
}

rotateLeft = function() {
	theta+=0.1;
}

incPrime1 = function() {
	prime1++;
}

decPrime1 = function() {
	prime1--;
}

getMotionFunctions = function() {
	return [moveRight, moveLeft, moveUp, moveDown, moveForward, moveBackward, rotateRight, rotateLeft];
}
