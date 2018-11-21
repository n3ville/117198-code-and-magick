'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var LEFT_GAP = 120;
var BAR_HEIGHT = 150;
var DISTANCE = 50;
var BAR_WIDTH = 40;
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  var textLines = [
    'Ура, вы победили!',
    'Список результатов:'
  ];

  for (var i = 0; i < textLines.length; i++) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText(textLines[i], LEFT_GAP, 30 + 20 * i);
  }

  var maxTime = getMaxElement(times);
  var colors = ['20, 73, 186, 1', '86, 23, 189, 1', '108, 186, 235, 1', '0, 0, 255, 1'];
  var colorsYou = '255, 0, 0, 1';

  for (var j = 0; j < names.length; j++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[j], LEFT_GAP + (DISTANCE + BAR_WIDTH) * j, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[j]), LEFT_GAP + (DISTANCE + BAR_WIDTH) * j, -(BAR_HEIGHT * times[j]) / maxTime + 235);

    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(' + colorsYou + ')';
    } else {
      ctx.fillStyle = 'rgba(' + colors[j] + ')';
    }
    ctx.fillRect(LEFT_GAP + (DISTANCE + BAR_WIDTH) * j, CLOUD_HEIGHT - GAP * 2, BAR_WIDTH, -(BAR_HEIGHT * times[j]) / maxTime);
  }
};
