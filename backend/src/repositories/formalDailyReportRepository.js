const formatDailyReport = (report, itemFields, itemsDistributed) => {
    const formattedReport = {
      report_id: report.report_id,
      date: report.date,
      createdAt: report.createdAt
    };
  
    // Add description if exists
    if (report.description) {
      formattedReport.description = report.description;
    }
  
    // Add volunteers count if exists
    if (report.volunteersCount) {
      formattedReport.volunteersCount = report.volunteersCount;
    }
  
    // Process relief items
    const reliefItems = {};
    itemFields.forEach(field => {
      if (report[field]) {
        reliefItems[field] = report[field];
      }
    });
  
    if (Object.keys(reliefItems).length > 0) {
      formattedReport.reliefDistribution = {
        ...reliefItems,
        totalItems: itemsDistributed
      };
    }
  
    // Process rescue data
    const rescueData = {};
    if (report.rescuedMen) rescueData.men = report.rescuedMen;
    if (report.rescuedWomen) rescueData.women = report.rescuedWomen;
    if (report.rescuedChildren) rescueData.children = report.rescuedChildren;
  
    if (Object.keys(rescueData).length > 0) {
      const totalRescued = (report.rescuedMen || 0) + 
                          (report.rescuedWomen || 0) + 
                          (report.rescuedChildren || 0);
      formattedReport.rescueShelter = {
        ...rescueData,
        totalRescued
      };
    }
  
    // Process medical items
    const medicalItems = {};
    ['saline', 'paracetamol', 'bandages', 'sanitaryPads'].forEach(field => {
      if (report[field]) {
        medicalItems[field] = report[field];
      }
    });
  
    if (Object.keys(medicalItems).length > 0) {
      formattedReport.medicalAid = medicalItems;
    }
  
    return formattedReport;
  };


  module.exports = { formatDailyReport }