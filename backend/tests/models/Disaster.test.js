const { EntitySchema } = require('typeorm');
const Disaster = require('../../src/models/Disaster');

describe('Disaster Entity Schema', () => {
  it('should have the correct name and tableName', () => {
    expect(Disaster.options.name).toBe('Disaster');
    expect(Disaster.options.tableName).toBe('disasters');
  });

  it('should define the correct columns', () => {
    const columns = Disaster.options.columns;

    expect(columns).toHaveProperty('disaster_id');
    expect(columns.disaster_id).toMatchObject({
      primary: true,
      type: 'int',
      generated: true,
    });

    expect(columns).toHaveProperty('title');
    expect(columns.title).toMatchObject({
      type: 'varchar',
      nullable: false,
    });

    expect(columns).toHaveProperty('type');
    expect(columns.type).toMatchObject({
      type: 'enum',
      enum: [
        'Earthquake', 'Flood', 'Wildfire', 'Landslide', 'Hurricane', 'Fire',
        'Tornado', 'Tsunami', 'Drought', 'Pandemic', 'Industrial', 'Other',
      ],
    });

    expect(columns).toHaveProperty('description');
    expect(columns.description).toMatchObject({
      type: 'text',
      nullable: false,
    });

    expect(columns).toHaveProperty('status');
    expect(columns.status).toMatchObject({
      type: 'enum',
      enum: ['Open', 'Closed'],
      default: 'Open',
    });

    expect(columns).toHaveProperty('location');
    expect(columns.location).toMatchObject({
      type: 'varchar',
      nullable: true,
    });

    expect(columns).toHaveProperty('coordinates');
    expect(columns.coordinates).toMatchObject({
      type: 'varchar',
      nullable: true,
    });

    expect(columns).toHaveProperty('area');
    expect(columns.area).toMatchObject({
      type: 'simple-json',
      nullable: true,
    });

    expect(columns).toHaveProperty('startDate');
    expect(columns.startDate).toMatchObject({
      type: 'timestamp',
      nullable: true,
    });

    expect(columns).toHaveProperty('endDate');
    expect(columns.endDate).toMatchObject({
      type: 'timestamp',
      nullable: true,
    });

    expect(columns).toHaveProperty('createdAt');
    expect(columns.createdAt).toMatchObject({
      type: 'timestamp',
      default: expect.any(Function),
    });
  });

  it('should define the correct relations', () => {
    const relations = Disaster.options.relations;

    expect(relations).toHaveProperty('coordinator');
    expect(relations.coordinator).toMatchObject({
      target: 'Coordinator',
      type: 'many-to-one',
      joinColumn: true,
      nullable: false,
    });

    expect(relations).toHaveProperty('organizations');
    expect(relations.organizations).toMatchObject({
      target: 'Organization',
      type: 'many-to-many',
      joinTable: {
        name: 'disaster_organizations',
      },
    });

    expect(relations).toHaveProperty('teams');
    expect(relations.teams).toMatchObject({
      target: 'Team',
      type: 'one-to-many',
      inverseSide: 'disaster',
    });
  });
});