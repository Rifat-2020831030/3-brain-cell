const { EntitySchema } = require('typeorm');
const VolunteerApplication = require('../../src/models/VolunteerApplication');

describe('VolunteerApplication Entity Schema', () => {
  it('should have the correct name and tableName', () => {
    expect(VolunteerApplication.options.name).toBe('VolunteerApplication');
    expect(VolunteerApplication.options.tableName).toBe('volunteer_applications');
  });

  it('should define the correct columns', () => {
    const columns = VolunteerApplication.options.columns;

    expect(columns).toHaveProperty('application_id');
    expect(columns.application_id).toMatchObject({
      primary: true,
      type: 'int',
      generated: true,
    });

    expect(columns).toHaveProperty('status');
    expect(columns.status).toMatchObject({
      type: 'enum',
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    });

    expect(columns).toHaveProperty('createdAt');
    expect(columns.createdAt).toMatchObject({
      type: 'timestamp',
      default: expect.any(Function),
    });
  });

  it('should define the correct relations', () => {
    const relations = VolunteerApplication.options.relations;

    expect(relations).toHaveProperty('volunteer');
    expect(relations.volunteer).toMatchObject({
      target: 'Volunteer',
      type: 'many-to-one',
      joinColumn: true,
      nullable: false,
    });

    expect(relations).toHaveProperty('organization');
    expect(relations.organization).toMatchObject({
      target: 'Organization',
      type: 'many-to-one',
      joinColumn: true,
      nullable: false,
    });
  });
});