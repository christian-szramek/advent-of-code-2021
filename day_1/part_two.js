fs = require('fs');

// open and read file
fs.readFile('./input.txt', 'utf8', (err, data) => handleFile(err, data));

// save values inside an array
var handleFile = (err, data) => {
	if (err) {
		console.error(err);
	} else {
		let values = data.split('\n').map(Number);
		// delete last item, because its '/0'
		values.pop();
		computeWindows(values);
	}
};

// compute new array with sliding window (size 3) sums
var computeWindows = (values) => {
	let valueWindows = [];
	for (let index = 2; index < values.length; index++) {
		let tmpWindowSum = values[index - 2] + values[index - 1] + values[index];
		valueWindows.push(tmpWindowSum);
	}
	countIncreasements(valueWindows);
};

// count increasements
var countIncreasements = (values) => {
	let counter = 0;

	// console log for first item
	console.log(values[0] + '  (N/A - no previous sum)');

	for (let index = 1; index < values.length; index++) {
		if (values[index - 1] < values[index]) {
			console.log(values[index] + '  (increased)');
			counter++;
		} else if (values[index - 1] > values[index]) {
			console.log(values[index] + '  (decreased)');
		} else {
			console.log(values[index] + '  (no change)');
		}
	}

	console.log(`Counter: ${counter}`);
};
