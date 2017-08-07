export default class User {
  constructor (id, name, avatar) {
    this.id = id
    this.name = name
    this.avatar = avatar
  }
}

/**
 * [User的工厂方法]
 */
export function createUser (data) {
  return new User(data.user_id, data.nickname, data.headimgurl)
}
