/**
Author: Lucas Mota Ribeiro

This project creates an adaptive array of leafs and animate them.
*/

/**
 * Load leaf generator when document is ready.
 */
$(document).ready(function(){
    exec();
});

var MID_HEIGHT = 1; // The height of the middle of the leaf.
var HEIGHT = 33; // Leaf Height.
var WIDTH = 17; // Leaf width.
var distance = 10; // Distance between leafs.
var ANGLE = Math.PI / 2; // The angle tha the leaf starts.
var RANDOMNESS  = 14; // How random these parameters are the leaf's array.
var time = 0; // Time counter.
var leafColor = '#013e04'; // Color of the leaf.

var FPS = 30;
var SPEED = 5;
var LAMBDA = 0.5;

/*!
 * Funtion to generate leafs.
 */
function exec() {
    /*!
     * Array of leafs.
     */
    var grass = [];

    /*!
     * Canvas element to draw the leafs.
     */
    var canvas = document.getElementById("canvas");

    /*!
     * Canvas 2D context.
     */
    var ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth - 2;
    /*!
     * Canvas width.
     */
    var canvW = canvas.width;

    /*!
     * List of random digits as string.
     */
    var digits = "";

    /*!
     * Random counter.
     */
    var randCounter = 0;


    /////////////////////////////////////////////////////
    //
    //            FUNCTIONS
    //
    /////////////////////////////////////////////////////

    /*!
     * Gets next random digit from the array of digits.
     */
    function nextRand(){
        var size = digits.length;
        randCounter = (randCounter == size) ? 0 : ++randCounter;
        return digits[randCounter];
    }

    /*!
     * Create leafs.
     */
    function createLeafs(){
        randCounter = 0;
        for (var dist = 0; dist < canvas.width + 50; dist += distance) {
            var leaf={}
            var paralAng=ANGLE-Math.PI/2;
            leaf.rand0 = nextRand();
            leaf.rand1 = nextRand();
            leaf.rand2 = nextRand();

            //console.log(leaf.rand0+" "+leaf.rand1+" "+leaf.rand2+" "+(((leaf.rand0-5)/5)*HEIGHT*RANDOMNESS/100)+HEIGHT);
            leaf.Y0 = canvas.height + 5;
            leaf.X0 = dist;
            leaf.X1 = Math.floor(HEIGHT*Math.cos(ANGLE));
            leaf.Y1 = Math.floor(HEIGHT*Math.sin(ANGLE));
            leaf.X2 = Math.floor(MID_HEIGHT*Math.cos(ANGLE));//0
            leaf.Y2 = Math.floor(MID_HEIGHT*Math.sin(ANGLE));//75
            leaf.X3 =  leaf.X2 + Math.floor(WIDTH*Math.cos(paralAng));
            leaf.Y3 =  leaf.Y2 + Math.floor(WIDTH*Math.sin(paralAng));
            leaf.X4 =  leaf.X2 + Math.floor(WIDTH*Math.cos(paralAng+Math.PI));
            leaf.Y4 =  leaf.Y2 + Math.floor(WIDTH*Math.sin(paralAng+Math.PI));

            leaf.path1 = new Path2D('M '+leaf.X0+' '+leaf.Y0+' q '+leaf.X3+' -'+leaf.Y3+' '+leaf.X1+' -'+leaf.Y1);
            leaf.path2 = new Path2D('M '+leaf.X0+' '+leaf.Y0+' q '+leaf.X4+' -'+leaf.Y4+' '+leaf.X1+' -'+leaf.Y1);
            grass.push(leaf); // Add lead to array.
        }
    }

    /*!
     * Draw the array of leafs for a certain time.
     * @param  time The current time.
     */
    function drawGrass(time) {
        randCounter = 0;
        grass = [];
        for(var dist = -100; dist < canvas.width + 50; dist += distance){
            var time_ang = Math.PI/6*Math.cos((dist * LAMBDA + time * SPEED) * Math.PI / 180);
            var leaf = {}, tHeight = 0, tMheight = 0, tWidth = 0;
            var paralAng = ANGLE-Math.PI/2+time_ang;
            var aux;
            leaf.rand0 = nextRand();
            leaf.rand1 = nextRand();
            leaf.rand2 = nextRand();
            aux = ((leaf.rand0 - 5) * HEIGHT * RANDOMNESS / 500);
            tHeight =aux+HEIGHT;
            /*if(i==0){
              console.log(">>"+typeof(aux) +" "+typeof(HEIGHT)+" "+typeof(tHeight));
            }*/
            tMheight = ((((leaf.rand1-5)/5)*MID_HEIGHT*RANDOMNESS/100)+MID_HEIGHT);
            tWidth = ((((leaf.rand2-5)/5)*WIDTH*RANDOMNESS/100)+WIDTH);

            //console.log(leaf.rand0+" "+leaf.rand1+" "+leaf.rand2+" "+((((leaf.rand0-5)/5)*HEIGHT*RANDOMNESS/100)+HEIGHT));
            //
            leaf.Y0 = canvas.height+5;
            leaf.X0 = dist;
            leaf.X1 = Math.floor(tHeight*Math.cos(ANGLE+time_ang));
            leaf.Y1 = Math.floor(tHeight*Math.sin(ANGLE+time_ang));
            leaf.X2 = Math.floor(tMheight*Math.cos(ANGLE+time_ang));//0
            leaf.Y2 = Math.floor(tMheight*Math.sin(ANGLE+time_ang));//75
            leaf.X3 = leaf.X2 + Math.floor(tWidth*Math.cos(paralAng));
            leaf.Y3 = leaf.Y2 + Math.floor(tWidth*Math.sin(paralAng));
            leaf.X4 = leaf.X2 + Math.floor(tWidth*Math.cos(paralAng+Math.PI));
            leaf.Y4 = leaf.Y2 + Math.floor(tWidth*Math.sin(paralAng+Math.PI));

            leaf.path1 =new Path2D('M '+leaf.X0+' '+leaf.Y0+' q '+leaf.X3+' '+(-leaf.Y3)+' '+leaf.X1+' '+(-leaf.Y1));
            leaf.path2 =new Path2D('M '+leaf.X0+' '+leaf.Y0+' q '+leaf.X4+' '+(-leaf.Y4)+' '+leaf.X1+' '+(-leaf.Y1));
            grass.push(leaf);
        }
        // var k =3;
        //console.log("ANGLE:"+Math.floor(ANGLE*180/Math.PI)+" P0:"+grass[k].X0+" "+(400-grass[k].Y0)+" P1:"+(grass[k].X0+grass[k].X1)+" "+grass[k].Y1+" P2:"+(grass[k].X0+grass[k].X2)+" "+grass[k].Y2+" P3:"+(grass[k].X0+grass[k].X3)+" "+grass[k].Y3+" P4:"+(grass[k].X0+grass[k].X4)+" "+grass[k].Y4);
        ctx.lineWidth = 2;

        for(var i = 0; i < grass.length; i++){
            ctx.fillStyle = leafColor;
            var leaf = grass[i];
            ctx.fill(leaf.path1);
            ctx.fill(leaf.path2);
            //ctx.strokeStyle = "rgba(1,62,4,0.5)";

            // console.log(typeof(leaf.X0));
            var grad = ctx.createLinearGradient(leaf.X0 + leaf.X1, leaf.Y0 - leaf.Y1, leaf.X0, leaf.Y0);
            var opacity = 0; //55% visible
            grad.addColorStop(0,'rgba(1,62,4,'+opacity+')');

            grad.addColorStop(0.2, leafColor);
            grad.addColorStop(1, leafColor);
            ctx.strokeStyle = grad;

            ctx.beginPath();
            ctx.moveTo(leaf.X0, leaf.Y0);
            ctx.lineTo(leaf.X0+leaf.X1, leaf.Y0-leaf.Y1);
            ctx.stroke();
            /*ctx.fillStyle = '#000';
            if(i == 0){
                ctx.font="20px Georgia";
                ctx.fillText("x0:"+leaf.X0+" y0:"+leaf.Y0,10,10);
                ctx.fillText("x1:"+leaf.X1+" y1:"+leaf.Y1,10,40);
                ctx.fillText("x2:"+leaf.X2+" y2:"+leaf.Y2,10,70);
                ctx.fillText("x3:"+leaf.X3+" y3:"+leaf.Y3,10,100);
                ctx.fillText("x4:"+leaf.X4+" y4:"+leaf.Y4,10,130);
		        ctx.fillText("r0:"+leaf.rand0+" r1:"+leaf.rand1+" r2:"+leaf.rand2,500,20);
                ctx.fillText("Height:"+tHeight.toString(),10,160);
                ctx.fillText("Width:"+tWidth,10,190);
                ctx.fillRect(leaf.X0+leaf.X2-5/2,leaf.Y0-leaf.Y2-5/2,5,5);
            }*/
        }
    }

    function resizeCanvas() {
        canvas.width = $('canvas').parent().innerWidth();
        //console.log(window.innerWidth);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /////////////////////////////////////////////////////
    //
    //           EXECUTION
    //
    /////////////////////////////////////////////////////

    // Populate random digits string
    for(var i = 0; i < 137;i++){
        digits += Math.floor(Math.random() * 10**9);
    }

    createLeafs();
    console.log("HI");
    // Updates canvas for a certain FPS.
    window.setInterval(function () {
        resizeCanvas();
        drawGrass(time);
        time = (time<=360) ? ++time : 0;
    }, 1000/FPS);
}

/*!
 * Updates leafs' height.
 * @param new_height The new height.
 */
function updateHeight(new_height) {
    HEIGHT = Number(new_height);
}

/*!
 * Updates leafs' middle height.
 * @param new_Mheight The new middle height.
 */
function updateMHeight(new_Mheight) {
    MID_HEIGHT = Number(new_Mheight);
}

/*!
 * Updates leafs' width.
 * @param new_width The new width.
 */
function updateWidth(new_width) {
    WIDTH = Number(new_width);
}

/*!
 * Updates leafs' starting angle.
 * @param new_width The new angle.
 */
function updateAngle(new_angle) {
    ANGLE = Number(new_angle) * (Math.PI/180);
}

/*!
 * Updates how random the leafs parameters will be.
 * @param new_random The new randomness.
 */
function updateRandomness(new_random) {
    RANDOMNESS = Number(new_random);
}

/*!
 * Updates canvas' height.
 * @param new_width The new canvas height.
 */
function updateCanvasHeight(new_cheight) {
    var canvas = document.getElementById("canvas");
    canvas.height = Number(new_cheight);
}

/*!
 * Updates leafs' distance between each other.
 * @param new_distance The new distance between leafs.
 */
function updateLeafsDistance(new_distance) {
    distance = Number(new_distance);
}
