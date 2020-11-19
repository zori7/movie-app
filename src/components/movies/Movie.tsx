import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IMovie } from '../../interfaces/IMovie'
import { MoviesSelectors } from '../../features/movies'
import { addFavorite, removeFavorite } from '../../features/movies/actions'

interface propTypes {
  movie: IMovie
}

const starColor = '#fffb00'
const starColorGrey = '#eeeeee'

const styles = {
  favoriteButton: {
    cursor: 'pointer',
    color: starColorGrey,
    width: '40px',
    height: '40px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    outline: 'none',
    border: 'none',
  },
}

export const Movie: React.FC<propTypes> = (props: propTypes) => {
  const dispatch = useDispatch()
  const { movie } = props

  const favoritesList = useSelector(MoviesSelectors.favorites)

  const isFavorite = useCallback(
    (m: IMovie): boolean => favoritesList.some((el) => el.imdbID === m.imdbID),
    [favoritesList]
  )

  const toggleFavorite = (m: IMovie, f: boolean) => {
    if (f) dispatch(removeFavorite(m.imdbID))
    else dispatch(addFavorite(m))
  }

  return (
    <div className="card blue-grey lighten-1">
      <div className="card-content white-text">
        <div className="card-title">
          <span>{movie.Title}</span>
          <button
            type="button"
            style={{
              ...styles.favoriteButton,
              color: isFavorite(movie) ? starColor : starColorGrey,
            }}
            onClick={() => toggleFavorite(movie, isFavorite(movie))}
          >
            <i className="material-icons">star</i>
          </button>
        </div>
        <p>Year: {movie.Year}</p>
        <p>IMDb ID: {movie.imdbID}</p>
      </div>
      <div className="card-action">
        <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noreferrer">
          More on IMDb
        </a>
      </div>
    </div>
  )
}
