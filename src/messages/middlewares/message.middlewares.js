import {messages} from '../controllers/message.controllers.js'
const signupValidator = (req, res, next) => {
  let {email} = req.body
  if(!email) return res.json({error: 'email missing'});
  if(users.find((u) => u.email == email)) res.json({message: `user with email ${email} exists`})
  next();
}

export {signupValidator as default}