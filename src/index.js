function getNumbers(numberString) {
  var split = numberString.split('');
  var numbers = [];

  for (var index = 0; index < split.length; index++) {
    numbers[index] = Number(split[index]);
  }

  return numbers;
}

function getBiggerString(first, second) {
  if (first.length > second.length) {
    return first;
  } else {
    return second;
  }
}

function getSmallerString(first, second) {
  if (first.length <= second.length) {
    return first;
  } else {
    return second;
  }
}

function addZeros(numbers, numberOfZeros) { // ([1,5,8,2], 2) -> [1,5,8,2,0,0]
  result = numbers;

  for (var index = 0; index < numberOfZeros; index++) {
    numbers.push(0);
  }

  return result
}

function multiplyOneNumber(numbers, number) { // ([1,5,8,2], 6) -> [9,4,9,2]
  var result = [];
  var reversedNumbers = numbers.slice().reverse();
  var tens = 0;

  for (var index = 0; index <= numbers.length - 1; index++) {
    var tmpResult = reversedNumbers[index] * number + tens;

    result[index] = tmpResult % 10;
    tens = (tmpResult - result[index]) / 10;
  }

  if (tens !== 0) {
    result[reversedNumbers.length] = tens;
  }

  return result.slice().reverse();
}

function sumNumbers(firstNumbers, secondNumbers) { // ([1,5,8,3], [8,4,2,1]) -> [1,0,0,0,4]
  var result = [];
  var maxIndex = Math.max(firstNumbers.length, secondNumbers.length) - 1;
  var reversedFirstNumbers = firstNumbers.slice().reverse();
  var reversedSecondNumbers = secondNumbers.slice().reverse();
  var tens = 0;

  for (var index = 0; index <= maxIndex; index++) {
    var firstNumber = reversedFirstNumbers[index] || 0;
    var secondNumber = reversedSecondNumbers[index] || 0;

    var tmpSum = firstNumber + secondNumber + tens;

    result[index] = tmpSum % 10;
    tens = (tmpSum - result[index]) / 10;
  }

  if (tens !== 0) {
    result[maxIndex + 1] = tens;
  }

  return result.slice().reverse();
}

function convertNumbersToString(numbers) { // ([1,0,0,0,4]) -> "10004"
  return numbers.join('');
}

module.exports = function multiply(first, second) {
  // your solution

  var biggerString = getBiggerString(first, second);
  var smallerString = getSmallerString(first, second);

  var firstNumbers = getNumbers(biggerString);
  var secondNumbers = getNumbers(smallerString);

  var tmpResults = [];

  for (var index = secondNumbers.length - 1; index >= 0; index--) {
    var number = secondNumbers[index];

    var tmpResult1 = multiplyOneNumber(firstNumbers, number);
    tmpResult1 = addZeros(tmpResult1, secondNumbers.length - 1 - index);

    tmpResults.push(tmpResult1);
  }

  var result;
  for (var index = 0; index < tmpResults.length; index++) {
    if (index === 0) {
      result = tmpResults[index];
      continue;
    }

    result = sumNumbers(result, tmpResults[index]);
  }

  return convertNumbersToString(result);
}
