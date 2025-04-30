const { EntitySchema } = require('typeorm');
const User = require('../../src/models/User');

describe('User Entity Schema', () => {
  it('should have the correct name and tableName', () => {
    expect(User.options.name).toBe('User');
    expect(User.options.tableName).toBe('users');
  });

  it('should define the correct columns', () => {
    const columns = User.options.columns;

    expect(columns).toHaveProperty('userId');
    expect(columns.userId).toMatchObject({
      primary: true,
      type: 'int',
      generated: true,
    });

    expect(columns).toHaveProperty('name');
    expect(columns.name).toMatchObject({
      type: 'varchar',
      length: 255,
    });

    expect(columns).toHaveProperty('email');
    expect(columns.email).toMatchObject({
      type: 'varchar',
      unique: true,
    });

    expect(columns).toHaveProperty('mobile');
    expect(columns.mobile).toMatchObject({
      type: 'varchar',
    });

    expect(columns).toHaveProperty('password');
    expect(columns.password).toMatchObject({
      type: 'varchar',
    });

    expect(columns).toHaveProperty('location');
    expect(columns.location).toMatchObject({
      type: 'varchar',
    });

    expect(columns).toHaveProperty('role');
    expect(columns.role).toMatchObject({
      type: 'enum',
      enum: ['visitor', 'volunteer', 'organization', 'coordinator'],
      default: 'visitor',
    });

    expect(columns).toHaveProperty('emailVerified');
    expect(columns.emailVerified).toMatchObject({
      type: 'boolean',
      default: false,
    });

    expect(columns).toHaveProperty('emailVerificationCode');
    expect(columns.emailVerificationCode).toMatchObject({
      type: 'varchar',
      nullable: true,
    });

    expect(columns).toHaveProperty('passwordResetToken');
    expect(columns.passwordResetToken).toMatchObject({
      type: 'varchar',
      nullable: true,
    });

    expect(columns).toHaveProperty('passwordResetExpires');
    expect(columns.passwordResetExpires).toMatchObject({
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
    const relations = User.options.relations;

    expect(relations).toHaveProperty('organization');
    expect(relations.organization).toMatchObject({
      target: 'Organization',
      type: 'many-to-one',
      joinColumn: true,
      nullable: true,
    });

    expect(relations).toHaveProperty('volunteer');
    expect(relations.volunteer).toMatchObject({
      target: 'Volunteer',
      type: 'one-to-one',
      inverseSide: 'user',
    });

    expect(relations).toHaveProperty('coordinator');
    expect(relations.coordinator).toMatchObject({
      target: 'Coordinator',
      type: 'one-to-one',
      inverseSide: 'user',
    });
  });
});