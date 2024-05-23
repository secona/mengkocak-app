import { PaginationMetaDTO } from "./pagination-meta.dto";

export class PaginationLinksDTO {
	nextPage: string;
	prevPage: string;

	constructor(paginationMeta: PaginationMetaDTO, currentPath: string) {
		let params = new URLSearchParams({
			page: "",
			pageSize: paginationMeta.pageSize.toString(),
		});

		if (paginationMeta.pageIndex > paginationMeta.pageCount || paginationMeta.pageIndex < 0) {
			return;
		}

		// check if there is a next page
		if (paginationMeta.pageIndex + 1 < paginationMeta.pageCount) {
			params.set("page", (paginationMeta.pageIndex + 1).toString());
			this.nextPage = currentPath + "?" + params.toString();
		}

		// check if there is a previous page
		if (paginationMeta.pageIndex > 0) {
			params.set("page", (paginationMeta.pageIndex - 1).toString());
			this.prevPage = currentPath + "?" + params.toString();
		}
	}
}
