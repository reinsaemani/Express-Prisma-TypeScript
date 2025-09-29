import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';
import cookieParser from 'cookie-parser';
import requestLogger from './middleware/requestLogger';
import { pino } from 'pino';
import vacanciesRouter from './routes/vacancies.router';
import userRouter from './routes/users.router';
import applicantsRouter from './routes/applicants.router';
import applicantsDetailsRouter from './routes/applicantsDetails.router';
import accountRouter from './routes/account.router';
import authRouter from './routes/auth.router';

dotenv.config();

export const logger = pino({ name: 'server start' });
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

// CORS Middleware
const corsOptions = {
  origin:
    process.env.APP_ENV === 'development'
      ? 'http://localhost:3000' // frontend localhost
      : process.env.ORIGIN, // production
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// pastikan ini DISEBELAH middleware JSON / cookie
app.options('*', cors(corsOptions));
// JSON Middleware & Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// Request Logger
app.use(requestLogger);

// Main Routes
app.use('/api/accounts', accountRouter);
app.use('/api/auth', authRouter);
app.use('/api/applicants', applicantsRouter);
app.use('/api/applicants-details', applicantsDetailsRouter);
app.use('/api/users', userRouter);
app.use('/api/vacancies', vacanciesRouter);

// Not Found Middleware
app.use(notFoundHandler);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Listening on PORT ${PORT}`);
});
