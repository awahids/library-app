const { sendSuccessResponse, sendErrorResponse } = require('../helpers/responses.helper');
const { createStudent, getStudents } = require('../services/student.service');

const create = async (req, res) => {
  try {
    const student = await createStudent(req, res);

    return sendSuccessResponse(res, student, 'Student created successfully', false, 201);
  } catch (error) {
    console.error('Error in create:', error);
    return sendErrorResponse(res, error.statusCode, error.message);
  }
}

const getAll = async (req, res) => {
  try {
    const students = await getStudents(req, res);

    return sendSuccessResponse(res, students, "Students fetched successfully", true);
  } catch (error) {
    console.error('Error fetching students:', error);
    return sendErrorResponse(res, error.statusCode, error.message);
  }
};

module.exports = {
  create,
  getAll
}