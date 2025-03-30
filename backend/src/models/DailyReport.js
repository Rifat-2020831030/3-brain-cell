const { EntitySchema } = require('typeorm');

const DailyReport = new EntitySchema({
  name: "DailyReport",
  tableName: "daily_reports",
  columns: {
    report_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    date: { 
        type: "date", 
        default: () => "CURRENT_DATE" 
    },
    description: { 
        type: "text", 
        nullable: false 
    },
    volunteersCount: { 
        type: "int", 
        nullable: true 
    },
    itemsDistributed: { 
        type: "int", 
        nullable: true 
    },
    createdAt: { 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP" 
    },
  },
  relations: {
    organization: {
      target: "Organization",
      type: "many-to-one",
      joinColumn: true,
      nullable: false,
    },
    disaster: {
      target: "Disaster",
      type: "many-to-one",
      joinColumn: true,
      nullable: false,
    },
  },
});

module.exports = DailyReport;
