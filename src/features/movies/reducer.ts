import { AnyAction } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import {
  SET_FAVORITES,
  SET_LOADING,
  SET_MOVIES,
  SET_PAGE,
  SET_PAGINATION,
  SET_TITLE,
} from './actionTypes'

const initialState = {
  title: '',
  movies: [],
  favorites: [],
  loading: false,
  pagination: {
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  },
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.payload }
    case SET_LOADING:
      return { ...state, loading: action.payload }
    case SET_MOVIES:
      return { ...state, movies: action.payload }
    case SET_FAVORITES:
      return { ...state, favorites: action.payload }
    case SET_PAGINATION:
      return { ...state, pagination: action.payload }
    case SET_PAGE:
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload },
      }
    default:
      return state
  }
}

const persistConfig = {
  key: 'movies',
  storage,
  throttle: 500,
  whitelist: ['favorites'],
}

export default persistReducer(persistConfig, reducer)
