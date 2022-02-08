objects=[];
status="";
song="";
function preload()
{
    song = loadSound("alert.mp3");
}
function setup()
{
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
}
function gotResult(results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects=results;
    }
}
function draw()
{
    image(video,0,0,380,380);
    if(status!="")
    {
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("baby_found").innerHTML="Baby Found";
            document.getElementById("baby_not_found").innerHTML="Baby Not Found";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == "person") 
            { 
            document.getElementById("number_of_objects").innerHTML = "Baby Found";
            console.log("stop");
            song.stop();
            }
            if(objects[i].label != "person") 
            { 
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            console.log("play");
            song.play();
            }
        }
    }
    
}