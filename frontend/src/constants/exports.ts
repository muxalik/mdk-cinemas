import { pdf, xlsx } from '../assets'
import { exportMethod } from '../types'

export const actorsExports: exportMethod[] = [
  {
    icon: xlsx,
    text: 'Excel',
    url: '/actors/excel',
    filename: 'actors.xlsx',
  },
  {
    icon: pdf,
    text: 'PDF',
    url: '/actors/pdf',
    filename: 'actors.pdf',
  },
]

export const cinemasExports: exportMethod[] = [
  {
    icon: xlsx,
    text: 'Excel',
    url: '/cinemas/excel',
    filename: 'cinemas.xlsx',
  },
  {
    icon: pdf,
    text: 'PDF',
    url: '/cinemas/pdf',
    filename: 'cinemas.pdf',
  },
]

export const moviesExports: exportMethod[] = [
  {
    icon: xlsx,
    text: 'Excel',
    url: '/movies/excel',
    filename: 'movies.xlsx',
  },
  {
    icon: pdf,
    text: 'PDF',
    url: '/movies/pdf',
    filename: 'movies.pdf',
  },
]

export const sessionsExports: exportMethod[] = [
  {
    icon: xlsx,
    text: 'Excel',
    url: '/sessions/excel',
    filename: 'sessions.xlsx',
  },
  {
    icon: pdf,
    text: 'PDF',
    url: '/sessions/pdf',
    filename: 'sessions.pdf',
  },
]
