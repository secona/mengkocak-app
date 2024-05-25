export interface PaginationResponse<T> {
  meta: {
    pageIndex: number,
    pageSize: number,
    pageCount: number,
  },
  links: {
    nextPage?: string,
    prevPage?: string,
  },
  records: T[]
}

export interface Response<T> {
  record: T,
}

export interface PaginationOptions {
  page?: string,
  pageSize?: string,
}
