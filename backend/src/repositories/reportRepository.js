const { AppDataSource } = require('../config/database');
const DailyReport = require('../models/DailyReport');

class ReportRepository {
  static async getDisasterStats(disasterId) {
    const reportRepository = AppDataSource.getRepository(DailyReport);
    
    // Get all reports for this disaster
    const reports = await reportRepository.find({
      where: { disaster: { disaster_id: disasterId } },
      relations: ['organization']
    });

    if (!reports || reports.length === 0) {
      return {
        totalReports: 0,
        totalVolunteers: 0,
        organizations: [],
        reliefDistribution: {
          totalItems: 0,
          details: {
            waterFiltrationTablets: 0,
            rice: 0,
            flattenedRice: 0,
            puffedRice: 0,
            potato: 0,
            onion: 0,
            sugar: 0,
            oil: 0,
            salt: 0,
            candles: 0
          }
        },
        rescueShelter: {
          totalRescued: 0,
          men: 0,
          women: 0,
          children: 0
        },
        medicalAid: {
          saline: 0,
          paracetamol: 0,
          bandages: 0,
          sanitaryPads: 0
        },
        dailyBreakdown: []
      };
    }

 
    let totalVolunteers = 0;
    let totalItems = 0;
    let totalMedicalAid = 0;
    
    // Relief distribution items
    let waterFiltrationTablets = 0;
    let rice = 0;
    let flattenedRice = 0;
    let puffedRice = 0;
    let potato = 0;
    let onion = 0;
    let sugar = 0;
    let oil = 0;
    let salt = 0;
    let candles = 0;
    
    // Rescue/shelter data
    let rescuedMen = 0;
    let rescuedWomen = 0;
    let rescuedChildren = 0;
    
    // Medical aid data
    let saline = 0;
    let paracetamol = 0;
    let bandages = 0;
    let sanitaryPads = 0;
    
    // Track organizations that contributed
    const organizations = new Set();
    
  
    const dailyData = {};
    
   
    reports.forEach(report => {
      if (report.organization) {
        organizations.add(report.organization.organization_id);
      }
      
    
      totalVolunteers += report.volunteersCount || 0;
      
      // Relief items
      waterFiltrationTablets += report.waterFiltrationTablets || 0;
      rice += report.rice || 0;
      flattenedRice += report.flattenedRice || 0;
      puffedRice += report.puffedRice || 0;
      potato += report.potato || 0;
      onion += report.onion || 0;
      sugar += report.sugar || 0;
      oil += report.oil || 0;
      salt += report.salt || 0;
      candles += report.candles || 0;
      
      // Rescue data
      rescuedMen += report.rescuedMen || 0;
      rescuedWomen += report.rescuedWomen || 0;
      rescuedChildren += report.rescuedChildren || 0;
      
      // Medical aid
      saline += report.saline || 0;
      paracetamol += report.paracetamol || 0;
      bandages += report.bandages || 0;
      sanitaryPads += report.sanitaryPads || 0;
      
      // Calculate total items
      const itemTotalForThisReport = 
      (report.waterFiltrationTablets || 0) +
      (report.rice || 0) +
      (report.flattenedRice || 0) +
      (report.puffedRice || 0) +
      (report.potato || 0) +
      (report.onion || 0) +
      (report.sugar || 0) +
      (report.oil || 0) +
      (report.salt || 0) +
      (report.candles || 0);

      totalItems += itemTotalForThisReport;

      const medicalForThisReport = 
      (report.saline || 0) +
      (report.paracetamol || 0) +
      (report.bandages || 0) +
      (report.sanitaryPads || 0);

      totalMedicalAid += medicalForThisReport;

      
      // Add to daily breakdown
      const dateStr = new Date(report.date).toISOString().split('T')[0];

      if (!dailyData[dateStr]) {
        dailyData[dateStr] = {
          date: dateStr,
          volunteersCount: 0,
          itemsDistributed: 0,
          rescuedPeople: 0,
          medicalAidProvided: 0
        };
      }
      
      dailyData[dateStr].volunteersCount += report.volunteersCount || 0;
      dailyData[dateStr].itemsDistributed += report.itemsDistributed || 0;
      dailyData[dateStr].rescuedPeople += 
        (report.rescuedMen || 0) + 
        (report.rescuedWomen || 0) + 
        (report.rescuedChildren || 0);
      dailyData[dateStr].medicalAidProvided += 
        (report.saline || 0) + 
        (report.paracetamol || 0) + 
        (report.bandages || 0) + 
        (report.sanitaryPads || 0);
    });
    
    // Convert daily data to array and sort by date
    const dailyBreakdown = Object.values(dailyData).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    // Return comprehensive statistics
    return {
      totalReports: reports.length,
      totalVolunteers,
      organizations: Array.from(organizations).length,
      reliefDistribution: {
        totalItems,
        details: {
          waterFiltrationTablets,
          rice,
          flattenedRice,
          puffedRice,
          potato,
          onion,
          sugar,
          oil,
          salt,
          candles
        }
      },
      rescueShelter: {
        totalRescued: rescuedMen + rescuedWomen + rescuedChildren,
        men: rescuedMen,
        women: rescuedWomen,
        children: rescuedChildren
      },
      medicalAid: {
        saline,
        paracetamol,
        bandages,
        sanitaryPads,
        totalMedicalAid
      },
      dailyBreakdown
    };
  }
}

module.exports = ReportRepository;