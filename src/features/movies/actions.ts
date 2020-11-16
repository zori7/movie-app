import {
  SET_LOADING,
  SET_MOVIES,
  SET_PAGE,
  SET_PAGINATION,
  SET_TITLE,
} from './actionTypes'
import { IState } from '../../interfaces/IState'

export const setMovies = (payload: object[]) => ({
  type: SET_MOVIES,
  payload,
})

export const setTitle = (payload: string) => ({
  type: SET_TITLE,
  payload,
})

export const setLoading = (payload: boolean) => ({
  type: SET_LOADING,
  payload,
})

export const setPagination = (payload: object) => ({
  type: SET_PAGINATION,
  payload,
})

export const setPage = (payload: number) => ({
  type: SET_PAGE,
  payload,
})

export const getMovies = () => (dispatch: any, getState: () => IState) => {
  const { movies: state } = getState()

  dispatch(setLoading(true))

  const queryString = new URLSearchParams({
    Title: state.title,
    page: state.pagination.page.toString(),
  }).toString()

  fetch(`https://jsonmock.hackerrank.com/api/movies/search?${queryString}`)
    .then((res) => res.json())
    .then((res) => {
      const { page, per_page, total, total_pages } = res
      dispatch(
        setPagination({
          page: Number(page),
          per_page: Number(per_page),
          total: Number(total),
          total_pages: Number(total_pages),
        })
      )

      dispatch(setMovies(res.data))
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
}

export const setPageAndFetch = (page: number) => (dispatch: any) => {
  dispatch(setPage(page))
  dispatch(getMovies())
}
