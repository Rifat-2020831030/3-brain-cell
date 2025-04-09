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
    // Relief distribution data
    waterFiltrationTablets: { type: "int", nullable: true },
    rice: { type: "int", nullable: true }, // in kg
    flattenedRice: { type: "int", nullable: true }, // in kg
    puffedRice: { type: "int", nullable: true }, // in kg
    potato: { type: "int", nullable: true }, // in kg
    onion: { type: "int", nullable: true }, // in kg
    sugar: { type: "int", nullable: true }, // in kg
    oil: { type: "int", nullable: true }, // in liters
    salt: { type: "int", nullable: true }, // in kg
    candles: { type: "int", nullable: true }, // in pieces
    
    // Rescue/shelter data
    rescuedMen: { type: "int", nullable: true },
    rescuedWomen: { type: "int", nullable: true },
    rescuedChildren: { type: "int", nullable: true },
    
    // Medical aid data
    saline: { type: "int", nullable: true }, // in units
    paracetamol: { type: "int", nullable: true }, // in strips
    bandages: { type: "int", nullable: true }, // in packs
    sanitaryPads: { type: "int", nullable: true }, // in packs
    
    volunteersCount: { 
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

