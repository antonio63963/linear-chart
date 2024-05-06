

const dataChart = {
  width: 600,
  height: 200,
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 0,
  axisYmaxValue: 150,
  axisXmaxValue: 50,
  stepGradation: 10,
  graphs: [
    {
      name: "Graph 1",
      color: 'red',
      points: [
        [0, 0],
        [200, 100],
        [400, 50],
        [450, 50],
        [500, 100],
        [570, 150],
      ],
    },
    {
      name: "Graph 2",
      color: 'green',
      points: [
        [0, 50],
        [250, 20],
        [300, 50],
        [350, 60],
        [500, 150],
        [550, 100],
      ],
    },
  ],
};

function initLinearChart(canvas, data) {
  console.log(canvas)
  const { width, height, axisXmaxValue, axisYmaxValue, graphs, stepGradation, paddingTop, paddingBottom } = data;
  console.log(data)
  const WIDTH = width;
  const HEIGHT = height;
  const PADDING_TOP = paddingTop;
  const PADDING_BOTTOM = paddingBottom;
  const DPI_WIDTH = WIDTH * 2;
  const DPI_HEIGHT = HEIGHT * 2;

  const ctx = canvas.getContext("2d");
  canvas.width = DPI_WIDTH; // плотность канвас
  canvas.height = DPI_HEIGHT;

  
  buildVerticalGradation(ctx, {axisYmaxValue, stepGradation, dpiHeight: DPI_HEIGHT, dpiWidth: DPI_WIDTH});
  drawGraph(ctx, {colorLine: 'red', lineWidth: 3, pointsArr: graphs[0].points, dpiHeight: DPI_HEIGHT, axisYmaxValue,});
  drawGraph(ctx, {colorLine: 'green', lineWidth: 3, pointsArr: graphs[1].points, dpiHeight: DPI_HEIGHT, axisYmaxValue,});
  drawDotsOnGraph(ctx, {pointsArr: graphs[0].points, dpiHeight: DPI_HEIGHT, axisYmaxValue});

}

function buildVerticalGradation(ctx, options) {
  const {axisYmaxValue, stepGradation, dpiHeight, dpiWidth} = options;

  const ROWS_COUNT = axisYmaxValue / stepGradation;
  const hStep = dpiHeight / ROWS_COUNT;
  ctx.beginPath();
  ctx.strokeStyle = "#bbb";
  ctx.strokeWidth = 1;
  ctx.font = "normal 20px Helvetica,sans-serif"; // text params
  ctx.fillStyle = "#96a2aa"; //text color
  for (let i = 0; i <= ROWS_COUNT; i++) {
    const posRowY = hStep * i;
    ctx.fillText(stepGradation * (ROWS_COUNT - i), 5, posRowY - 5);
    ctx.moveTo(0, posRowY);
    ctx.lineTo(dpiWidth, posRowY);
  }
  ctx.stroke();
  ctx.closePath();
}

function setYPosition({y, dpiHeight, axisYmaxValue}) {
  const delta = dpiHeight /  axisYmaxValue;
  return dpiHeight - y * delta;
}

function drawGraph(ctx, {colorLine, lineWidth, pointsArr, dpiHeight, axisYmaxValue}) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = colorLine;
  for (const [x, y] of pointsArr) {
    ctx.lineTo(x, setYPosition({y, dpiHeight, axisYmaxValue}));
    ctx.fillText(y, x, setYPosition({y, dpiHeight, axisYmaxValue}))
  }
  ctx.stroke();
  ctx.closePath();
}

function drawDotsOnGraph(ctx, {pointsArr, dpiHeight, axisYmaxValue}) {
  ctx.beginPath();
  for(const [x, y] of pointsArr) {
    ctx.moveTo(x, setYPosition({y, dpiHeight, axisYmaxValue}));
    ctx.arc(x, setYPosition({y, dpiHeight, axisYmaxValue}), 7, 0, 360);
  }
  ctx.fill();
}

initLinearChart(document.getElementById("chart"), dataChart);
