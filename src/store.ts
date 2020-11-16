import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { MoviesReducer } from './features/movies'

const rootReducer = combineReducers({
  movies: MoviesReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  throttle: 500,
  whitelist: [],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk), devToolsEnhancer({}))
)

export const persistor = persistStore(store)
