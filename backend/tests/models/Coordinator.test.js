const { EntitySchema } = require('typeorm');
const Coordinator = require('../../src/models/Coordinator');

describe('Coordinator Entity Schema', () => {
  it('should have the correct name and tableName', () => {
    expect(Coordinator.options.name).toBe('Coordinator');
    expect(Coordinator.options.tableName).toBe('coordinator');
  });

  it('should define the correct columns', () => {
    const columns = Coordinator.options.columns;

    expect(columns).toHaveProperty('coordinator_id');
    expect(columns.coordinator_id).toMatchObject({
      primary: true,
      type: 'int',
      generated: true,
    });

    expect(columns).toHaveProperty('department');
    expect(columns.department).toMatchObject({
      type: 'varchar',
      nullable: true,
    });

    expect(columns).toHaveProperty('region');
    expect(columns.region).toMatchObject({
      type: 'varchar',
      nullable: true,
    });

    expect(columns).toHaveProperty('officialContactNumber');
    expect(columns.officialContactNumber).toMatchObject({
      type: 'varchar',
      nullable: true,
    });

    expect(columns).toHaveProperty('roleTitle');
    expect(columns.roleTitle).toMatchObject({
      type: 'varchar',
      nullable: true,
    });

    expect(columns).toHaveProperty('experience');
    expect(columns.experience).toMatchObject({
      type: 'int',
      nullable: true,
    });

    expect(columns).toHaveProperty('certifications');
    expect(columns.certifications).toMatchObject({
      type: 'text',
      nullable: true,
    });

    expect(columns).toHaveProperty('bio');
    expect(columns.bio).toMatchObject({
      type: 'text',
      nullable: true,
    });
  });

  it('should define the correct relations', () => {
    const relations = Coordinator.options.relations;

    expect(relations).toHaveProperty('user');
    expect(relations.user).toMatchObject({
      target: 'User',
      type: 'one-to-one',
      joinColumn: true,
      inverseSide: 'coordinator',
    });

    expect(relations).toHaveProperty('disasters');
    expect(relations.disasters).toMatchObject({
      target: 'Disaster',
      type: 'one-to-many',
      inverseSide: 'coordinator',
      cascade: true,
    });
  });
});