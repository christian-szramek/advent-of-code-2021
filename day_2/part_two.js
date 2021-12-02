fs = require('fs');

// check command line arguments length
if (process.argv.length !== 3) {
	console.warn('Usage: node two.js example');
	console.log('or');
	console.warn('Usage: node two.js input');
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
	makeObjects(parsedData);
};

// make objects for each command with {direction: ..., amount: ...}
var makeObjects = (data) => {
	let objectArray = data.map((item) => {
		let tmpValues = item.split(' ');
		return {
			direction: tmpValues[0],
			amount: tmpValues[1],
		};
	});

	calculatePosition(objectArray);
};

var calculatePosition = (data) => {
	let horizontalPosition = 0;
	let verticalPosition = 0;
	let aim = 0;

	data.forEach((element) => {
		let tmpAmount = parseInt(element.amount);

		switch (element.direction) {
			case 'forward':
				horizontalPosition += tmpAmount;
				verticalPosition -= aim * tmpAmount;
				break;
			case 'down':
				aim += tmpAmount;
				break;
			case 'up':
				aim -= tmpAmount;
				break;
			default:
				console.log('invalid direction');
				break;
		}
	});

	let depth = 0 - verticalPosition;

	console.log(`Horizontal Position: ${horizontalPosition}`);
	console.log(`Depth: ${depth}`);
	console.log(`Result: ${horizontalPosition * depth}`);
};
