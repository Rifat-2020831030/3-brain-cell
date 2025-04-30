const { EntitySchema } = require('typeorm');
const Organization = require('../../src/models/Organization');

describe('Organization Entity Schema', () => {
  it('should have the correct name and tableName', () => {
    expect(Organization.options.name).toBe('Organization');
    expect(Organization.options.tableName).toBe('organizations');
  });

  it('should define the correct columns', () => {
    const columns = Organization.options.columns;

    expect(columns).toHaveProperty('organization_id');
    expect(columns.organization_id).toMatchObject({
      primary: true,
      type: 'int',
      generated: true,
    });

    expect(columns).toHaveProperty('organization_name');
    expect(columns.organization_name).toMatchObject({
      type: 'varchar',
      nullable: false,
    });

    expect(columns).toHaveProperty('type');
    expect(columns.type).toMatchObject({
      type: 'enum',
      enum: ['Non-profit', 'Government', 'Private', 'NGO', 'Other'],
    });

    expect(columns).toHaveProperty('sector');
    expect(columns.sector).toMatchObject({
      type: 'enum',
      enum: ['Health', 'Education', 'Environment', 'Human Rights', 'Disaster Relief', 'Other'],
    });

    const varcharFields = [
      'documentLink', 'regNo', 'secondaryContactName', 'secondaryContactTitle',
      'secondaryContactMail', 'location', 'website', 'socialMediaLink', 'parentOrg',
    ];
    varcharFields.forEach((field) => {
      expect(columns).toHaveProperty(field);
      expect(columns[field]).toMatchObject({
        type: 'varchar',
      });
    });

    expect(columns).toHaveProperty('establishedDate');
    expect(columns.establishedDate).toMatchObject({
      type: 'date',
    });

    expect(columns).toHaveProperty('mission');
    expect(columns.mission).toMatchObject({
      type: 'text',
    });

    expect(columns).toHaveProperty('approval_status');
    expect(columns.approval_status).toMatchObject({
      type: 'enum',
      enum: ['approved', 'pending', 'rejected'],
      default: 'pending',
    });
  });

  it('should define the correct relations', () => {
    const relations = Organization.options.relations;

    expect(relations).toHaveProperty('user');
    expect(relations.user).toMatchObject({
      target: 'User',
      type: 'one-to-many',
      inverseSide: 'organization',
    });

    expect(relations).toHaveProperty('members');
    expect(relations.members).toMatchObject({
      target: 'Volunteer',
      type: 'one-to-many',
      inverseSide: 'organization',
    });

    expect(relations).toHaveProperty('disasters');
    expect(relations.disasters).toMatchObject({
      target: 'Disaster',
      type: 'many-to-many',
      joinTable: {
        name: 'disaster_organizations',
      },
    });

    expect(relations).toHaveProperty('teams');
    expect(relations.teams).toMatchObject({
      target: 'Team',
      type: 'one-to-many',
      inverseSide: 'organization',
    });
  });
});