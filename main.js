var body = document.body;

var num;
var numArray;

function numPick() {
  num = [1,2,3,4,5,6,7,8,9];
  numArray = [];
  for (var i = 0; i <4; i += 1) {
    var pick = num.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    numArray.push(pick);
  }
}

numPick();

var result = document.createElement('h1');
body.append(result);
var fm = document.createElement('form');
document.body.append(fm);
var input = document.createElement('input');
input.type = 'text';
input.maxLength = 4;
fm.append(input);
var btn = document.createElement('button');
btn.textContent = '입력';
fm.append(btn);

var wrong = 0;

fm.addEventListener('submit', function (e) {
  e.preventDefault();
  var res = input.value;
  if (res === numArray.join('')) {
    result.textContent = '홈런';
    input.value = '';
    input.focus();

    numPick()
    wrong = 0;
  } else { //답이 틀리면
    var resArray = res.split('');
    var strike = 0;
    var ball = 0;
    wrong += 1;
    if (wrong > 10) { //10번 넘게 틀리는 경우
      result.textContent = '이런, 10번 넘게 틀렸습니다. 답은 ' + numArray.join(',') + '입니다.';
      input.value = '';
      input.focus();
      numPick()
      wrong = 0;
    } else { //10번 미만으로 틀린 경우
      console.log('답이 틀리면');
      for (var i = 0; i < 3; i += 1) {
        if (Number(resArray[i]) === numArray[i]) {
          console.log('같은 자리?');
          strike += 1;
        } else if (numArray.indexOf(Number(resArray[i]) > -1)) {
          console.log('겹치는 숫자?');
          ball += 1;
        }
      }
      result.textContent = strike + '스트라이크 ' + ball + '볼입니다.';
      input.value = '';
      input.focus();
    }
  }
});