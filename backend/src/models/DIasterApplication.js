const { EntitySchema } = require('typeorm');

const DisasterApplication = new EntitySchema({
  name: "DisasterApplication",
  tableName: "disaster_applications",
  columns: {
    application_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    status: {
      type: "enum",
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updatedAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP"
    }
  },
  relations: {
    organization: {
      target: "Organization",
      type: "many-to-one",
      joinColumn: true,
      eager: true
    },
    disaster: {
      target: "Disaster",
      type: "many-to-one",
      joinColumn: true,
      eager: true
    }
  },
});

module.exports = DisasterApplication;