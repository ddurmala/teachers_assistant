const router = require('express').Router();
const { Student } = require('../models');

// Create a student
router.post('/add', async (req, res) => {
  const formData = req.body;
  try {
    const specialEd = await Special_ed.create({
      iep_url: formData.iep_url,
      notes: formData.notes,
    });

    await Student.create({
      ...formData,
      teacherId: req.session.teacher_id,
      special_ed_id: specialEd.id
    })
    res.redirect('/dashboard')
  } catch (error) {
    console.log('add error', error);
    const errors = error.errors.map((errObj) => {
      return {
        message: errObj.message
      }
    })
    res.redirect('/add')
  }
})

// Update student
router.put('/edit/:student_id', async (req, res) => {
  await Student.update(
    req.body,
    {
      where: {
        id: req.params.student_id
      },
      returning: true,
      plain: true
    }
  );

  if (req.body.special_ed_id) {
    await Special_ed.update({
      iep_url: req.body.iep_url,
      notes: req.body.notes,
    }, {
      where: { id: req.body.special_ed_id }
    });
  }

  res.redirect('/dashboard')
})

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