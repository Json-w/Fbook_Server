import tokenService from './TokenService'

export default {
  checkOwner: async(token, userId)=> {
    let result = await tokenService.getUser(token);
    return result.id == userId;
  }
}
