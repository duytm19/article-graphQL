
export const typeDefsUser = `#graphql
    type User{
        fullName:String,
        email:String,
        password: String,
        token: String,
        code: Int,
        message: String
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
`