const { DataSource } = require('typeorm');
const User = require('../models/User');
const Coordinator = require('../models/Coordinator')
const Organization = require('../models/Organization');
const Volunteer = require('../models/Volunteer')
const Disaster = require('../models/Disaster');
const Team = require('../models/Team');
const Notification = require('../models/Notification');
const config = require('./env');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: 5432,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [User, Organization, Volunteer, Coordinator,Disaster, Team, Notification]
});

module.exports = { AppDataSource };
