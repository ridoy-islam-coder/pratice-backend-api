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
try {
    let email=req.params.email;
    let data=await UsersModel.findOne({email: email})
    if(data==null){
        return res.json({status:"fail","Message":"User email does not exist"})
    }
    else {

        // Send OTP To Email
        let code=Math.floor(100000+Math.random()*900000)
        let EmailTo= data['email'];
        let EmailText= "Your Code is "+ code;
        let EmailSubject= "Task Manager Verification Code"
        await SendEmail(EmailTo, EmailText, EmailSubject)

        // Update OTP In User
        await UsersModel.updateOne({email: email},{otp:code})
        return res.json({status:"success",Message:"Verification successfully,check email"})

    }
}
catch (e){
    return res.json({status:"fail","Message":e.toString()})
}
}

export const CodeVerify=async(req,res)=>{
       
   try {
        let reqBody=req.body;
        let data=await UsersModel.findOne({email: reqBody['email'],otp:reqBody['otp']})
        if(data==null){
            return res.json({status:"fail","Message":"Wrong Verification Code"})
        }
        else {
            return res.json({status:"success","Message":"Verification successfully"})
        }
    }
    catch (e){
        return res.json({status:"fail","Message":e.toString()})
    }
}

export const ResetPassword=async(req,res)=>{
  try {
        let reqBody=req.body;
        let data=await UsersModel.findOne({email: reqBody['email'],otp:reqBody['otp']})
        if(data==null || data.otp === "0"){
            return res.json({status:"fail","Message":"Wrong Verification Code"})
        }
        else {

           await UsersModel.updateOne({email: reqBody['email']},{
                otp:"0", password:reqBody['password'],
           })
            return res.json({status:"success",Message:"Password Reset successfully"})
        }
    }
    catch (e){
        return res.json({status:"fail","Message":e.toString()})
    }
}


