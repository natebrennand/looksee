var dataInit = false;
var videoInit = false;
var dataStream = null;

function dataConnected(dataConnection){
    dataInit = true;
    dataStream = dataConnection;

    if (dataInit && videoInit){
        beginAnnotation();
    }
}

function videoConnected(){
    videoInit = true;

    if (dataInit && videoInit){
        beginAnnotation();
    }
}

function beginAnnotation(){
    var v = document.getElementById('client-video');
    var canvas = document.getElementById('operator-canvas');
    var context = canvas.getContext('2d');
    var cw = v.clientWidth;
    var ch = v.clientHeight;
    canvas.width = cw;
    canvas.height = ch;

    var tool = new tool_pencil(canvas, context);
    
    canvas.addEventListener('mousedown', function(evt){writeMessage(canvas, tool, evt)}, false);
    canvas.addEventListener('mousemove', function(evt){writeMessage(canvas, tool, evt)}, false);
    canvas.addEventListener('mouseup',   function(evt){writeMessage(canvas, tool, evt)}, false);

    var b = document.getElementById('clear-annotation');
    b.addEventListener('click', function(){
        context.clearRect(0, 0, cw, ch);
        var json = {
            "event": "clear"
        }
        sendToClient(json);
    }, false);
}
 
// This painting tool works like a drawing pencil which tracks the mouse 
// movements.
function tool_pencil (canvas, context) {
  var tool = this;
  this.started = false;
  this.canvas = canvas;
  this.context = context;
  this.points = new Array();
  this.lines = new Array();

  // This is called when you start holding down the mouse button.
  // This starts the pencil drawing.
  this.mousedown = function (pos) {
      tool.started = true;
      tool.context.beginPath();
      tool.context.moveTo(pos.x, pos.y);
      tool.points.push([pos.x, pos.y]);

      var json = {
        "event": "mousedown",
        "x": pos.x,
        "y": pos.y
      }
      sendToClient(json);
  };

  // This function is called every time you move the mouse. Obviously, it only 
  // draws if the tool.started state is set to true (when you are holding down 
  // the mouse button).
  this.mousemove = function (pos) {
    if (tool.started) {
      tool.context.lineWidth = 10;
      tool.context.strokeStyle = "cyan";
      tool.context.lineTo(pos.x, pos.y);
      tool.context.stroke();
      tool.points.push([pos.x, pos.y]);

      var json = {
        "event": "mousemove",
        "x": pos.x,
        "y": pos.y
      }
      sendToClient(json);
    }
  };

  // This is called when you release the mouse button.
  this.mouseup = function (pos) {
    if (tool.started) {
      tool.mousemove(pos);
      tool.started = false;

      if (tool.points.length < 2){
        tool.points = new Array();
        return;
      }

      tool.points = new Array();
      
      var json = {
        "event": "mouseup",
        "x": pos.x,
        "y": pos.y
      }
      sendToClient(json);
    }
  };
}


  function sendToClient(json){
    alert("fuck your shit, asshole");
  }

  function writeMessage(canvas, tool, evt) {
    var mousePos = getMousePos(canvas, evt);

    var func = tool[evt.type];
    if (func) {
        func(mousePos);
    }
  }
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
