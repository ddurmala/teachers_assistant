const Teacher = require('./Teacher');
const Student = require('./Student');
const Special_ed = require('./Special_eds');


Teacher.hasMany(Student);

Student.belongsTo(Teacher);

Special_ed.hasOne(Student);

Student.belongsTo(Special_ed);

// Teacher.hasMany(Student, {
//     foreignKey: 'teacher_id'
// });

// Student.belongsTo(Teacher, {
//     foreignKey: 'student_id'
// });

module.exports = { Teacher, Student, Special_ed };

