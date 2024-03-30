const User = require('../Schemas/UserSchema')
export const checkIfUserExist = async(req,res,next)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            res.send("user does not exist.")
        }
    } catch (error) {
        res.send("an error occurred").status(502);
    }
}