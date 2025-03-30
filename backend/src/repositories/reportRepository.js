const { AppDataSource } = require('../config/database');
const DailyReport = require('../models/DailyReport');

class ReportRepository {
  
  static async getDisasterStats(disasterId) {
    const reportRepository = AppDataSource.getRepository(DailyReport);
    
    // Query for total volunteers and items distributed
    const [stats] = await reportRepository.query(
      `SELECT 
        COALESCE(SUM("volunteersCount"), 0) AS "totalVolunteers",
        COALESCE(SUM("itemsDistributed"), 0) AS "totalItems"
      FROM daily_reports
      WHERE "disasterDisasterId" = $1`, [disasterId]
    );

    // Query for total number of organizations involved
    const [orgStats] = await reportRepository.query(
      `SELECT COUNT(DISTINCT o.organization_id) AS "orgCount"
      FROM organizations o
      JOIN daily_reports dr ON dr."organizationOrganizationId" = o.organization_id
      WHERE dr."disasterDisasterId" = $1`, [disasterId]
    );

    // Query for total number of teams involved
    const [teamStats] = await reportRepository.query(
      `SELECT COUNT(DISTINCT t.team_id) AS "teamCount"
      FROM teams t
      WHERE t."disasterDisasterId" = $1`, [disasterId]
    );

    // Query for all organizations associated with the disaster
    const [organizations] = await reportRepository.query(
      `SELECT DISTINCT o.organization_id, o.organization_name, o.mission
      FROM organizations o
      JOIN daily_reports dr ON dr."organizationOrganizationId" = o.organization_id
      WHERE dr."disasterDisasterId" = $1`, [disasterId]
    );

    // Query for all teams associated with the disaster
    const [teams] = await reportRepository.query(
      `SELECT DISTINCT t.team_id, t.name, t.responsibility
      FROM teams t
      WHERE t."disasterDisasterId" = $1`, [disasterId]
    );

    return {
      totalVolunteers: parseInt(stats.totalVolunteers || 0, 10),
      totalItems: parseInt(stats.totalItems || 0, 10),
      totalOrganizations: parseInt(orgStats.orgCount || 0, 10),
      totalTeams: parseInt(teamStats.teamCount || 0, 10),
      organizations,
      teams,
    };
  }
}

module.exports = ReportRepository;
