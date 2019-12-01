//var str = sentence.substring(0,bpos)+"<u>"+sentence.substring(bpos,epos)+"</u>"+sentence.substring(epos);
var timeSt = new Date();
window.addEventListener("load", gameStart, false);
var cA = "sentence";
var score = 0;
var secCounterInterval = 0;
var question = false;
var paused=false;
var verReset = false;

function getQuestion()
{
  document.getElementById("cq").innerText="What part of speech is the underlined sentence?";
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(){reqListener(this);});
  var url = "http://phdincomputing.com/speechGame/game.php";
  oReq.open("GET", url);
  oReq.send();
}

function reqListener(l)
{
  var data = JSON.parse(l.responseText);
  var sentence = data.sentence;
  var bpos = data.ub;
  var epos = data.ue;
  console.log(data);
  document.getElementById("sentence").innerHTML="Sentence: "+sentence.substring(0,bpos)+"<u>"+sentence.substring(bpos,epos)+"</u>"+sentence.substring(epos);
  //document.getElementById("A1").innerText=
  timeSt = new Date();
  secCounterInterval = setInterval(function(){document.getElementById("time").innerText="Time: "+parseInt(((new Date())-timeSt)/1000)+" Seconds";},500);
  question=true;
  for (var i = 0; i < data.possibleAnswers.length; i++) document.getElementById("A"+(i+1)).innerText=data.possibleAnswers[i];
  cA=data.correctAnswer;
}

function gameStart()
{
  document.getElementById("A1").addEventListener("click",answerClick);
  document.getElementById("A2").addEventListener("click",answerClick);
  document.getElementById("A3").addEventListener("click",answerClick);
  document.getElementById("A4").addEventListener("click",answerClick);
  document.getElementById("A5").addEventListener("click",answerClick);
  document.getElementById("pause").addEventListener("click",pause);
  document.getElementById("reset").addEventListener("click",reset);
  document.getElementById("hscore").innerText="Highscore: " + Math.floor(Number(localStorage.getItem("highscore")));
  countdown(3,getQuestion);
}

function countdown(left,callb)
{
  if(paused)return;
  document.getElementById("countdown").innerText=left;
  if(left==0) {setTimeout(function(){document.getElementById("countdown").innerText="";callb();},1000);return;}
  setTimeout(function(){countdown(left-1,callb);},1000);
}

//function gameloop(){
//  getQuestion();
//}

function answerClick(e)
{
  console.log(e.target.innerText);
  if(question)
  {
    if(e.target.innerText==cA){
      var time = (new Date())-timeSt;
      //console.log(time / 1000);
      if(time/1000 <= 10){
        score += (10-(time/1000))*1000+1000;
        clearInterval(secCounterInterval);
        question=false;
        correct();
      } else {score+=10;correct();}
    } else {wrong();}
  }
}

function wrong()
{
  score-=1000;
  document.getElementById("countdown").innerText="Wrong!";
  document.getElementById("countdown").style="font-size: 72px;color:red";
  setTimeout(function(){document.getElementById("countdown").innerText="";document.getElementById("countdown").style="font-size: 72px;color:white";},1000);
}

function correct()
{
  clearInterval(secCounterInterval);
  if(Number(localStorage.getItem("highscore"))<score){
    localStorage.setItem("highscore",score);
  }
  document.getElementById("hscore").innerText="Highscore: " + Math.floor(Number(localStorage.getItem("highscore")));
  document.getElementById("score").innerText="Score: "+Math.floor(score);
  document.getElementById("countdown").style="font-size: 72px;color:green";
  setTimeout(function(){document.getElementById("countdown").innerText="";document.getElementById("countdown").style="font-size: 72px;color:white";},2000);
  if(paused)return;
  countdown(3,getQuestion);
}

function pause(a)
{
  //console.log(paused);
  if(!(typeof(a) === "boolean"))paused=!paused;
  if (typeof(a) === "boolean")
  {
    paused = a;
  }
  if(paused)document.getElementById("pause").innerText="Unpause";
  if(!paused)document.getElementById("pause").innerText="Pause";
  question=!paused;
  if(paused)clearInterval(secCounterInterval);
  if(!paused) countdown(3,getQuestion);
}

function reset()
{
  pause(true);
  if(verReset)
  {
    document.getElementById("reset").innerText="Ok!";
    localStorage.setItem("highscore",0);
    score=0;
    document.getElementById("score").innerText="Score: "+Math.floor(score);
    setTimeout(function(){document.getElementById("reset").innerText="Reset Highscore";},2000);
  }
  if(!verReset)
  {
    document.getElementById("reset").innerText="Are you sure?";
    verReset=true;
    setTimeout(function(){verReset=false;document.getElementById("reset").innerText="Reset Highscore";},1000);
  }
  document.getElementById("hscore").innerText="Highscore: " + Math.floor(Number(localStorage.getItem("highscore")));
}
