"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsCategory = void 0;
exports.typeDefsCategory = `#graphql
    type Category{
        id:ID,
        title: String,
        avatar:String,
        description: String
    }

    type Query{
        getListCategory:[Category],
        getCategory(id:ID): Category,
    }
    

    input CategoryInput{
        title: String,
        avatar: String,
        description: String
    }

    type Mutation{
        createCategory(category: CategoryInput): Category,
        deleteCategory(id:ID):String,
        updateCategory(id:ID, category:CategoryInput): Category,
    }
`;
