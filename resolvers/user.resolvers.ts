import { Query } from "mongoose"
import { generateRandomString } from "../helpers/generate"
import User from "../models/user.model"
import md5 from "md5"
import { info } from "console"

export const resolversUser={

    Query:{
        getUser:async (_,args,context)=>{
      
        
           const token =context.req["user"].token
           //console.log()

            const infoUser = await User.findOne({
                token:token,
                deleted:false
            })

            if(infoUser){
                return{
                    code:200,
                    message:"Get info User successfullly!!",
                    id:infoUser.id,
                    fullName:infoUser.fullName,
                    email:infoUser.email
                }
            }else{
                return{
                    code:400,
                    message:"fail to get info user"
                }
            }
        }
    },
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
        },
        loginUser:async(_,args)=>{
            const {email,password}= args.user

            const infoUser = await User.findOne({
                email:email,
                deleted:false
            })

            if(!infoUser){
                return {
                    code:400,
                    message:"Email is not existence!!"
                }
            }
            if(md5(password)!== infoUser.password){
                return{
                    code:400,
                    message:"Password is not correct!!"
                }
            }
            return{
                code:200,
                message:"Successfully!!",
                id:infoUser.id,
                fullName: infoUser.fullName,
                email:infoUser.email,
                token:infoUser.token
            }
        }
    }
}