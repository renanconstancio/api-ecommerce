import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { CelebrateError, errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);
app.use(errors());
app.use('/files', express.static(uploadConfig.directory));
app.use('/api', routes);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof CelebrateError) {
      // is a celebrate error
      const result: {
        error: 'VALIDATION_ERROR';
        messages: { [x: string]: string }[];
      } = {
        error: 'VALIDATION_ERROR',
        messages: [],
      };

      const errorDetails: any = error.details.entries();

      for (const [a, joiError] of errorDetails) {
        result.messages = joiError.details.map((err: any) => {
          const key = err.message.split(' ')[0];
          const message = err.message;

          return {
            [key.replace(/[\\"]/g, '')]: message.substr(key.length + 1),
          };
        });
      }
      return response.status(422).json(result);
    }

    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export { app };
