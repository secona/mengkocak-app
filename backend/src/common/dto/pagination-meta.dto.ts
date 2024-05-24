export class PaginationMetaDTO {
	pageIndex: number;
	pageSize: number;
	pageCount: number;

	constructor(page: number, pageSize: number, docsCount: number) {
		this.pageIndex = page;
		this.pageSize = pageSize;
		this.pageCount = Math.ceil(docsCount / pageSize);
	}
}
