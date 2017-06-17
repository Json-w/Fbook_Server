import redis from 'redis'
import bluebird from 'bluebird'

const client = redis.createClient({
  host: '127.0.0.1',
  port: '6379',
})

const ONE_WEEK = 24 * 60 * 60 * 7
bluebird.promisifyAll(redis.RedisClient.prototype);

export default {
  saveUser: (userWithToken)=> {
    client.set(userWithToken.user.token, JSON.stringify(userWithToken), 'EX', ONE_WEEK);
  },

  getUser: async(token)=> {
    let result = await client.getAsync(token);
    if (result) {
      return JSON.parse(result).user;
    } else {
      return null;
    }
  },

  set: (redisSaveObj)=> {
    client.set(redisSaveObj.key, redisSaveObj.value, 'EX', redisSaveObj.expire);
  },

  get: async(token)=> {
    return JSON.parse(await client.getAsync(token));
  },
}
