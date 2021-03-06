import { IState } from '../../interfaces/IState'

export const getMoviesList = (state: IState) => state.movies.movies
export const favorites = (state: IState) => state.movies.favorites
export const loading = (state: IState) => state.movies.loading
export const title = (state: IState) => state.movies.title
export const page = (state: IState) => state.movies.pagination.page
export const totalPages = (state: IState) => state.movies.pagination.total_pages
export const decrementDisabled = (state: IState) => state.movies.pagination.page <= 1
export const incrementDisabled = (state: IState) =>
  state.movies.pagination.page >= state.movies.pagination.total_pages
