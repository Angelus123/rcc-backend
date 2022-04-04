import users from '../models/user.models.js'
const signupValidator = async (req, res, next) => {
  const user = await users.find({});
  let {email, name} = req.body
  if(!email) return res.json({error: 'email missing'});
  if(!name) return res.json({error: 'name missing'});
  if(user.find((u) => u.email == email
    )) res.json({message: `user with email ${email} exists`})
  next();
}

export {signupValidator as default}