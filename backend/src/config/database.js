const { DataSource } = require('typeorm');
const User = require('../models/User');
const Coordinator = require('../models/Coordinator')
const Organization = require('../models/Organization');
const Volunteer = require('../models/Volunteer')
const Disaster = require('../models/Disaster');
const Team = require('../models/Team');
const Notification = require('../models/Notification');
const VolunteerApplication = require('../models/VolunteerApplication');
const DailyReport = require('../models/DailyReport');
const config = require('./env');


const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: 5432,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: false // This is needed if you're connecting to services like Heroku or Railway
  },
  entities: [
    User,                  
    Volunteer,
    Coordinator,
    Organization,
    Disaster,
    Team,
    Notification,
    VolunteerApplication,
    DailyReport
  ],
});

module.exports = { AppDataSource };
