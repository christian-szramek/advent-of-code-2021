const { Console } = require('console');

fs = require('fs');

// check command line arguments
if (process.argv.length !== 3) {
	console.warn('Usage: node part_one.js example');
	console.log('or');
	console.warn('Usage: node part_one.js input');
	process.exit();
}

// check for correct third argument
if (process.argv[2] !== 'example' && process.argv[2] !== 'input') {
	console.warn('Usage: node two.js example');
	console.log('or');
	console.warn('Usage: node two.js input');
	process.exit();
}

// open and read file
fs.readFile(`./${process.argv[2]}.txt`, 'utf8', (err, data) =>
	handleFile(err, data)
);

// store each command in an array
var handleFile = (err, data) => {
	if (err) {
		console.error(err);
	}
	let parsedData = data.split('\n');
	parsedData.pop();
	computePowerConsumption(parsedData);
};

var computePowerConsumption = (data) => {
	let columnData = getColumnData(data);

	let { gamma, epsilon } = computeGammaEpsilon(columnData);

	console.log(`Gamma: ${gamma}`);
	console.log(`Epsilon: ${epsilon}`);
	console.log(`Power Consumption: ${gamma * epsilon}`);
};

// "get the columns as rows"
var getColumnData = (data) => {
	let columnData = [];

	// loop data[0].length times
	for (let col = 0; col < data[0].length; col++) {
		// each time loop data.length times and store concat the ith values of each row to a new string and append it to the result
		let tmpData = '';
		for (let row = 0; row < data.length; row++) {
			tmpData = tmpData.concat(data[row][col]);
		}

		columnData.push(tmpData);
	}

	return columnData;
};

// get most common bit of every array item
var computeGammaEpsilon = (data) => {
	let gamma = '';
	let epsilon = '';

	data.forEach((item) => {
		// count the 0's and 1's and append the common bit at gamme and the least comon at epsilon
		let zeroCounter = 0;
		let oneCounter = 0;
		[...item].forEach((bit) => {
			if (bit === '0') {
				zeroCounter++;
			} else {
				oneCounter++;
			}
		});

		// concat the bits to gamma and epsilon
		if (zeroCounter > oneCounter) {
			gamma = gamma.concat('0');
			epsilon = epsilon.concat('1');
		} else {
			gamma = gamma.concat('1');
			epsilon = epsilon.concat('0');
		}
	});

	return {
		gamma: parseInt(gamma, 2),
		epsilon: parseInt(epsilon, 2),
	};
};
