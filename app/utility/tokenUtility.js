import { JWT_EXPIRE_TIME, JWT_KEY } from './../config/config.js';

export const TokenEncode=async(email,user_id)=>{

  const KEY=JWT_KEY
  const EXPIRE=JWT_EXPIRE_TIME
  const PAYLOAD={email:email,user_id:user_id}
  return jwt.sign(PAYLOAD,KEY,{expiresIn:EXPIRE})
}

export const TokenDecode=(req,res)=>{
    try{
       const KEY=JWT_KEY
       return jwt.verify(token.KEY)
      


    }catch(err){
        console.log(err)
        return res.status(500).json({status:"error",message:"Internal Server Error"})
    }

}