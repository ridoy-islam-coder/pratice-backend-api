import Users from "../model/UsersModel.js";

export const Registration=async(req,res)=>{
 
    try{
     const rqqBody=req.body;
     await Users.create(rqqBody)
     return res.status(201).json({status:"success",message:"User created successfully"})


    }catch(err){
        console.log(err)
        return res.status(500).json({status:"error",message:"Internal Server Error"})
    }
 




    return res.json({status:"success"})
}

export const Login=async(req,res)=>{

    return res.json({status:"success"})
}

export const ProfileDetails=async(req,res)=>{

    return res.json({status:"success"})
}

export const ProfileUpdate=async(req,res)=>{

    return res.json({status:"success"})
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



