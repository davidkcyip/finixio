import axios from 'axios';

const fetchPrices = ({ coins, currency }) => {
	return axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coins}&tsyms=${currency}`)
		.then(({ data }) => data);
};

export const priceApi = {
	fetchPrices,
};
