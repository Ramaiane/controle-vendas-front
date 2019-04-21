export interface IPage<T> {
    content: T[];
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: {
            sorted: boolean;
            unsorted: boolean;
        },
        unpaged: boolean;
    };
    size: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
}
