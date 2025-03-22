
import Article from "../models/article.model";
import Category from "../models/category.model";
import paginationHelper from "../helpers/pagination";
export const resolversArticle={
    Query:{
        getListArticle:async(_,args)=>{
            const{
                sortKey,
                sortValue,
                currentPage,
                limitItems,
                filterKey,
                filterValue
            }= args
            
            const find = {
                deleted:false
            }
            
            //sort
            const sort={}
            if(sortKey&& sortValue){
                sort[sortKey]= sortValue
            }
            //End sort
            // filter
            if(filterKey&& filterValue){
                find[filterKey]= filterValue
            }
            // End filter
            // Pagination
            const countRecords = await Article.countDocuments(find);
            let initPagination={
                currentPage:1,
                limitItems:2,
            }
            const objectPagination = paginationHelper(initPagination, [currentPage,limitItems], countRecords)
            // End Pagination 
            
            const articles = await Article.find(find).sort(sort).skip(objectPagination.skip)
            return articles
        },
        getArticle:async(_,args)=>{
            const {id} = args

            const article = await Article.findOne({
                _id:id,
                deleted:false
            })
            return article
        },

    },
    Article:{
        category: async(article)=>{
            const categoryId =  article.categoryId

            const category = await Category.findOne({
                _id:categoryId
            })

            return category
        }
    },
    Mutation:{
        createArticle:async(_,args)=>{
            const {article} = args

            const record = new Article(article)
            await record.save()
            return record
        },
        deleteArticle:async(_,args)=>{
            const {id} = args

            await Article.updateOne({
                _id:id
            },{
                deleted:true,
                deleteAt:new Date()
            })
            return "Delete Article successfully!!"
        },
        updateArticle:async(_,args)=>{
            const {id,article} = args

            await Article.updateOne({
                _id:id
            },article)

            const record = await Article.findOne({
                _id:id
            })
            return record
        },
    }
}