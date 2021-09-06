const cantons = ['ag', 'ar', 'bl', 'fr', 'gl', 'ju', 'ne', 'ow', 'sh', 'sz', 'ti', 'vd', 'zg', 'ai', 'be', 'bs', 'ge', 'gr', 'lu', 'nw', 'sg', 'so', 'tg', 'ur', 'vs', 'zh'];
const randomCantons = [];
const list = [];
const flipped = [];
const complete = [];
const cardAmount = 3;
var check = [];
var order = 0;
var flipCount = 0;
const getFlagPath = function(canton) {
  return `./img/${canton}.png`;
}

document.addEventListener('DOMContentLoaded', function() {
  const playground = document.getElementById('playground');
  for (let i = 0; i < cardAmount; i++) {
    let canton = cantons[Math.floor(Math.random() * cantons.length)];
    if (randomCantons.includes(canton)){
      i--;
    } else {
      randomCantons.push(canton);
    }
  }

  randomCantons.forEach(function (value) {
    randomCantons.push(value);
  });

  randomCantons.sort(() => 0.5 - Math.random());

  for (let i = 0; i < cardAmount*2; i++) {
    list.push(i);
  }

    randomCantons.forEach(function(value) {
      const tile = document.createElement('div');
      tile.setAttribute("onclick","flip("+order+")")
      tile.setAttribute("class", value)
      tile.setAttribute("id", order);
      const tileFront = document.createElement('div');
      tileFront.setAttribute("class", "card-front");
      tileFront.setAttribute("id", "front"+order)
      tileFront.setAttribute("style", "display: block;")
      const tileBack = document.createElement('div');
      tileBack.setAttribute("class", "card-back "+value);
      tileBack.setAttribute("id", "back"+order)
      tileBack.setAttribute("style", "display: none;")
      order++;
      const tileImage = document.createElement('img');
      tileImage.setAttribute('src', getFlagPath(value));
      tile.appendChild(tileBack);
      tile.appendChild(tileFront);
      tileBack.appendChild(tileImage);
      playground.appendChild(tile);
    });
});

function flip(number) {
  recordFlip(number);
  update();
  if (list.length == complete.length || list.length == complete.length+flipped.length){
    flippedToComplete();
    alert("You Win, you flipped " + flipCount + " pairs");
  }
}
function recordFlip(number) {
  if (!flipped.includes(number)){
    flipped.push(number);
  } else {
    for(let i = 0; i < flipped.length; i++){
      if ( flipped[i] === number) {
        flipped.splice(i, 1);
      }
    }
  }
  if (flipped.length > 2){
    flippedToComplete()
  }
  if (flipped.length === 2){
    flipCount++;
  }
}
function update() {
list.forEach(function(value){
  var front = document.getElementById("front"+value);
  var back = document.getElementById("back"+value);
  if (!complete.includes(value)){
    if (flipped.includes(value)){
      front.style.display = "none";
      back.style.display = "block";
    } else {
      front.style.display = "block";
      back.style.display = "none";
    }
  }
});
}
function flippedToComplete(){
  check = flipped.splice(0,2);
  check1 = document.getElementById(check[0]);
  check2 = document.getElementById(check[1]);
  if (check1.getAttribute("class") == check2.getAttribute("class")){
    complete.push(check[0]);
    complete.push(check[1]);
  }
}