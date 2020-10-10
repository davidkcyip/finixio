import React, { useEffect, useState } from 'react';
import { useActions, useValues } from 'kea';
import { coinsLogic, pricesLogic } from 'logics';
import { Table } from 'components';
import { priceDiffSorter, constants } from 'utils';

const { DEFAULT_CURRENCY } = constants;

const generateColumns = (currency) => [{
	dataKey: 'coin',
	key: 'coin',
	title: 'Coin Name',
	sortable: true,
	width: 200,
}, {
	title: `Current Price (${currency.label})`,
	dataKey: 'currentPrice',
	key: 'currentPrice',
	sortable: true,
	width: 200,
}, {
	title: `Opening Price (${currency.label})`,
	dataKey: 'openingPrice',
	key: 'openingPrice',
	sortable: true,
	width: 200,
}, {
	title: `Price Increase`,
	dataKey: 'priceDiff',
	key: 'priceDiff',
	cellRenderer: ({ cellData: priceDiff }) => <span>{priceDiff.percentage} ({priceDiff.amount})</span>,
	sortable: true,
	width: 600,
}];

const App = () => {
	const [currency] = useState(DEFAULT_CURRENCY);
	const { prices } = useValues(pricesLogic);
	const { fetchCoins } = useActions(coinsLogic);
	const { fetchPrices } = useActions(pricesLogic);

	useEffect(() => {
		const fetchData = async () => {
			await fetchCoins();
			await fetchPrices(currency);
		}
		fetchData();
	}, [currency, fetchCoins, fetchPrices]);

	return (
		<div className="App">
			{prices.length
				? <Table
					data={prices}
					columns={generateColumns(currency)}
					defaultSort={{ key: 'priceDiff', order: 'desc' }}
					customSorters={[{
						id: 'priceDiff',
						sortMethod: priceDiffSorter,
					}]}
				/>
				: null}
		</div>
	);
}

export default App;
