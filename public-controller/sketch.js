const URL = `http://${window.location.hostname}:5050`;
let socket = io(URL, { path: '/real-time' });

let directions = null;

function setup() {
    frameRate(16);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    ellipse(windowWidth / 2, windowHeight / 3, 50, 50);
    ellipse(windowWidth / 2, windowHeight / 1.5, 50, 50);
    ellipse(windowWidth / 1.5, windowHeight / 2, 50, 50);
    ellipse(windowWidth / 3, windowHeight / 2, 50, 50);
}

function mousePressed() {
    if(pmouseX > (windowWidth / 2) -25 && pmouseX < (windowWidth / 2) + 25 &
    pmouseY > (windowHeight / 3)-25 && pmouseY < (windowHeight / 3) + 25){
        directions = 'UP';
        console.log(directions);
    }

    if(pmouseX > (windowWidth / 2)-25 && pmouseX < (windowWidth / 2) + 25 &
    pmouseY > (windowHeight / 1.5)-25 && pmouseY < (windowHeight / 1.5) + 25){
        directions = 'DOWN';
        console.log(directions);
    }

    if(pmouseX > (windowWidth / 1.5)-25 && pmouseX < (windowWidth / 1.5) + 25 &
    pmouseY > (windowHeight / 2)-25 && pmouseY < (windowHeight / 2) + 25){
        directions = 'RIGHT';
        console.log(directions);
    }

    if(pmouseX > (windowWidth / 35)-25 && pmouseX < (windowWidth / 3) + 25 &
    pmouseY > (windowHeight / 2)-25 && pmouseY < (windowHeight / 2) + 25){
        directions = 'LEFT';
        console.log(directions);
    }
    movement();
}

/*___________________________________________

1) Create a function that includes the socket method to emit the directions
_____________________________________________ */
function movement(){
    socket.emit('controller-direction', directions);
}
