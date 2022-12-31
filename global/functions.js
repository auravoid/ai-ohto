/**
 *
 * @description - A function to format a date
 * @param uglyDate {number} - A UNIX timestamp
 * @returns {string} - A prettier date
 */
function prettyDate(uglyDate) {
	const date = new Date(uglyDate * 1000);
	const days = date.getUTCDate() - 1,
		hours = date.getUTCHours(),
		minutes = date.getUTCMinutes(),
		seconds = date.getUTCSeconds();
	const segments = [];
	if (days > 0) segments.push(days + ' day' + ((days === 1) ? '' : 's'));
	if (hours > 0) segments.push(hours + ' hour' + ((hours === 1) ? '' : 's'));
	if (minutes > 0) segments.push(minutes + ' minute' + ((minutes === 1) ? '' : 's'));
	if (seconds > 0) segments.push(seconds + ' second' + ((seconds === 1) ? '' : 's'));
	return segments.join(', ');
}

/**
 *
 * @description - A function to format a number with commas
 * @param uglyNumber {number} - A long number
 * @returns {string} - A prettier number
 */
function prettyNumber(uglyNumber) {
	return uglyNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 *
 * @description - A function to translate Discord ID to Timestamp
 * @param id {number} - A Discord ID
 * @param type {string} - The type of ID
 * // Types:
 * // - short-date
 * // - long-date
 * // - short-time
 * // - long-time
 * // - short-datetime
 * // - long-datetime
 * // - relative
 * @returns {string} - A Discord timestamp
 */
function idToTimestamp(id, type) {
	// Make sure type matches one of the types
	if (!['short-time',
		'long-time',
		'short-date',
		'long-date',
		'short-datetime',
		'long-datetime',
		'relative'].includes(type)) {
		throw new Error('Invalid type');
	}
	// Make sure the ID is a number
	if (isNaN(id)) {
		throw new Error('ID is not a number');
	}

	const epoch = 1420070400000;
	// eslint-disable-next-line no-undef
	const date = BigInt(id) >> 22n;
	const timestamp = Math.floor(new Date(Number(date) + epoch) / 1000);

	// Return the timestamp
	switch (type) {
	case 'short-time':
		return `<t:${timestamp}:t>`;
	case 'long-time':
		return `<t:${timestamp}:T>`;
	case 'short-date':
		return `<t:${timestamp}:d>`;
	case 'long-date':
		return `<t:${timestamp}:D>`;
	case 'short-datetime':
		return `<t:${timestamp}:f>`;
	case 'long-datetime':
		return `<t:${timestamp}:F>`;
	case 'relative':
		return `<t:${timestamp}:R>`;
	}
}

/**
 *
 * @description - A function to translate Date to Timestamp
 * @param date {Date} - A Date
 * @param type {string} - The type of ID
 * // Types:
 * // - short-date
 * // - long-date
 * // - short-time
 * // - long-time
 * // - short-datetime
 * // - long-datetime
 * // - relative
 * @returns {string} - A Discord timestamp
 */
function dateToTimestamp(date, type) {
	// Make sure type matches one of the types
	if (!['short-time',
		'long-time',
		'short-date',
		'long-date',
		'short-datetime',
		'long-datetime',
		'relative'].includes(type)) {
		throw new Error('Invalid type');
	}
	// Make sure the ID is a number
	if (isNaN(date)) {
		throw new Error('Date is not a number');
	}

	// Convert the date to a timestamp
	const timestamp = Math.floor(date / 1000);

	// Return the timestamp
	switch (type) {
	case 'short-time':
		return `<t:${timestamp}:t>`;
	case 'long-time':
		return `<t:${timestamp}:T>`;
	case 'short-date':
		return `<t:${timestamp}:d>`;
	case 'long-date':
		return `<t:${timestamp}:D>`;
	case 'short-datetime':
		return `<t:${timestamp}:f>`;
	case 'long-datetime':
		return `<t:${timestamp}:F>`;
	case 'relative':
		return `<t:${timestamp}:R>`;
	default:
		return `<t:${timestamp}:t>`;
	}
}

async function randomColor() {
	// I'm gonna be honest, I don't know what this does
	// I found it on StackOverflow and it works so I'm not gonna touch it
	// Even if I did know what it does, I wouldn't be able to explain it
	// So I'm just gonna leave it here
	// Eventually I'll find the post and link it here
	// ¯\_(ツ)_/¯
	let color = Math.floor(Math.random() * 16777215).toString(16);
	// If the color is less than 6 characters, add 0s to the start
	if (color.length < 6) {
		color = '0'.repeat(6 - color.length) + color;
	}

	function hexToRGB(h) {
		let r = 0;
		let g = 0;
		let b = 0;
		if (h.length === 4) {
			r = '0x' + h[1] + h[1];
			g = '0x' + h[2] + h[2];
			b = '0x' + h[3] + h[3];
		}
		else if (h.length === 7) {
			r = '0x' + h[1] + h[2];
			g = '0x' + h[3] + h[4];
			b = '0x' + h[5] + h[6];
		}
		return 'rgb(' + +r + ', ' + +g + ', ' + +b + ')';
	}

	// Set the HEX and RGB
	const hexColor = `#${color}`;
	const rgbColor = hexToRGB(hexColor);

	// Return an embed with the color
	return {
		hexColor,
		rgbColor,
	};
}


module.exports = {
	dateToTimestamp,
	idToTimestamp,
	prettyDate,
	prettyNumber,
	randomColor,
};

