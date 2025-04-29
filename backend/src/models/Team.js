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
    teamLeader: {
      type: "int",
      nullable: true
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
    assignedAt: {
      type: "timestamp",
      nullable: true, 
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
