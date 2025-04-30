const { EntitySchema } = require('typeorm');
const Volunteer = require('../../src/models/Volunteer');

describe('Volunteer Entity Schema', () => {
  it('should have the correct name and tableName', () => {
    expect(Volunteer.options.name).toBe('Volunteer');
    expect(Volunteer.options.tableName).toBe('volunteers');
  });

  it('should define the correct columns', () => {
    const columns = Volunteer.options.columns;

    expect(columns).toHaveProperty('volunteer_id');
    expect(columns.volunteer_id).toMatchObject({
      primary: true,
      type: 'int',
      generated: true,
    });

    expect(columns).toHaveProperty('skills');
    expect(columns.skills).toMatchObject({
      type: 'text',
      array: true,
    });

    expect(columns).toHaveProperty('work_location');
    expect(columns.work_location).toMatchObject({
      type: 'varchar',
    });
  });

  it('should define the correct relations', () => {
    const relations = Volunteer.options.relations;

    expect(relations).toHaveProperty('user');
    expect(relations.user).toMatchObject({
      target: 'User',
      type: 'one-to-one',
      joinColumn: true,
      inverseSide: 'volunteer',
    });

    expect(relations).toHaveProperty('organization');
    expect(relations.organization).toMatchObject({
      target: 'Organization',
      type: 'many-to-one',
      joinColumn: true,
      nullable: true,
    });

    expect(relations).toHaveProperty('teams');
    expect(relations.teams).toMatchObject({
      target: 'Team',
      type: 'many-to-many',
      inverseSide: 'members',
      joinTable: true,
    });

    expect(relations).toHaveProperty('volunteerApplications');
    expect(relations.volunteerApplications).toMatchObject({
      target: 'VolunteerApplication',
      type: 'one-to-many',
      inverseSide: 'volunteer',
    });
  });
});