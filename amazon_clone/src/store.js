import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// save the Redux store in the local storage of the browser to remember its state across page refreshes or even when closed. 
const persistConfig = {
	key: 'main-root',
	storage,
}
const persistedReducer = persistReducer(persistConfig, reducer);
//Create the Redux store.
const store = createStore(persistedReducer, applyMiddleware());
//control the process of persisting (saving) and rehydrating (loading) the state.
const persistor = persistStore(store);

export { persistor };
export default store
