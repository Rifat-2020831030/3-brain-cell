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
    assignmentStatus: {
      type: "enum",
      enum: ["assigned", "unassigned"],
      default: "unassigned"
    }
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
      nullable: true,  
      onDelete: "CASCADE",
    },
    members: {
      target: "Volunteer",
      type: "many-to-many",
      joinTable: true,
    },
  },
}
);

module.exports = Team;
