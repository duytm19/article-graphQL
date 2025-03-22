interface ObjectPagination{
    currentPage:number,
    limitItems:number,
    skip?: number,
    totalPage?:number
}
const paginationHelper=(objectPagination:ObjectPagination,query: Record<string,any>,countRecords:number):ObjectPagination=>{
    if(query[0]){
        objectPagination.currentPage = parseInt(query[0])
    }

    if(query[1]){
        objectPagination.limitItems = parseInt(query[1])
    }
    objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems

    const totalPage = Math.ceil(countRecords/objectPagination.limitItems)
    objectPagination.totalPage = totalPage

    return objectPagination
}
export default paginationHelper