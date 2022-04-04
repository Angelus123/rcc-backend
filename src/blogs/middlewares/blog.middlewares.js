import {blogs} from '../controllers/blog.controllers.js'
const signupValidator = (req, res, next) => {
  let {email, name} = req.body
  const user = token
  if(!email) return res.json({error: 'email missing'});
  if(!name) return res.json({error: 'name missing'});
  if(users.find((u) => u.email == email)) return res.json({message: `user with email ${email} exists`})
  next();
}

export {signupValidator as default}