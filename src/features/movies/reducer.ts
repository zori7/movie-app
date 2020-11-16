import { AnyAction } from 'redux'
import {
  SET_LOADING,
  SET_MOVIES,
  SET_PAGE,
  SET_PAGINATION,
  SET_TITLE,
} from './actionTypes'

const initialState = {
  title: '',
  movies: [],
  loading: false,
  pagination: {
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  },
}

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.payload }
    case SET_LOADING:
      return { ...state, loading: action.payload }
    case SET_MOVIES:
      return { ...state, movies: action.payload }
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
