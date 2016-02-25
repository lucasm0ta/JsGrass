/**
Author: Lucas Mota Ribeiro
*/
$(document).ready(function(){
    exec();
});

var Mheight, height, width, angle, randomness, time, distance;
Mheight = 1;
height = 33;
width = 17;
distance = 10;
angle = Math.PI / 2;
randomness  = 14;
time = 0;

/**
Function to be execute on start
*/
function exec() {
    var canvW, ctx, canvas = document.getElementById("canvas");
    var GrassList = [], GrassItem = {};

    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 2;
    canvW = canvas.width;

    var grass = [];
    var counter = 0, digits = ("" + Math.random()+Math.random()+Math.random()+ Math.random()+Math.random()+Math.random()+ Math.random()+Math.random()+Math.random()).split("").splice(0,160);


    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };
    digits.remove('.');
    console.log(digits);
    function nextRand(){
        var size=digits.length;
        counter++;
        if(counter==size){
            counter=0;
        }
        return digits[counter];
    }
    function createLeafs(){
        counter=0;
        for(var i=0;i<canvas.width+50;i+=distance){
            var leaf={}
            var paralAng=angle-Math.PI/2;
            leaf.rand0=nextRand();
            leaf.rand1=nextRand();
            leaf.rand2=nextRand();
            //console.log(leaf.rand0+" "+leaf.rand1+" "+leaf.rand2+" "+(((leaf.rand0-5)/5)*height*randomness/100)+height);
            leaf.Y0=canvas.height+5;
            leaf.X0=i;
            leaf.X1=Math.floor(height*Math.cos(angle));
            leaf.Y1=Math.floor(height*Math.sin(angle));
            leaf.X2=Math.floor(Mheight*Math.cos(angle));//0
            leaf.Y2=Math.floor(Mheight*Math.sin(angle));//75
            leaf.X3= leaf.X2 + Math.floor(width*Math.cos(paralAng));
            leaf.Y3= leaf.Y2 + Math.floor(width*Math.sin(paralAng));
            leaf.X4= leaf.X2 + Math.floor(width*Math.cos(paralAng+Math.PI));
            leaf.Y4= leaf.Y2 + Math.floor(width*Math.sin(paralAng+Math.PI));

            rand=leaf.rand;

            //leaf.path=new Path2D('M '+i+' 400 q 75 -75 0 -300 q -75 225 0 300');
            leaf.path1=new Path2D('M '+leaf.X0+' '+leaf.Y0+' q '+leaf.X3+' -'+leaf.Y3+' '+leaf.X1+' -'+leaf.Y1);
            leaf.path2=new Path2D('M '+leaf.X0+' '+leaf.Y0+' q '+leaf.X4+' -'+leaf.Y4+' '+leaf.X1+' -'+leaf.Y1);
            grass.push(leaf);
        }
    }

    //window.alert("hey");

    function drawGrass(time) {
       // console.log(height);

        grass=[];
        counter=0;
        for(var i=-100;i<canvas.width+50;i+=distance){
            var time_ang=-Math.PI/6*Math.cos(((Math.PI*i)+(time*40))/1000);
            var leaf={},tHeight=0, tMheight=0, tWidth=0;
            var paralAng=angle-Math.PI/2+time_ang;
            var aux;
            leaf.rand0=nextRand();
            leaf.rand1=nextRand();
            leaf.rand2=nextRand();
            aux=((leaf.rand0-5)*height*randomness/500);
            tHeight=aux+height;
            /*if(i==0){
              console.log(">>"+typeof(aux) +" "+typeof(height)+" "+typeof(tHeight));
            }*/
            tMheight=((((leaf.rand1-5)/5)*Mheight*randomness/100)+Mheight);
            tWidth=((((leaf.rand2-5)/5)*width*randomness/100)+width);
            //console.log(leaf.rand0+" "+leaf.rand1+" "+leaf.rand2+" "+((((leaf.rand0-5)/5)*height*randomness/100)+height));
            leaf.Y0=canvas.height+5;
            leaf.X0=i;
            leaf.X1=Math.floor(tHeight*Math.cos(angle+time_ang));
            leaf.Y1=Math.floor(tHeight*Math.sin(angle+time_ang));
            leaf.X2=Math.floor(tMheight*Math.cos(angle+time_ang));//0
            leaf.Y2=Math.floor(tMheight*Math.sin(angle+time_ang));//75
            leaf.X3= leaf.X2 + Math.floor(tWidth*Math.cos(paralAng));
            leaf.Y3= leaf.Y2 + Math.floor(tWidth*Math.sin(paralAng));
            leaf.X4= leaf.X2 + Math.floor(tWidth*Math.cos(paralAng+Math.PI));
            leaf.Y4= leaf.Y2 + Math.floor(tWidth*Math.sin(paralAng+Math.PI));

            //leaf.path=new Path2D('M '+i+' 400 q 75 -75 0 -300 q -75 225 0 300');
            leaf.path1=new Path2D('M '+leaf.X0+' '+leaf.Y0+' q '+leaf.X3+' '+(-leaf.Y3)+' '+leaf.X1+' '+(-leaf.Y1));
            leaf.path2=new Path2D('M '+leaf.X0+' '+leaf.Y0+' q '+leaf.X4+' '+(-leaf.Y4)+' '+leaf.X1+' '+(-leaf.Y1));
            grass.push(leaf);
        }
        var k=3;
        //console.log("angle:"+Math.floor(angle*180/Math.PI)+" P0:"+grass[k].X0+" "+(400-grass[k].Y0)+" P1:"+(grass[k].X0+grass[k].X1)+" "+grass[k].Y1+" P2:"+(grass[k].X0+grass[k].X2)+" "+grass[k].Y2+" P3:"+(grass[k].X0+grass[k].X3)+" "+grass[k].Y3+" P4:"+(grass[k].X0+grass[k].X4)+" "+grass[k].Y4);
        ctx.lineWidth = 2;
        var size=5;
        ctx.strokeStyle = 'green';

        for(var i=0;i<grass.length;i++){
            //ctx.stroke(grass[i].path);
            ctx.fillStyle = '#013e04';
            ctx.fill(grass[i].path1);
            ctx.fill(grass[i].path2);
            ctx.strokeStyle = '#013e04';
            ctx.beginPath();
            ctx.moveTo(grass[i].X0,grass[i].Y0);
            ctx.lineTo(grass[i].X0+grass[i].X1,grass[i].Y0-grass[i].Y1);
            ctx.stroke();
            //ctx.fillStyle = '#000';
            /*if(i==0){
                ctx.font="20px Georgia";
                ctx.fillText("x0:"+grass[i].X0+" y0:"+grass[i].Y0,10,10);
                ctx.fillText("x1:"+grass[i].X1+" y1:"+grass[i].Y1,10,40);
                ctx.fillText("x2:"+grass[i].X2+" y2:"+grass[i].Y2,10,70);
                ctx.fillText("x3:"+grass[i].X3+" y3:"+grass[i].Y3,10,100);
                ctx.fillText("x4:"+grass[i].X4+" y4:"+grass[i].Y4,10,130);
		ctx.fillText("r0:"+grass[i].rand0+" r1:"+grass[i].rand1+" r2:"+grass[i].rand2,500,20);
                ctx.fillText("Height:"+tHeight.toString(),10,160);
                ctx.fillText("Width:"+tWidth,10,190);
                ctx.fillRect(grass[i].X0+grass[i].X2-size/2,grass[i].Y0-grass[i].Y2-size/2,size,size);
            }*/
        }
    }

    function resizeCanvas() {
        canvas.width = $('canvas').parent().innerWidth();
        //console.log(window.innerWidth);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /*$(function () {
        $('input[type="range"]').rangeslider();
    });*/

    createLeafs();
    window.setInterval(function () {
        resizeCanvas();
        drawGrass(time);
        if(time<=155){
            time+=1;
        }else{
            time=0;
        }
        //console.log(time);
    },30);
}
function updateHeight(new_height) {
    height=Number(new_height);
}
function updateMHeight(new_Mheight) {
    Mheight=Number(new_Mheight);
}
function updateWidth(new_width) {
    width=Number(new_width);
}
function updateAngle(new_angle) {
    angle=Number(new_angle) * (Math.PI/180);
}
function updateRandomness(new_random) {
    randomness=Number(new_random);
}
function updateCanvasHeight(new_random) {
    var canvas = document.getElementById("canvas");
    canvas.height = Number(new_random);
}

function updateLeafsDistance(new_random) {
    distance = Number(new_random);
}
