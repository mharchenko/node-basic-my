import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import studentsRouter from './routers/student.js'; // Імпортуємо роутер
// import { getAllStudents, getStudentById } from './services/student.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

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

  // app.get('/students', async (req, res) => {
  //   // res.json({ message: 'Hello world!' });
  //   const students = await getAllStudents();
  //   res.status(200).json({
  //     data: students,
  //   });
  // });

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use(studentsRouter); // Додаємо роутер до app як middleware

  // app.get('/students/:studentId', async (req, res, next) => {
  //   const { studentId } = req.params;
  //   const student = await getStudentById(studentId);
  //   if (!student) {
  //     res.status(404).json({
  //       message: 'Student not found',
  //     });
  //     return;
  //   }
  //   res.status(200).json({
  //     data: student,
  //   });
  // });

  // Кастомний Middleware для обробких неіснуючого шляху
  // app.use('*', (req, res, next) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });
  app.use('*', notFoundHandler);
  // Middleware для логування часу запиту

  //   app.use((reg, res, next) => {
  //     console.log(`Time: ${new Date().toLocaleString()}`);
  //     next();
  //   });

  // Кастомний Middleware для обробких помилок (приймає 4 аргументи)
  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  // });
  app.use(errorHandler);

  /*Викликаємо метов сервера для відповіді */
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
