import { kea } from 'kea';
import { coinApi } from 'api';

const logic = kea({
	// need this to persist localStorage
	path: () => ['scenes', 'coins'],

	actions: () => ({
		fetchCoins: () => {},
		setCoins: ({ coins }) => ({ coins }),
	}),

	listeners: ({ actions }) => ({
		fetchCoins: async () => {
			// fetch all available coins from api
			// in order to get a list of prices
			const coins = await coinApi.fetchCoins().then(data => {
				return Object.keys(data.Data).map((key) => key)
			});

			actions.setCoins({ coins });
		},
	}),

	reducers: () => ({
		coins: [[],
			{ persist: true },
			{
				setCoins: (_, { coins }) => coins
			}
		],
		loading: [false,
			{ persist: false },
			{
				fetchCoins: () => true,
				setCoins: () => false
			}
		]
	})
});

export default logic;
