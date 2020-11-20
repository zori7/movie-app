import React from 'react'
import { Movie } from '../components/movies/Movie'
import { useMovies } from '../hooks/useMovies'

const styles = {
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchClear: {
    cursor: 'pointer',
    color: '#a43',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    outline: 'none',
    border: 'none',
  },
}

export const Home: React.FC = () => {
  const {
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
  } = useMovies()

  return (
    <>
      <h1>Movies list</h1>
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
        <div className="col m6" style={styles.searchContainer}>
          <div className="flex-1 mr-3">
            <input
              placeholder="Start typing..."
              type="text"
              value={title}
              style={{ marginBottom: '0' }}
              onChange={onTitleChange}
            />
          </div>
          <button type="button" style={styles.searchClear} onClick={clearTitle}>
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col s8">
          {loading ? (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          ) : (
            <>
              {moviesList.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
              ))}
            </>
          )}
        </div>
        <div className="col s4">
          {favoritesList.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} />
          ))}
        </div>
      </div>
    </>
  )
}
