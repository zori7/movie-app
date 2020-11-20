import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect } from 'react'
import _ from 'lodash'
import { MoviesActions, MoviesSelectors } from '../features/movies'
import { setPageAndFetch, setTitle } from '../features/movies/actions'

export const useMovies = () => {
  const dispatch = useDispatch()
  const moviesList = useSelector(MoviesSelectors.getMoviesList)
  const favoritesList = useSelector(MoviesSelectors.favorites)
  const loading = useSelector(MoviesSelectors.loading)
  const page = useSelector(MoviesSelectors.page)
  const incrementDisabled = useSelector(MoviesSelectors.incrementDisabled)
  const decrementDisabled = useSelector(MoviesSelectors.decrementDisabled)
  const title = useSelector(MoviesSelectors.title)

  const debouncedFetch = useCallback(
    _.debounce(() => {
      dispatch(MoviesActions.getMovies())
    }, 500),
    []
  )

  useEffect(() => {
    dispatch(MoviesActions.getMovies())
  }, [])

  const incrementPage = (e: React.MouseEvent) => {
    e.preventDefault()

    if (incrementDisabled) return

    dispatch(setPageAndFetch(page + 1))
  }

  const decrementPage = (e: React.MouseEvent) => {
    e.preventDefault()

    if (decrementDisabled) return

    dispatch(setPageAndFetch(page - 1))
  }

  const prevent = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value))
    debouncedFetch()
  }

  const clearTitle = () => {
    dispatch(setTitle(''))
    dispatch(setPageAndFetch(1))
  }

  return {
    loading,
    moviesList,
    favoritesList,
    decrementDisabled,
    incrementDisabled,
    decrementPage,
    incrementPage,
    page,
    title,
    clearTitle,
    onTitleChange,
    prevent,
  }
}
