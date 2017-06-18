import 'babel-polyfill'
import userService from '../../src/service/UserService'
import assert from 'assert'
import sinon from 'sinon'
import tokenService from '../../src/service/TokenService'
import User from '../../src/models/User'

describe('test userService login', ()=> {
  let userStub;
  let tokenServiceStub;
  beforeEach(()=> {
    userStub = sinon.stub(User, 'findAll');
    tokenServiceStub = sinon.stub(tokenService, "saveUser");
  });
  afterEach(()=> {
    userStub.restore();
    tokenServiceStub.restore();
  })
  it('test login with correct username and password', async()=> {
    userStub.withArgs(sinon.match({
      where: {
        password: sinon.match.string,
        email: "correctUsername",
      }
    })).resolves([{username: 'correctUsername'}]);

    let result = await userService.logIn('correctUsername', 'correctPassword');

    assert.strictEqual(result.username, "correctUsername");
    assert.strictEqual(result.password, null);
    assert(tokenServiceStub.calledOnce);
  });

  it('test login with wrong username and password', async()=> {
    userStub.withArgs({
      where: {
        password: sinon.match.string,
        email: "wrongEmail"
      }
    }).returns([]);

    let result = await userService.logIn("wrongEmail", "wrongPassword");

    assert(tokenServiceStub.notCalled);
    assert.strictEqual(result, null);
  })
});