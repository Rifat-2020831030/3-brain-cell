const { EntitySchema } = require('typeorm');

const Team = new EntitySchema({
  name: "Team",
  tableName: "teams",
  columns: {
    team_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    responsibility: {
      type: "varchar",
      nullable: true,
    },
    location: {
      type: "varchar",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
   
    organization: {
      target: "Organization",
      type: "many-to-one",
      joinColumn: true,
    },

    disaster: {
      target: "Disaster",
      type: "many-to-one",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});

module.exports = Team;
