const User = require('../../dataBase/model/User')

exports.getHistory = async (req, res) => {
  const {userName} = req.query
  const userHistory = await User
    .where("userName")
    .equals(userName)
    .select({
      "_id": 0,
      "userName": 0,
      "password": 0,
      "__v": 0
    })
  res.end(JSON.stringify(userHistory))
}

exports.addHistory = async (req, res) => {
  const {userName, currentSearchData} = req.body
  await User.findOneAndUpdate(
    {
      userName
    },
    {
      $push: {
        userData: currentSearchData
      }
    })
  res.status(204).end()
}