const numBtns = document.querySelectorAll('.numBtn');
const result = document.querySelector('#result');
const opBtns = document.querySelectorAll('.opBtn');
const equalBtn = document.querySelector('.equalBtn');
const clearBtn = document.querySelector('.clearBtn');
const delBtn = document.querySelector('.delBtn');
const floatBtn = document.querySelector('.floatBtn');

let firstNum = '';
let firstDone = false;
let secondNum = '';
let operator = '';
let secondDone = false;
let thirdNum = '';
let float = false;

const operation = () => {
  switch (operator) {
    case '+':
      return (result.value = Number(firstNum) + Number(secondNum));
    case '-':
      return (result.value = Number(firstNum) - Number(secondNum));
    case '*':
      return (result.value = Number(firstNum) * Number(secondNum));
    case '/':
      return (result.value = Number(firstNum) / Number(secondNum));
    default:
      return;
  }
};

floatBtn.addEventListener('click', (e) => {
  let nums = result.value;
  if (nums.includes('.')) {
    return;
  }
  if (float === false) {
    nums = nums + '.';
    if (firstDone === false) {
      firstNum = nums;
      result.value = firstNum;
    } else if (firstDone === true && secondDone === true) {
      secondNum = nums;
      result.value = secondNum;
    } else if (firstDone === true && secondDone === false) {
      firstDone = false;
      firstNum = nums;
      result.value = firstNum;
    }
  }
  float = true;
});

delBtn.addEventListener('click', (e) => {
  let nums = result.value.slice(0, -1);
  if (nums.includes('.')) {
    float = true;
  } else {
    float = false;
  }
  console.log(nums);
  if (nums.length < 1) {
    result.value = '0';
  } else {
    result.value = nums;
  }
  if (firstDone === false) {
    firstNum = nums;
  } else if (firstDone === true && secondDone === true) {
    secondNum = nums;
  } else if (firstDone === true && secondDone === false) {
    firstNum = nums;
  }
});

clearBtn.addEventListener('click', (e) => {
  firstNum = '';
  firstDone = false;
  secondNum = '';
  secondDone = false;
  operator = '';
  result.value = '0';
  thirdNum = '';
  float = false;
});

equalBtn.addEventListener('click', () => {
  if (firstDone === false) {
    return;
  } else if (firstDone === true && secondDone === false) {
    console.log(firstNum, secondNum, operator);
    secondNum = thirdNum;
    result.value = operation();
    firstNum = operation();
    secondNum = '';
    return;
  } else if (firstDone === true && secondDone === true) {
    result.value = operation();
    firstNum = operation();
    secondDone = false;
    firstDone = true;
    thirdNum = secondNum;
    secondNum = '';
    float = false;
  }
});

opBtns.forEach((opBtn) => {
  opBtn.addEventListener('click', (e) => {
    firstDone = true;
    if (firstDone === true && secondDone === true) {
      result.value = operation();
      firstNum = operation();
      secondDone = false;
      secondNum = '';
    }
    operator = opBtn.value;
    thirdNum = '';
    float = false;
  });
});

numBtns.forEach((numBtn) => {
  numBtn.addEventListener('click', (e) => {
    if (firstDone === false) {
      firstNum = firstNum + numBtn.value;
      result.value = firstNum;
    } else {
      secondNum = secondNum + numBtn.value;
      result.value = secondNum;
      secondDone = true;
    }
  });
});
