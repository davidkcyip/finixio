import { kea } from 'kea';
import { priceApi } from 'api';
import { coinsLogic } from 'logics';
import { calculatePriceDiff, convertExponentialToDecimal } from 'utils';
import { constants } from 'utils';

const { NUMBER_OF_COINS, NUMBER_OF_PRICES } = constants;

const logic = kea({
	// need this to persist localStorage
	path: () => ['scenes', 'prices'],

	connect: [coinsLogic],

	actions: () => ({
		fetchPrices: currency => currency,
		setPrices: ({ prices }) => ({ prices }),
	}),

	listeners: ({ actions }) => ({
		fetchPrices: async (currency) => {
			// get all coins from coins logic
			// and pick a random 50 from list
			// in order to guarantee price data for at least 10 coins
			const allCoins = coinsLogic.values.coins;
			const shuffledCoins = allCoins.sort(() => 0.5 - Math.random());
			const coins = shuffledCoins.slice(0, NUMBER_OF_COINS).join(',');

			// fetch prices, map into an array
			// and pick a random 10 from list
			const allPrices = await priceApi.fetchPrices({ coins, currency: currency.label }).then(data => {
				return Object.keys(data.RAW).map((key) => {
					const currPrice = convertExponentialToDecimal(data.RAW[key][currency.label].PRICE);
					const openPrice = convertExponentialToDecimal(data.RAW[key][currency.label].OPENDAY);

					return {
						id: `row-${key}`,
						coin: key,
						currentPrice: `${currency.symbol}${currPrice}`,
						openingPrice: `${currency.symbol}${openPrice}`,
						priceDiff: calculatePriceDiff({
							currentPrice: currPrice,
							openingPrice: openPrice,
							currency: currency.sybmol,
						}),
					}
				});
			});
			const shuffedPrices = allPrices.sort(() => 0.5 - Math.random());
			const prices = shuffedPrices.slice(0, NUMBER_OF_PRICES);

			actions.setPrices({ prices });
		},
	}),

	reducers: () => ({
		prices: [[],
			{ persist: false },
			{
				setPrices: (_, { prices }) => prices
			}
		],
		loading: [false,
			{ persist: false },
			{
				fetchPrices: () => true,
				setPrices: () => false
			}
		]
	})
});

export default logic;
