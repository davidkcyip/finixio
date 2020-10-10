import React from 'react';
import ReactDOM from 'react-dom';
import { resetContext, getContext } from 'kea';
import localStoragePlugin from 'kea-localstorage';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

resetContext({
	createStore: true,
	plugins: [localStoragePlugin]
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={getContext().store}>
			<App />
		</Provider>
  	</React.StrictMode>,
  	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
