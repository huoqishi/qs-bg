/**
 * 点赞表
 */
const Sequelize = require('sequelize')
const sequelize = require('./db')
const ThumbUp = sequelize.define('thumbup', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  userId: {
    type: Sequelize.UUID
    // 'unique': true
  },
  topicId: {
    type: Sequelize.UUID
  },
  thumbUp: {
    type: Sequelize.BOOLEAN
    // type: Sequelize.INTEGER
  }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  // timestamps: false
})
// force: true 如果表已经存在，将会丢弃表
ThumbUp.sync({force: false}).then(() => {
  // console.log('表已创建')
  // 表已创建
  // return User.create({
  //   firstName: 'John',
  //   lastName: 'Hancock'
  // })
})
module.exports = ThumbUp
