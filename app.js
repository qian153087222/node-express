const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const RedusStore = require('connect-redis');
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const bolgRouter = require('./routes/blog');
const userRouter = require('./routes/user');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));//设置日志
app.use(express.json());//解析参数
app.use(express.urlencoded({ extended: false }));//解析urlcode格式
app.use(cookieParser());//解析cookie
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient
});
//path: '/',默认
//httpOnly: true,默认
app.use(session(
  {
    resave: false, //添加 resave 选项
    secret: 'WJiol_8766#$1247',
    saveUninitialized: true, //添加 saveUninitialized 选项,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store:sessionStore
  }));

//处理路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter); 
app.use('/api/blog', bolgRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
