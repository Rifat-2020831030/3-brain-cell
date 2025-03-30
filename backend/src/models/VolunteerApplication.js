const { EntitySchema } = require('typeorm');

const VolunteerApplication = new EntitySchema({
  name: "VolunteerApplication",
  tableName: "volunteer_applications",
  columns: {
    application_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    status: {
      type: "enum",
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    volunteer: {
      target: "Volunteer",
      type: "many-to-one",
      joinColumn: true,
      nullable: false,
    },
    organization: {
      target: "Organization",
      type: "many-to-one",
      joinColumn: true,
      nullable: false,
    },
  },
});

module.exports = VolunteerApplication;
