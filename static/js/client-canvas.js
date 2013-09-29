var clientDataConnected = function (dataConnection){
    console.log(dataConnection);
    clientBeginAnnotation(dataConnection);
}

function clientResizeCanvas(){
    var v = document.getElementById('my-video');
    var canvas = document.getElementById('client-canvas');
    var context = canvas.getContext('2d');
    var cw = v.clientWidth;
    var ch = v.clientHeight;
    canvas.width = cw;
    canvas.height = ch;
}

function clientBeginAnnotation(dataConnection){
    clientResizeCanvas();
    var canvas = document.getElementById('client-canvas');
    var context = canvas.getContext('2d');
    var tool = new tool_pencil(canvas, context);
    dataConnection.on('data', function(data){
        console.log(data);
        if (data.event == "clear"){
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        else if (data.event == "mousedown"){
            context.beginPath();
            context.moveTo(data.x, data.y);
        }
        else {
            context.lineWidth = 10;
            context.strokeStyle = "cyan";
            context.lineTo(data.x, data.y);
            context.stroke();
        }
    }, false);
    setTimeout(clientResizeCanvas, 1000);
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
      };
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
      var x = 2;
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
