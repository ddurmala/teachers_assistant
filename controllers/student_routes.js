const router = require('express').Router();
const { Student } = require('../models');

// Create a student
router.post('/', async (request, response) => {
  const formData = request.body;
  try {
    const student = await Student.create(formData)
    response.json({
      message: 'Student created Sucessfully',
      student: student
    })
  } catch (error) {
    const errors = error.errors.map((errObj) => {
      return {
        message: errObj.message
      }
    })
    response.json(errors)
  }
})

// Update student
router.put('/:student_id', async (req, res) => {
  const student = await Student.update(
    req.body,
    {
      where: {
        id: req.params.student_id
      },
      returning: true,
      plain: true
    }
  )
  res.json(student[1])
})

// Get One student by id
router.get('/:student_id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.student_id);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while retrieving the student',
      error: error.message
    });
  }
});

// Delete student
router.delete('/remove/:student_id', async (req, res) => {
  await Student.destroy({
    where: {
      id: req.params.student_id
    }
  })
  res.redirect('/dashboard');
})

module.exports = router;