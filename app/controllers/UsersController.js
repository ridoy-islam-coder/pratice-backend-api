import Users from "../model/UsersModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";


export const Registration=async(req,res)=>{
 
    try{
     const rqqBody=req.body;
     await Users.create(rqqBody)
     return res.status(201).json({status:"success",message:"User created successfully"})


    }catch(err){
        console.log(err)
        return res.status(500).json({status:"error",message:"Internal Server Error"})
    } 
}

export const Login=async(req,res)=>{
      try{
          const rqqBody=req.body;
            const user=await Users.find(rqqBody)
            if(!user){
                return res.status(404).json({status:"error",message:"User not found"})
            }else{

                let token=TokenEncode(user.email,user._id)
                return res.status(200).json({status:"success",message:"User logged in successfully",user:{token:token}})
            }

   
      }catch(err){
        console.log(err)
        return res.status(500).json({status:"error",message:"Internal Server Error"})
    } 


}

export const ProfileDetails=async(req,res)=>{
   try{
   let user_id=req.headers.user_id;
   let data=await Users.findOne({_id:user_id})
   return res.status(200).json({status:"success",message:"User profile details",data:data})
   

   }catch(err){
        console.log(err)
        return res.status(500).json({status:"error",message:"Internal Server Error"})
    }



   
}

export const ProfileUpdate=async(req,res)=>{
  try{
     const rqqBody=req.body;
     const user_id=req.headers.user_id;
     await Users.updateOne({_id:user_id},{$set:rqqBody})
     return res.status(201).json({status:"success",message:"User created successfully"})


    }catch(err){
        console.log(err)
        return res.status(500).json({status:"error",message:"Internal Server Error"})
    } 
}

export const EmailVerify=async(req,res)=>{

    return res.json({status:"success"})
}

export const CodeVerify=async(req,res)=>{
       
    return res.json({status:"success"})
}

export const ResetPassword=async(req,res)=>{

    return res.json({status:"success"})
}



