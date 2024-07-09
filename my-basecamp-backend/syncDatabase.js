const sequelize = require('./config/database');
const { User, Project, File, ProjectTeam, Task } = require('./models/associations');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
})();
