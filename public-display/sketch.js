const URL = `http://${window.location.hostname}:5050`;
let socket = io(URL, { path: '/real-time' });

let direction = null;

let score = 0;
let character = {
    x: 0,
    y: 0
};
let whiteMouse = {
    x: 50,
    y: 50
};
let speed = 10;

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    character.x = windowWidth / 2;
    character.y = windowHeight / 2;
}

function draw() {
    background(0, 50);
    textSize(64);
    text('🐍', character.x - 25, character.y);
    textSize(24);
    text('🐁', whiteMouse.x, whiteMouse.y);
    eatsMouse();
}


function eatsMouse() {
    if (dist(character.x, character.y, whiteMouse.x, whiteMouse.y) < 50) {
        putMouseRandomPosition();
        score += 10;
    }
}

function putMouseRandomPosition() {
    whiteMouse.x = random(50, windowWidth - 50);
    whiteMouse.y = random(50, windowHeight - 50);
}

/*___________________________________________

1) Include the socket method to listen to events and change the character position.
You may want to use a Switch structure to listen for up, down, right and left cases.
_____________________________________________ */

socket.on('display-data', data => {
    let { controllerDirections } = data;
    direction = controllerDirections;
    switch (direction) {
            case 'UP':
                character.y -=50;
                break;
            case 'DOWN':
                character.y +=50;
                break;
            case 'RIGHT':
                character.y +=50;
                break;
            case 'LEFT':
                character.y -=50;
                break;
        
            default:
                break;
        }
})

/*___________________________________________

2) Include the fetch method to post each time the snake eats a mouse
_____________________________________________ */

fetch('/score', {
    methot: 'POST',
    body: score
})
.then(response => response.json())
.catch(error => console.error('Error', error))
