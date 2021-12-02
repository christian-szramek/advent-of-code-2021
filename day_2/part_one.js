// open and read file
fs = require('fs');
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

	data.forEach((element) => {
		let tmpAmount = parseInt(element.amount);

		switch (element.direction) {
			case 'forward':
				horizontalPosition += tmpAmount;
				break;
			case 'down':
				verticalPosition += tmpAmount;
				break;
			case 'up':
				verticalPosition -= tmpAmount;
				break;
			default:
				console.log('invalid direction');
				break;
		}
	});

	console.log(`Horizontal Position: ${horizontalPosition}`);
	console.log(`Vertical Position: ${verticalPosition}`);
	console.log(`Result: ${horizontalPosition * verticalPosition}`);
};
