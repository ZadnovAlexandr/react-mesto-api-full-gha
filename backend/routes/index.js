const router = require('express').Router();
const ErrorNotFound = require('../errors/ErrorNotFound');

const userRouter = require('./user');
const cardRouter = require('./card');

const { logout, tokenCheck } = require('../controllers/user');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.post('/signout', logout);

router.get('/check', tokenCheck);

router.use('*', (req, res, next) => {
  next(new ErrorNotFound('Страница по данному маршруту не найдена'));
});

module.exports = router;
