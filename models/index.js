const config = require('../config');
const { Sequelize, DataTypes, Op } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.SEQUELIZE_DB,
    process.env.SEQUELIZE_USERNAME,
    process.env.SEQUELIZE_PASSWORD,
    {
        host: config.DB_HOST,
        dialect: config.dialect,
        operatorsAliases: 0,

        poll: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle,
        },
    }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

const User = require('./user.js')(sequelize, DataTypes);
const JobList = require('./job_list.js')(sequelize, DataTypes);

UserJob = sequelize.define('user_job', {
    role: Sequelize.STRING,
});

JobList.belongsToMany(User, {
    through: UserJob,
    foreignKey: 'id',
});

User.belongsToMany(JobList, {
    through: UserJob,
    foreignKey: 'user_id',
});

db.User = User;
db.JobList = JobList;
db.ROLES = ['user'];

module.exports = db;
