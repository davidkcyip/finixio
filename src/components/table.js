import React, { useState, useEffect, useCallback } from 'react';
import BaseTable from 'react-base-table';
import { defaultSorter } from 'utils';
import 'react-base-table/styles.css';
import 'components/table.css';

const Table = ({ data, columns, defaultSort = {}, customSorters = [] }) => {
	const [stateData, setStateData] = useState(data);
	const [sortBy, setSortBy] = useState(defaultSort);

	const onColumnSort = useCallback(({ key, order }) => {
		const customSort = customSorters.find(sort => sort.id === key);
		setSortBy({ key, order });

		if (customSort && customSort.sortMethod) {
			const customSorter = customSort.sortMethod;
			setStateData(stateData.sort((a, b) => customSorter(a, b, order)));
		} else {
			setStateData(stateData.sort((a, b) => defaultSorter(a, b, order, key)));
		}
	}, [customSorters, stateData]);

	// sort data on render
	useEffect(() => {
		onColumnSort({ key: defaultSort.key, order: defaultSort.order });
	}, [defaultSort.key, defaultSort.order, onColumnSort]);

	return (
		<BaseTable
			data={stateData}
			columns={columns}
			sortBy={sortBy}
			onColumnSort={onColumnSort}
			width={window.innerWidth}
			height={window.innerHeight}
			rowClassName={({ rowIndex }) => rowIndex % 2 ? 'blue-row' : ''}
		/>
	);
};

export default Table;