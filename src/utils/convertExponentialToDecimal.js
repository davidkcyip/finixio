/**
 * Convert exponential numbers to decimal
 * This was taken from
 * http://blog.davidjs.com/2018/07/convert-exponential-numbers-to-decimal-in-javascript/
 */
const convertExponentialToDecimal = (exponentialNumber) => {
	const str = exponentialNumber.toString();
	if (str.indexOf('e') !== -1) {
	  const exponent = parseInt(str.split('-')[1], 10);
	  const result = exponentialNumber.toFixed(exponent);
	  return result;
	} else {
	  return exponentialNumber;
	}
}

export default convertExponentialToDecimal;
