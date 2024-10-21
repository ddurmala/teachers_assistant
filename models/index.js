const Teacher = require('./Teacher');
const Student = require('./Student');
const Special_ed = require('./Special_ed');


Teacher.hasMany(Student);

Student.belongsTo(Teacher);

Special_ed.hasOne(Student, { foreignKey: 'special_ed_id' });

Student.belongsTo(Special_ed, { foreignKey: 'special_ed_id' });


module.exports = { Teacher, Student, Special_ed };

