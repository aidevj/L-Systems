!function(){
  'use strict';
  var Victor = require('victor');

  const Vec2 = Victor;
  const Turtle = { 
    create( canvas, startX, startY ) {
      const turtle = Object.create( this )
      Object.assign( turtle, {
        canvas,
        weight:1,
        color:'red',
        pos: Vec2( startX, startY ),
        dir: Vec2( 1,0 ) ,
        pen: 1,
        posArray: [],
        dirArray: [],
      });
      turtle.canvas.moveTo( turtle.pos.x, turtle.pos.y );
      return turtle;
    },

    penUp()   { this.pen = 0 },

    penDown() { this.pen = 1 },

    push() {
      this.posArray.push( this.pos.clone() );
      this.dirArray.push( this.dir.clone() );
    },
    pop() {
      this.pos = this.posArray.pop();
      this.dir = this.dirArray.pop();
      this.canvas.moveTo( this.pos.x, this.pos.y );
    },
    // THIS IS IN RADIANS!!!
    rotate( amt ) {
      this.dir.rotate( amt );
    },
    move( amt ) {
      if( this.pen ) this.canvas.beginPath();
      this.canvas.moveTo( this.pos.x, this.pos.y );
      this.pos.x += this.dir.x * amt;
      this.pos.y += this.dir.y * amt;
      if( this.pen ) {
        this.canvas.lineTo( this.pos.x, this.pos.y );
        this.canvas.lineWidth = this.weight;
        this.canvas.stroke();
        this.canvas.closePath();
      }else{
        this.moveTo( this.pos.x, this.pos.y );
      }
    }
  };
  
  
  const axiom = 'F';
  const rules = {
    F: "F[+F]F[-F]F",
    '[': "",
    ']': "",
    '+': "",
    '-': "",
  };
  
  let output = axiom;
  let numGenerations = 5;
  
  const app =  {
    canvas: null,
    ctx: null,
    
    init() {
      this.canvas = document.getElementsByTagName( 'canvas' )[0];
      this.ctx = this.canvas.getContext( '2d' );
      this.draw = this.draw.bind( this );    
      this.fullScreenCanvas();
      
      window.onresize = this.fullScreenCanvas.bind( this ); 
      
      let myTurtle =  Turtle.create( this.canvas, 100, 100 );
      //console.log(myTurtle);
      
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 3;
      
      this.ctx.beginPath();
      this.ctx.moveTo(100, 100);
      this.ctx.lineTo(100,200);
      this.ctx.stroke();
      this.ctx.closePath();
      
            
      /*
      n=5, theta=25.7°
      F
      F → F[+F]F[-F]F
      */
      
      // Get numGenerations and instructions as a big string
      for (let i = 0; i < numGenerations; i++) {
        let newOutput = '';
        
        for (let char of output) {
         //if (char != 'F') continue;  // ignore if not F?
          newOutput += rules[char];
        }
        
        output += newOutput;
      }
      //console.log("Result: " + output);
      
      requestAnimationFrame( this.draw );
      
    },
    
    fullScreenCanvas() { 
      this.canvas.width  = this.height = window.innerWidth;
      this.canvas.height = this.width  = window.innerHeight;
    },
    
    draw() {
      requestAnimationFrame( this.draw );

      // Now draw the thing

      for (let char of output) {
        switch(char) {
          case 'F':
            //myTurtle.rotate(Math.PI / 2);
            //myTurtle.move(10);
            break;
          case '+':
            //myTurtle.rotate(-.448);
            break;
          case '-':
            //myTurtle.rotate(.448);
            break;
          case '[':
            //myTurtle.push();
            break;
          case ']':
            //myTurtle.pop();
            break;
        }
      }
          
    
      
    }
  
    
  };
  
  window.onload = app.init.bind( app );
  
}();
