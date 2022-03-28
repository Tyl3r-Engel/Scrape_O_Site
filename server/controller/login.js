const bcrypt = require('bcrypt')
const User = require('../../dataBase/model/User')
const util = require('util')

exports.login = async (req, res) => {
  const { userNameInput, userPassInput } = req.body
  const [isUser] = await User.where('userName').equals(userNameInput)
  if(isUser === undefined) {res.status(404).end(); return}
  bcrypt.compare(userPassInput, isUser.password, function(err, result) {
    if (err) {res.status(404).end(); return}
    return result === true ? res.status(200).end() : res.status(401).end()
  })

}

exports.createNewUser = async (req, res) => {
  const { userNameInput, userPassInput } = req.body
  const isUserExists = await User.where('userName').equals(userNameInput)
  if (isUserExists.length > 0){ res.status(409).end(); return}
  const createHash = util.promisify(bcrypt.hash)
  const hash = await createHash(userPassInput, 10);
  const newUser = new User()
  newUser.userName = userNameInput
  newUser.password = hash
  await newUser.save()
  res.status(201)
  res.end(JSON.stringify(newUser))
}