const priceDiffSorter = (a, b, order) => {
	const firstPrecentage = Number(a.priceDiff.percentage.slice(0, a.priceDiff.percentage.length - 1));
	const secondPercentage = Number(b.priceDiff.percentage.slice(0, b.priceDiff.percentage.length - 1));

	if (order === 'desc') {
		if (firstPrecentage > secondPercentage) {
			return -1;
		}
		
		if (firstPrecentage < secondPercentage) {
			return 1;
		}
	} else {
		if (firstPrecentage > secondPercentage) {
			return 1;
		}
		
		if (firstPrecentage < secondPercentage) {
			return -1;
		}
	}

	return 0;
};

export default priceDiffSorter;
