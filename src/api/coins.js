import axios from 'axios';

const fetchCoins = () => {
	return axios.get('https://min-api.cryptocompare.com/data/all/coinlist?summary=true')
		.then(({ data }) => data);
};

export const coinApi = {
	fetchCoins,
};
