"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsUser = void 0;
exports.typeDefsUser = `#graphql
    type User{
        id:ID
        fullName:String,
        email:String,
        password: String,
        token: String,
        code: Int,
        message: String
    }
    type Query{
        getUser:User
    }

    input UserRegisterInput{
        fullName:String,
        email:String,
        password: String,
    }
    input UserLoginInput{
        email:String,
        password: String,
    }

    type Mutation{
        registerUser(user: UserRegisterInput):User
        loginUser(user:UserLoginInput):User
    }
`;
