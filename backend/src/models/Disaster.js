const { EntitySchema } = require('typeorm');

const Disaster = new EntitySchema({
  name: "Disaster",
  tableName: "disasters",
  columns: {
    disaster_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      nullable: false,
    },
    type: { 
      type: "enum", 
      enum: ["Earthquake", "Flood", "Wildfire", "Landslide",  "Hurricane", "Fire", "Tornado", "Tsunami", "Drought", "Pandemic", "Industrial", "Other"] 
    },
    description: {
      type: "text",
      nullable: false,
    },
    status: {
      type: "enum",
      enum: ["Open", "Closed"],
      default: "Open", 
    },
    location: {
      type: "varchar",
      nullable: true,
    },
    coordinates: {
      type: "varchar",
      nullable: true,
    },
    area: {
      type: "simple-json", 
      nullable: true,
    },
    startDate: {
      type: "timestamp",
      nullable: true,
    },
    endDate: {
      type: "timestamp",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    coordinator: {
      target: "Coordinator",
      type: "many-to-one",
      joinColumn: true,
      nullable: false,
    },
    teams: {
      target: "Team",
      type: "one-to-many",
      inverseSide: "disaster",
    },
  },
});

module.exports = Disaster;
