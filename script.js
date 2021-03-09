let waves = [];
let ang = 0;

function setup(){
  createCanvas(1880,1000);
  waves.push(new Wave(40, 1500, 0, TWO_PI * 100));
  waves.push(new Wave(20, 3000, 0, TWO_PI * 100));
  waves.push(new Wave(10, 6000, 0, TWO_PI * 100));
}

function draw(){
  background(255);
  translate(width/2, height/2);
  textSize(32);
  for(let i = 0; i < waves.length; i++){
    text("Wave "+ (i+1), -width/2, -450 + (50*3*i));
    text("Amplitude: " + waves[i].amplitude, -width/2 + 40, -400+(50*3*i));
    text("Period: " + waves[i].period, -width/2 + 40, -350+(50*3*i))
  }

  strokeWeight(.5);
  ellipse(0,0,600,600);
  strokeWeight(2);
  for(let a = 0; a < TWO_PI; a+=PI/720){
    let amp = 300 + waves[0].evaluate(a);
    for(let i = 1; i < waves.length; i++){
      amp+= waves[i].evaluate(a);
    }
    position = p5.Vector.fromAngle(a, amp);
    point(position.x, position.y);
  }

  for(wave in waves){
    waves[wave].phase+=.05;
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
