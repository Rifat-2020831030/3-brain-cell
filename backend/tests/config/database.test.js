const { DataSource } = require('typeorm');
const { AppDataSource } = require('../../src/config/database');
const User = require('../../src/models/User');
const Coordinator = require('../../src/models/Coordinator');
const Organization = require('../../src/models/Organization');
const Volunteer = require('../../src/models/Volunteer');
const Disaster = require('../../src/models/Disaster');
const Team = require('../../src/models/Team');
const Notification = require('../../src/models/Notification');
const VolunteerApplication = require('../../src/models/VolunteerApplication');
const DailyReport = require('../../src/models/DailyReport');
const config = require('../../src/config/env');

describe('AppDataSource Configuration', () => {
  it('should be an instance of DataSource', () => {
    expect(AppDataSource).toBeInstanceOf(DataSource);
  });

  it('should have the correct database configuration', () => {
    expect(AppDataSource.options).toMatchObject({
      type: 'postgres',
      host: config.db.host,
      port: 5432,
      username: config.db.user,
      password: config.db.password,
      database: config.db.database,
      synchronize: true,
      logging: false,
    });
  });

  it('should include all required entities', () => {
    const expectedEntities = [
      User,
      Volunteer,
      Coordinator,
      Organization,
      Disaster,
      Team,
      Notification,
      VolunteerApplication,
      DailyReport,
    ];

    expect(AppDataSource.options.entities).toEqual(expect.arrayContaining(expectedEntities));
    expect(AppDataSource.options.entities.length).toBe(expectedEntities.length);
  });

  it('should initialize without errors', async () => {
    const initializeMock = jest.spyOn(AppDataSource, 'initialize').mockResolvedValue(AppDataSource);

    await expect(AppDataSource.initialize()).resolves.toBe(AppDataSource);
    expect(initializeMock).toHaveBeenCalledTimes(1);

    initializeMock.mockRestore();
  });

  it('should close the connection without errors', async () => {
    const destroyMock = jest.spyOn(AppDataSource, 'destroy').mockResolvedValue();

    await expect(AppDataSource.destroy()).resolves.toBeUndefined();
    expect(destroyMock).toHaveBeenCalledTimes(1);

    destroyMock.mockRestore();
  });
});