import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger';

const app: Application = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  limit: 500,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
})

app.use(rateLimiter)

app.use(
  cors({
    //WARN:dev allowing all
    //origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3000'],
    origin: '*',
    credentials: true,
  }),
);

app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.get('/test', async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Server working....!',
  });
});


//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
