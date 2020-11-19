import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { MoviesReducer } from './features/movies'

const rootReducer = combineReducers({
  movies: MoviesReducer,
})

export const store = createStore(rootReducer, compose(applyMiddleware(thunk), devToolsEnhancer({})))

export const persistor = persistStore(store)
