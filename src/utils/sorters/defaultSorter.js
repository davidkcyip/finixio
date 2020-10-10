const defaultSorter = (a, b, order, key) => {
	if (order === 'desc') {
		if (a[key] > b[key]) {
			return -1;
		}
		
		if (a[key] < b[key]) {
			return 1;
		}
	} else {
		if (a[key] > b[key]) {
			return 1;
		}
		
		if (a[key] < b[key]) {
			return -1;
		}
	}

	return 0;
};

export default defaultSorter;
