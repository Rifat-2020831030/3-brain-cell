const { EntitySchema } = require('typeorm');
const Notification = require('../../src/models/Notification');

describe('Notification Entity Schema', () => {
  it('should have the correct name and tableName', () => {
    expect(Notification.options.name).toBe('Notification');
    expect(Notification.options.tableName).toBe('notifications');
  });

  it('should define the correct columns', () => {
    const columns = Notification.options.columns;

    expect(columns).toHaveProperty('id');
    expect(columns.id).toMatchObject({
      primary: true,
      type: 'int',
      generated: true,
    });

    expect(columns).toHaveProperty('subject');
    expect(columns.subject).toMatchObject({
      type: 'varchar',
      nullable: true,
    });

    expect(columns).toHaveProperty('message');
    expect(columns.message).toMatchObject({
      type: 'text',
    });

    expect(columns).toHaveProperty('isRead');
    expect(columns.isRead).toMatchObject({
      type: 'boolean',
      default: false,
    });

    expect(columns).toHaveProperty('createdAt');
    expect(columns.createdAt).toMatchObject({
      type: 'timestamp',
      default: expect.any(Function),
    });
  });

  it('should define the correct relations', () => {
    const relations = Notification.options.relations;

    expect(relations).toHaveProperty('user');
    expect(relations.user).toMatchObject({
      target: 'User',
      type: 'many-to-one',
      joinColumn: true,
      eager: true,
    });
  });
});