window.addEventListener("load", init, false);

var columns = new Array();
var transTable = ["sentence","noun","pronoun","verb","adjective","article","adverb","preposition","conjunction","interjection"];

function init()
{
  document.getElementById("n").ps="noun";
  document.getElementById("pn").ps="pronoun";
  document.getElementById("v").ps="verb";
  document.getElementById("adj").ps="adjective";
  document.getElementById("art").ps="article";
  document.getElementById("adv").ps="adverb";
  document.getElementById("pre").ps="preposition";
  document.getElementById("c").ps="conjunction";
  document.getElementById("i").ps="interjection";
  document.getElementById("enter").addEventListener("keyup",changeText,false);
  document.getElementById("send").addEventListener("click",send,false);
  //for (var i = 0; i < document.getElementsByTagName("x-drop").length; i++) document.getElementsByTagName("x-drop")[i].onactivate=toggleSpace;
  var fe = {};
  fe.target={};
  fe.target.value="";
  changeText(fe);
}

function changeText(e)
{
  var words = e.target.value.split(" ");
  for (var i = 0; i < document.getElementsByTagName("x-drop").length; i++) document.getElementsByTagName("x-drop")[i].reset();
  for (var i = 0; i < words.length; i++) {document.getElementById("n").addOption("green",words[i]).onclick=function(e){setPartSpeech(document.getElementById("n").ps,e);}};
  document.getElementById("n").addOption ("red","N/A").onclick=function(){setPartSpeech(document.getElementById("n").ps,"N/A")};
  for (var i = 0; i < words.length; i++) {document.getElementById("pn").addOption("green",words[i]).onclick=function(e){setPartSpeech(document.getElementById("pn").ps,e);}};
  document.getElementById("pn").addOption("red","N/A").onclick=function(){setPartSpeech(document.getElementById("pn").ps,"N/A")};
  for (var i = 0; i < words.length; i++) {document.getElementById("v").addOption("green",words[i]).onclick=function(e){setPartSpeech(document.getElementById("v").ps,e);}};
  document.getElementById("v").addOption("red","N/A").onclick=function(){setPartSpeech(document.getElementById("v").ps,"N/A")};
  for (var i = 0; i < words.length; i++) {document.getElementById("adj").addOption("green",words[i]).onclick=function(e){setPartSpeech(document.getElementById("adj").ps,e);}};
  document.getElementById("adj").addOption("red","N/A").onclick=function(){setPartSpeech(document.getElementById("adj").ps,"N/A")};
  for (var i = 0; i < words.length; i++) {document.getElementById("art").addOption("green",words[i]).onclick=function(e){setPartSpeech(document.getElementById("art").ps,e);}};
  document.getElementById("art").addOption("red","N/A").onclick=function(){setPartSpeech(document.getElementById("art").ps,"N/A")};
  for (var i = 0; i < words.length; i++) {document.getElementById("adv").addOption("green",words[i]).onclick=function(e){setPartSpeech(document.getElementById("adv").ps,e);}};
  document.getElementById("adv").addOption("red","N/A").onclick=function(){setPartSpeech(document.getElementById("adv").ps,"N/A")};
  for (var i = 0; i < words.length; i++) {document.getElementById("pre").addOption("green",words[i]).onclick=function(e){setPartSpeech(document.getElementById("pre").ps,e);}};
  document.getElementById("pre").addOption("red","N/A").onclick=function(){setPartSpeech(document.getElementById("pre").ps,"N/A")};
  for (var i = 0; i < words.length; i++) {document.getElementById("c").addOption("green",words[i]).onclick=function(e){setPartSpeech(document.getElementById("c").ps,e);}};
  document.getElementById("c").addOption("red","N/A").onclick=function(){setPartSpeech(document.getElementById("c").ps,"N/A")};
  for (var i = 0; i < words.length; i++) {document.getElementById("i").addOption("green",words[i]).onclick=function(e){setPartSpeech(document.getElementById("i").ps,e);}};
  document.getElementById("i").addOption("red","N/A").onclick=function(){setPartSpeech(document.getElementById("i").ps,"N/A")};

  for (var i = 0; i < document.getElementsByClassName("spacer").length; i++) document.getElementsByClassName("spacer")[i].style="height:"+(words.length*48+48)+"px;";
}

function setPartSpeech(partS,e)
{
  //console.log(e);
  //console.log(e.srcElement.innerText);
  var word;
  if(e!="N/A") word = e.srcElement.innerText;
  if(e=="N/A") word = "N/A";
  //console.log(partS,word);
  columns[transTable.indexOf(partS)] = word;
}

function strClone(s)
{
  return JSON.parse(JSON.stringify(s));
}

function send()
{
  columns[0]=document.getElementById("enter").value;
  sendPost("http://phdincomputing.com/speechGame/add.php",{sentence:columns[0],noun:columns[1],pronoun:columns[2],verb:columns[3],adjective:columns[4],article:columns[5],adverb:columns[6],preposition:columns[7],conjunction:columns[8],interjection:columns[9]},function(e){console.log(e);});
  //var oReq = new XMLHttpRequest();
  //oReq.addEventListener("load", function(e){console.log(e);});
  //var url = "http://phdincomputing.com/speechGame/add.php";
  //url += "?sentence="+columns[0];
  //for (var i = 1; i < transTable.length; i++) url+="&"+transTable[i]+"="+columns[i];
  //console.log(url);
  //oReq.open("GET", url);
  //oReq.send();
}

function sendPost(url, params, clbk)
{
	var http = new XMLHttpRequest();
  http.open("POST", url, true);
	var bdy = "";
  var i = 0;
  var length = 0;
  for(var key in params) length++;
	for(var key in params) {
  	if(params.hasOwnProperty(key)) {
    i++;
    	var pr = (params[key]).split(' ').join('+');
    	bdy += key + "=" + pr;
      if(length!=i)bdy+="&";
    }
  }
  //console.log(bdy);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        //alert(http.responseText);
        clbk(http);
    }
	}
  http.send(bdy);
}
