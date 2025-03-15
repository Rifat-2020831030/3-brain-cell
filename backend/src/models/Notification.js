const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Notification',
  tableName: 'notifications',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    message: {
      type: 'text',
    },
    isRead: {
      type: 'boolean',
      default: false,
    },
    createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: true,
      eager: true,
    },
  },
});
