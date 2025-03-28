const { EntitySchema } = require('typeorm');

const Volunteer = new EntitySchema({
  name: "Volunteer",
  tableName: "volunteers",
  columns: {
    volunteer_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    skills: { 
      type: "text", 
      array: true 
    },
    work_location: { 
      type: "varchar" 
    },
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-one",
      joinColumn: true,
      inverseSide: "volunteer"
    },
    organization: {
      target: "Organization",
      type: "many-to-one",
      joinColumn: true,
      nullable: true,
    },
    teams: {
      target: "Team",
      type: "many-to-many",
      inverseSide: "members",
      joinTable: true
    },
    volunteerApplications: {
      target: "VolunteerApplication",
      type: "one-to-many", 
      inverseSide: "volunteer", 
    }
  },
});

module.exports = Volunteer;
