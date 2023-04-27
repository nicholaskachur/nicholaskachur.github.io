var t = 240;
var c=0;
var fid=null;
var tid=null;

var waiter = false;

/*--------------------------------------------*/

var dones=0;
var xts=[60,170,252,362,60,142,252,390,60,142,252,390];
var yts=[180,180,180,180,254,282,254,282,384,356,356,384];
var dts=[true,true,true,true,true,true,true,true,true,true,true,true];
var msg=["You nailed it!!",
	"No one is more incredible than you!",
	"The computer is stunned by your brilliance!",
	"Damn you're good!",
	"Were you born awesome or did you study?",
	"You rock!",
	"Unbelievable!",
	"Such good looks and brains too!",
	"You should run for president!",
	"You are the coolest thing on the planet!",
	"A MacArthur Fellowship awaits you!",
	"You surely are a genius!"]
var hbs=["jejudo","seascape","sunset","wasson","dokdo","mountains"];
var hbn=hbs.length;
  
var doDrag=false;
var tobj=null;
var cobj=null;
var xobj=null;
var did=0;
var xoff=0;
var yoff=0;
var mPosx=0;
var mPosy=0;
var startx=0;
var starty=0;
var distx=0;
var disty=0;
var vpos=0;
var hpos=0;
var ismousedown = false;
var xid=0;
var hobj=null;
var hop=0;

var mouser = false; window.onmousemove = function(){mouser = true}
var toucher = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.Touch || !!window.onmsgesturechange || (window.DocumentTouch && window.document instanceof window.DocumentTouch);

window.addEventListener('load', function()
{ for (i=0; i<12; i++)
{ var x="p"+i; xobj=document.getElementById(x);

  xobj.addEventListener('touchstart', function(e)
  { tobj = e.changedTouches[0] // reference first touch point
    var c = isContained(e); var z="p"+xid; cobj=document.getElementById(z);
    vpos=parseInt(cobj.offsetTop); hpos=parseInt(cobj.offsetLeft);
    starty = parseInt(tobj.clientY); startx = parseInt(tobj.clientX);
    e.preventDefault(); }, false)
 
  xobj.addEventListener('touchmove', function(e)
  { tobj = e.changedTouches[0];
    disty = parseInt(tobj.clientY) - starty;
    distx = parseInt(tobj.clientX) - startx;
    moveIt(xid);
    e.preventDefault(); }, false)
 
}
  if (!toucher || mouser)
  { document.body.addEventListener('mousedown', function(e)
    { if ( isContained(e) )
      { tobj = e // reference first touch point
        var z="p"+xid; cobj=document.getElementById(z);
	vpos=parseInt(cobj.offsetTop); hpos=parseInt(cobj.offsetLeft);
	starty = parseInt(tobj.clientY); startx = parseInt(tobj.clientX);
	ismousedown = true;
	e.preventDefault(); } }, false)

    document.body.addEventListener('mousemove', function(e)
    { if (ismousedown)
      { tobj = e;
	disty = parseInt(tobj.clientY) - starty;
	distx = parseInt(tobj.clientX) - startx;
        moveIt(xid);
	e.preventDefault(); } }, false)
		
    document.body.addEventListener('mouseup', function(e)
    { if (ismousedown)
      { tobj = e;
	starty = parseInt(tobj.clientY); startx = parseInt(tobj.clientX);
	e.preventDefault(); } ismousedown = false; }, false)
	}
	
 }, false);

function moveIt(i)
{ var y = vpos + disty; var x = hpos + distx;
  var z="p"+i; cobj=document.getElementById(z);
    if (Math.abs(x-xts[i])<3 && Math.abs(y-yts[i])<3 && dts[i])
    { cobj.style.display="none";
	document.getElementById("jig"+i).style.display="block";
	++dones; var s="";
// alert(dones);
	if (dones==12) {s="<h2>Congratulations!</h2>";}
	popAlert(s+msg[i]);
	dts[i]=false;
	if (dones==12) {tid=setTimeout(loveYa,3000);} }
    else if (dts[i])
    { cobj.style.left=""+x+"px"; 
      cobj.style.top=""+y+"px"; } 
}

function isContained(e)
{ if (e==null) {e=window.event; var target=e.srcElement;}
  else {var target=e.target;}
  var cn=target.className;
  var a=cn.split("piece");
  xid=parseInt(a[1]);
  if (/drag/.test(cn) && dts[xid])
  {return true;}
  else {return false;} }

function skipPuzzle()
{
  // Posthumous addition from Nicholas Kachur.
  button = document.getElementById("skipButton");
  button.disabled = true;
  button.innerText = "wait for the animation";
  // End Nicholas addition.
  for (i=0; i<12; i++)
  { var x='var obj=document.getElementById("p'+i+'")'; eval(x);
    obj.style.display="none"; }
  loveYa(); }

function moreLove()
{ if (tid) {clearInterval(tid);}
  if (fid) {clearInterval(fid);}
  hop=0; loveYa(); }

function loveYa()
{ if (waiter) {hidealrt();}
  document.onmousedown=null;
  hobj=document.getElementById("hangul");
  doop(hop);
  var i=cvrandom(hbn);
  document.getElementById("hangul").style.backgroundImage="url(images/"+hbs[i]+".jpg)";
  document.getElementById("skip").style.display="none";
  document.getElementById("more").style.display="block";
  document.getElementById("hangul").style.display="block";
  fid = setInterval(fader, 50); }

function doop(o)
{ if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
  { hobj.style.filter = "alpha(opacity=" + o + ")"; }
  else { hobj.style.opacity = (o / 100); } }

function fader()
{ ++hop; doop(hop);
  if (hop>99)
  { clearInterval(fid); tid=false;
    document.getElementById("jigbox").style.display="none";
    for (i=0; i<12; i++)
    { var x='var obj=document.getElementById("jig'+i+'").style.display="none"'; eval(x); }
    document.getElementById("eclipse").style.display="block";
    document.getElementById("arch").style.display="block";
    document.getElementById("opera").style.display="block";
    document.getElementById("resume").style.display="block";
    document.getElementById("ghana").style.display="block";
    fid=setTimeout(hangset, 2000); } }

function hangset()
{ fid=setInterval(fadex, 50); }

function fadex()
{ --hop; doop(hop);
  if (hop<1)
  { clearInterval(fid); tid=false;
    document.getElementById("hangul").style.display="none";
    tid=setTimeout(bangYa,100); } }

function bangYa()
{ tid=setInterval(bang, t); }

/*--------------------------------------------*/

function scramble()
{ for (i=0; i<12; i++)
  { var x='var obj=document.getElementById("p'+i+'")'; eval(x);
    // Begin Nicholas Kachur edits.
    // Paul's original positioning:
    // obj.style.top=""+cvrandom(480)+"px";
    // obj.style.left=""+cvrandom(640)+"px";
    // Edits from Nicholas Kachur to add a margin around the randomness,
    // this way the pieces don't obscure the header or spread too far.
    var topLowerBound = 140;
    var topUpperBound = 380;
    var topOffset = topLowerBound + cvrandom(topUpperBound - topLowerBound);
    obj.style.top = `${topOffset}px`;
    var leftLowerBound = 20;
    var leftUpperBound = 500;
    var leftOffset = leftLowerBound + cvrandom(leftUpperBound - leftLowerBound);
    obj.style.left = `${leftOffset}px`;
    // End Nicholas edits.
    obj.style.display="block"; }
 }

function cvrandom(v)
{ return Math.floor(Math.random()*v); }

function hidealrt()
{ if (!/MSIE (5\.5|6\.)/.test(navigator.userAgent))
  { document.getElementById("bkg").style.display = "none"; }
  document.getElementById("alrt").style.display = "none";
waiter=false;
  return false; }

function popAlert(txt)
{ txt += '<p /><a href="#" onclick="return hidealrt();">continue</a>';
  var newdiv = document.createElement("div");
  document.getElementById("alrt").innerHTML = "";
  newdiv.innerHTML = txt;
  var container = document.getElementById("alrt");
  container.appendChild(newdiv);
  if (!/MSIE (5\.5|6\.)/.test(navigator.userAgent))
  { if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
    { document.getElementById("bkg").style.filter = "alpha(opacity=30)"; }
    else { document.getElementById("bkg").style.opacity = .3; }
    document.getElementById("bkg").style.display = "block"; }
  document.getElementById("alrt").style.display = "block";
waiter=true;
  return false; }

function bang()
{ if (c == 0) {x = 1;}
  else if (c == 40) {x = -1;}
  c = c + x;
  document.getElementById("arch").style.left = "" + (120 - c) + "px";
  document.getElementById("arch").style.top = "" + (192 - c) + "px";
  document.getElementById("opera").style.left = "" + (72 - c) + "px";
  document.getElementById("opera").style.top = "" + (346 + c) + "px";
  document.getElementById("resume").style.left = "" + (324 + (4*c)) + "px";
  document.getElementById("resume").style.top = "" + (228 - c) + "px";
  document.getElementById("ghana").style.left = "" + (286 + (3*c)) + "px";
  document.getElementById("ghana").style.top = "" + (368 + (2*c)) + "px"; }

function speeder()
{ t= document.getElementById("speed").value;
  clearInterval(tid);
  tid=setInterval(bang, t);
  return false; }
