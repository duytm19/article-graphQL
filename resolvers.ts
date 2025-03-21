
import Article from "./models/article.model";
import Category from "./models/category.model";
export const resolvers={
    Query:{
        getListArticle:async()=>{
            const articles = await Article.find({
                deleted:false
            })
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
        getListCategory:async()=>{
            const categories = await Category.find({
                deleted:false
            })
            return categories
        },
        getCategory:async(_,args)=>{
            const {id} = args

            const categories = await Category.findOne({
                _id:id,
                deleted:false
            })
            return categories
        }

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
        createCategory:async(_,args)=>{
            const {category} = args

            const record = new Category(category)
            await record.save()
            return record
        },
        deleteCategory:async(_,args)=>{
            const {id} = args

            await Category.updateOne({
                _id:id
            },{
                deleted:true,
                deleteAt:new Date()
            })
            return "Delete Category successfully!!"
        },
        updateCategory:async(_,args)=>{
            const {id,category} = args

            await Category.updateOne({
                _id:id
            },category)

            const record = await Category.findOne({
                _id:id
            })
            return record
        },
    }
}