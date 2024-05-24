export class PaginationInput {
  take: number;
  skip: number;

  constructor(take: number = 10, skip: number = 0) {
    this.take = take;
    this.skip = skip;
  }

  static fromPageFormat(
    page: number = 0,
    pageSize: number = 10,
  ): PaginationInput {
    return new this(pageSize, pageSize * page);
  }
}
