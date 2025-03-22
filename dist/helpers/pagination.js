"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelper = (objectPagination, query, countRecords) => {
    if (query[0]) {
        objectPagination.currentPage = parseInt(query[0]);
    }
    if (query[1]) {
        objectPagination.limitItems = parseInt(query[1]);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    const totalPage = Math.ceil(countRecords / objectPagination.limitItems);
    objectPagination.totalPage = totalPage;
    return objectPagination;
};
exports.default = paginationHelper;
