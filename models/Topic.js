/**
 * 话题
 */
const Sequelize = require('sequelize')
const sequelize = require('./db')
const Topic = sequelize.define('topic', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  title: {
    type: Sequelize.STRING
    // 'unique': true
  },
  content: {
    type: Sequelize.STRING(1000)
  },
  cover: {
    type: Sequelize.STRING
  }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  // timestamps: false
})
// force: true 如果表已经存在，将会丢弃表
Topic.sync({force: false}).then(() => {
  console.log('表已创建')
  // 表已创建
  // return User.create({
  //   firstName: 'John',
  //   lastName: 'Hancock'
  // })
})
module.exports = Topic
