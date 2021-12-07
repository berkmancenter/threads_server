const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');

const register = catchAsync(async (req, res) => {
  if (userService.isTokenGeneratedByThreads(req.body.token) === false) {
    throw new Error('Invalid login token');
  }
  const user = await userService.createUser(req.body);
  user.goodReputation = await userService.goodReputation(user);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const user = await authService.loginUser(req.body);
  user.goodReputation = await userService.goodReputation(user);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const ping = catchAsync(async (req, res) => {
  res.send('pong');
});

const newPseudonym = catchAsync(async (req, res) => {
  const token = userService.newToken();
  const pseudonym = userService.newPseudonym();
  res.send({ token: token, pseudonym: pseudonym});
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  ping,
  newPseudonym,
};
