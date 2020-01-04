import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = middleware => {
    const arrMiddleware = [middleware];

    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        // arrMiddleware.push(createLogger());
        return composeWithDevTools(applyMiddleware(...arrMiddleware));
    }
    return applyMiddleware(...arrMiddleware);
};

export function configureStore() {
    const store = createStore(rootReducer, bindMiddleware(sagaMiddleware));

    store.runSagaTask = () => {
        store.sagaTask = sagaMiddleware.run(rootSaga);
    };

    store.runSagaTask();

    return store;
}

