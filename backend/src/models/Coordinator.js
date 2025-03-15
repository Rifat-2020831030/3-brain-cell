const { EntitySchema } = require('typeorm');

const Coordinator = new EntitySchema({
  name: "Coordinator",
  tableName: "coordinator",
  columns: {
    coordinator_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    department: {
      type: "varchar",
      nullable: true,
    },
    region: {
      type: "varchar",
      nullable: true,
    },
    officialContactNumber: {
      type: "varchar",
      nullable: true,
    },
    roleTitle: {
      type: "varchar",
      nullable: true,
    },
    experience: {
      type: "int",
      nullable: true,
    },
    certifications: {
      type: "text",
      nullable: true,
    },
    bio: {
      type: "text",
      nullable: true,
    },
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-one",
      joinColumn: true,
      inverseSide: "coordinator"
    },
    disasters: {
      target: "Disaster",
      type: "one-to-many",
      inverseSide: "coordinator",
      cascade: true,
    },
  },
});

module.exports = Coordinator;
