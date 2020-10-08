let walls = [];
let particle;

let xoff = 0;
let yoff = 1000;

let width = 1200;
let height = 600;

let sceneW = width / 2;
let sceneH = height;

let sliderFov;

function setup() {
  createCanvas(width, height);
  for (let i = 0; i < 5; i++) {
    let x1 = random(sceneW);
    let y1 = random(height);
    let x2 = random(sceneW);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, height));
  walls.push(new Boundary(sceneW, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));

  particle = new Particle();
  sliderFov = createSlider(0, 360, 45);
  sliderFov.input(changeFOV);
}

function changeFOV(value) {
  const fov = sliderFov.value();
  particle.updateFOV(fov);
}

function draw() {
  if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.1);
  } else if (keyIsDown(UP_ARROW)) {
    particle.move(1);
  } else if (keyIsDown(DOWN_ARROW)) {
    particle.move(-1);
  }

  background(0);
  for (let wall of walls) {
    wall.show();
  }

  //particle.update(noise(xoff) * width, noise(yoff) * height);
  //particle.update(mouseX, mouseY);
  particle.show();
  const scene = particle.look(walls);

  push();
  translate(sceneW, 0);
  const w = sceneW / scene.length;

  for (let i = 0; i < scene.length; i++) {
    noStroke();
    const sq = scene[i] * scene[i];
    const wsq = sceneW * sceneW;
    const b = map(sq, 0, wsq, 255, 0);
    const h = map(scene[i], 0, sceneW, sceneH, 0);
    fill(b);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2, w + 1, h);
  }
  pop();
  xoff += 0.01;
  yoff += 0.01;
}
