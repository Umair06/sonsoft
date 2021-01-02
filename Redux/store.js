import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./Reducers";
// import logger from "redux-logger";
import { persistStore } from "redux-persist";

const middleware = [thunk];
// if (process.env.NODE_ENV === "development") {
//   middleware.push(logger);
// }

const store = createStore(RootReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export default store;
export { persistor };
