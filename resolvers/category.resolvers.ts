
import Category from "../models/category.model";
export const resolversCategory={
    Query:{
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
    Mutation:{
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