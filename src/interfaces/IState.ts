import { IMovie } from './IMovie'

export interface IState {
  movies: {
    title: string
    movies: IMovie[]
    favorites: IMovie[]
    loading: boolean
    pagination: {
      page: number
      per_page: number
      total: number
      total_pages: number
    }
  }
}
