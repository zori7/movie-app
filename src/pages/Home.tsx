import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { MoviesActions, MoviesSelectors } from '../features/movies'
import { setPageAndFetch } from '../features/movies/actions'

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const moviesList = useSelector(MoviesSelectors.getMoviesList)
  const loading = useSelector(MoviesSelectors.loading)
  const page = useSelector(MoviesSelectors.page)
  const incrementDisabled = useSelector(MoviesSelectors.incrementDisabled)
  const decrementDisabled = useSelector(MoviesSelectors.decrementDisabled)

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

  const onTitleChange = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    window.console.log(e.target.value)
  }, 500)

  return (
    <>
      <h1>Movies list</h1>
      {loading ? (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col m6">
              <ul className="pagination">
                <li className={decrementDisabled ? 'disabled' : ''}>
                  <a href="#" onClick={decrementPage}>
                    <i className="material-icons">chevron_left</i>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={prevent}>
                    {page}
                  </a>
                </li>
                <li className={incrementDisabled ? 'disabled' : ''}>
                  <a href="#" onClick={incrementPage}>
                    <i className="material-icons">chevron_right</i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col m6">
              <input
                placeholder="Start typing..."
                type="text"
                onChange={onTitleChange}
              />
            </div>
          </div>
          {moviesList.map((movie) => (
            <div className="card blue-grey lighten-1" key={movie.imdbID}>
              <div className="card-content white-text">
                <span className="card-title">{movie.Title}</span>
                <p>Year: {movie.Year}</p>
                <p>IMDb ID: {movie.imdbID}</p>
              </div>
              <div className="card-action">
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  More on IMDb
                </a>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  )
}
