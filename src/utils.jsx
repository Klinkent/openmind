import { parse } from 'query-string'

export const limit = 10
// offset - сколько надо пропустить, limit - cколько надо вывести
// currentPage - текущая страница
export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start)
}

export const getPaginator = (search) => {
  const parsedSearch = parse(search)
  const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1
  const offset = currentPage * limit - limit
  return { currentPage, offset }
}
