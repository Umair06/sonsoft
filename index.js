import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store";
import AppWrapper from './AppWrapper';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <AppWrapper />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();


