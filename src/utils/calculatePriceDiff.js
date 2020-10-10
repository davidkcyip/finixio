const calculatePriceDiff = ({ currentPrice, openingPrice, currency = '$' }) => {
	const absoluteDiff = Number(currentPrice) - Number(openingPrice);
	const percentageDiff = (absoluteDiff / Number(openingPrice)) * 100;

	return {
		amount: absoluteDiff >= 0 ? `${currency}${absoluteDiff}` : `-${currency}${absoluteDiff.toString().slice(1)}`,
		percentage: `${percentageDiff}%`,
	}
};

export default calculatePriceDiff;