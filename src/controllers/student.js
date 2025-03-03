// import { getAllStudents, getStudentById } from '../services/students.js';

import { getAllStudents, getStudentById } from '../services/student.js';
import createHttpError from 'http-errors';
// export const getStudentsController = async (req, res) => {
//   const students = await getAllStudents();

//   res.json({
//     status: 200,
//     message: 'Successfully found students!',
//     data: students,
//   });
// };

export const getStudentsController = async (req, res, next) => {
  try {
    const students = await getAllStudents();

    res.json({
      status: 200,
      message: 'Successfully found students!',
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

// export const getStudentByIdController = async (req, res) => {
//   const { studentId } = req.params;
//   const student = await getStudentById(studentId);

//   // Відповідь, якщо контакт не знайдено
//   if (!student) {
//     res.status(404).json({
//       message: 'Student not found',
//     });
//     return;
//   }

export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  // А тепер додаємо базову обробку помилки замість res.status(404)
  // if (!student) {
  //   next(new Error('Student not found'));
  //   return;
  // }

  if (!student) {
    // 2. Створюємо та налаштовуємо помилку
    throw createHttpError(404, 'Student not found');
  }

  // Відповідь, якщо контакт знайдено
  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
