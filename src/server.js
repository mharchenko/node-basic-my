import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';

/*Запускаємо сервер */

// const PORT = 3000;

/*Запускаємо сервер з dotenv  та функцією getEnvVar*/
const PORT = Number(getEnvVar('PORT', '3000'));

/*Ініціалізуємо Express */

export const startServer = () => {
  const app = express();

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
  // наприклад, у запитах POST або PATCH

  app.use(express.json());

  // Middleware для CORS
  app.use(cors());

  // Middleware для логування запиту з бібліотеки
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  /*Оголосімо перший маршрут для GET-запиту та обробник для нього. Для цього на сервері app потрібно викликати метод get */

  app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
  });

  // Кастомний Middleware для обробких неіснуючого шляху
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Middleware для логування часу запиту

  //   app.use((reg, res, next) => {
  //     console.log(`Time: ${new Date().toLocaleString()}`);
  //     next();
  //   });

  // Кастомний Middleware для обробких помилок (приймає 4 аргументи)
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  /*Викликаємо метов сервера для відповіді */
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
