const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const createError = require('http-errors');

require('dotenv').config();

const authRouter = require('./routes/auth');
const demoRouter = require('./routes/demo');
const postRouter = require('./routes/posts');
const notesRouter = require('./routes/notes');

async function setupApp() {
	const app = express();

	app.use(
		cors({
			credentials: true,
			origin: [process.env.FRONTEND_DOMAIN],
		})
	);
	app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1); // --> add this line 
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI,
			ttl: 24 * 60 * 60,
		}),
		secret: process.env.SECRET_SESSION,
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: process.env.COOKIES_SAMESITE === 'true' ? 'lax' : 'none', // --> add this line
			secure: process.env.COOKIES_SAMESITE !== 'true', // --> add this line
		},
	})
);


	app.use('/api', require('./routes/file-upload.routes'));
	app.use('/', authRouter);
	app.use('/', postRouter);
	app.use('/', notesRouter);
	app.use('/protected', demoRouter);

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		next(createError(404));
	});

	// eslint-disable-next-line no-unused-vars
	app.use((error, req, res, next) => {
		// eslint-disable-next-line no-console
		const rawStatus = error.status ?? error.statusCode;
		const status = typeof rawStatus === 'number' && rawStatus >= 400 && rawStatus < 600 ? rawStatus : undefined;
		const rawName = error.name;
		const name = typeof rawName === 'string' && status !== undefined ? rawName : undefined;
		const rawMessage = error.message;
		const message = typeof rawMessage === 'string' ? rawMessage : '';
		const responseError = {
			status: status ?? 500,
			name: name ?? 'InternalServerError',
			message,
		};
		res.locals.responseError = responseError;
		res.status(responseError.status).json({ error: responseError });
	});

	return app;
}

module.exports = setupApp;
