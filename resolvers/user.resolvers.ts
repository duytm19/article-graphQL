import { generateRandomString } from "../helpers/generate"
import User from "../models/user.model"
import md5 from "md5"

export const resolversUser={

    Mutation:{
        registerUser:async(_,args)=>{
            const {user} = args

            const existUser = await User.findOne({
                email:user.email,
                deleted:false
            })

            if(existUser){
                return {
                    code: 400,
                    message:"Email is existence!!"
                }
            }
            else{
                user.password= md5(user.password)
                user.token = generateRandomString(30)

                const newUser = new User(user)
                const data = await newUser.save()

                return{
                    code:200,
                    message:"Register successfully!!",
                    id:data.id,
                    fullName:data.fullName,
                    email:data.email,
                    token:data.token,
                }
            }
        }
    }
}