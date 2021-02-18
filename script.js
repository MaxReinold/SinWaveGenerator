let waves = [];
let ang = 0;

function setup(){
  createCanvas(1880,1000);
  waves.push(new Wave(20, 3000, 0, TWO_PI * 100));
  waves.push(new Wave(10, 5000, 0, TWO_PI * 100));
  waves.push(new Wave(150, 100, 0, TWO_PI * 100));
}

function draw(){
  background(255);
  translate(width/2, height/2);
  strokeWeight(2);
  for(let a = 0; a < TWO_PI; a+=PI/180){
    let amp = 300 + waves[0].evaluate(a);
    for(let i = 1; i < waves.length; i++){
      amp+= waves[i].evaluate(a);
    }
    position = p5.Vector.fromAngle(a, amp);
    point(position.x, position.y);
  }

  for(wave in waves){
    waves[wave].phase+=.01;
  }
}

class Wave {
  constructor(amplitude, period, phase, maxLength){
    this.amplitude = amplitude;
    this.period = period;
    this.phase = phase;
    this.maxLength = maxLength;
  }

  evaluate(x){
    return sin(this.phase + x*(TWO_PI/this.maxLength * this.period))*this.amplitude;
  }
}
