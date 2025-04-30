const { EntitySchema } = require('typeorm');
const Team = require('../../src/models/Team');

describe('Team Entity Schema', () => {
  it('should have the correct name and tableName', () => {
    expect(Team.options.name).toBe('Team');
    expect(Team.options.tableName).toBe('teams');
  });

  it('should define the correct columns', () => {
    const columns = Team.options.columns;

    expect(columns).toHaveProperty('team_id');
    expect(columns.team_id).toMatchObject({
      primary: true,
      type: 'int',
      generated: true,
    });

    expect(columns).toHaveProperty('name');
    expect(columns.name).toMatchObject({
      type: 'varchar',
      nullable: false,
    });

    expect(columns).toHaveProperty('teamLeader');
    expect(columns.teamLeader).toMatchObject({
      type: 'int',
      nullable: true,
    });

    expect(columns).toHaveProperty('responsibility');
    expect(columns.responsibility).toMatchObject({
      type: 'varchar',
      nullable: true,
    });

    expect(columns).toHaveProperty('location');
    expect(columns.location).toMatchObject({
      type: 'varchar',
      nullable: true,
    });

    expect(columns).toHaveProperty('createdAt');
    expect(columns.createdAt).toMatchObject({
      type: 'timestamp',
      default: expect.any(Function),
    });

    expect(columns).toHaveProperty('assignedAt');
    expect(columns.assignedAt).toMatchObject({
      type: 'timestamp',
      nullable: true,
    });

    expect(columns).toHaveProperty('assignmentStatus');
    expect(columns.assignmentStatus).toMatchObject({
      type: 'enum',
      enum: ['assigned', 'unassigned'],
      default: 'unassigned',
    });
  });

  it('should define the correct relations', () => {
    const relations = Team.options.relations;

    expect(relations).toHaveProperty('organization');
    expect(relations.organization).toMatchObject({
      target: 'Organization',
      type: 'many-to-one',
      joinColumn: true,
    });

    expect(relations).toHaveProperty('disaster');
    expect(relations.disaster).toMatchObject({
      target: 'Disaster',
      type: 'many-to-one',
      joinColumn: true,
      nullable: true,
      onDelete: 'CASCADE',
    });

    expect(relations).toHaveProperty('members');
    expect(relations.members).toMatchObject({
      target: 'Volunteer',
      type: 'many-to-many',
      joinTable: true,
    });
  });
});