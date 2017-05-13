import redis from 'redis'
import bluebird from 'bluebird'

const client = redis.createClient({
  host: '127.0.0.1',
  port: '6379',
})
bluebird.promisifyAll(redis.RedisClient.prototype);

export default {
  saveUser: (userWithToken)=> {
    client.set(userWithToken.user.token, JSON.stringify(userWithToken), 'EX', 24 * 60 * 60 * 7);
  },

  getUser:async (token)=> {
    return JSON.parse(await client.getAsync(token)).user;
  }
}
