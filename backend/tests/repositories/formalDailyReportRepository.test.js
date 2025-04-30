const { formatDailyReport } = require('../../src/repositories/formalDailyReportRepository');

describe('formatDailyReport', () => {
  it('should format a report with all fields present', () => {
    const report = {
      report_id: 1,
      date: '2023-04-01',
      createdAt: '2023-04-01T12:00:00Z',
      description: 'Daily report description',
      volunteersCount: 10,
      rice: 50,
      rescuedMen: 5,
      rescuedWomen: 3,
      rescuedChildren: 2,
      saline: 20,
      paracetamol: 15,
      bandages: 10,
      sanitaryPads: 5,
    };
    const itemFields = ['rice'];
    const itemsDistributed = 50;

    const result = formatDailyReport(report, itemFields, itemsDistributed);

    expect(result).toEqual({
      report_id: 1,
      date: '2023-04-01',
      createdAt: '2023-04-01T12:00:00Z',
      description: 'Daily report description',
      volunteersCount: 10,
      reliefDistribution: {
        rice: 50,
        totalItems: 50,
      },
      rescueShelter: {
        men: 5,
        women: 3,
        children: 2,
        totalRescued: 10,
      },
      medicalAid: {
        saline: 20,
        paracetamol: 15,
        bandages: 10,
        sanitaryPads: 5,
      },
    });
  });

  it('should format a report with missing optional fields', () => {
    const report = {
      report_id: 2,
      date: '2023-04-02',
      createdAt: '2023-04-02T12:00:00Z',
    };
    const itemFields = ['rice', 'oil'];
    const itemsDistributed = 0;

    const result = formatDailyReport(report, itemFields, itemsDistributed);

    expect(result).toEqual({
      report_id: 2,
      date: '2023-04-02',
      createdAt: '2023-04-02T12:00:00Z',
    });
  });

  it('should include only the provided relief items', () => {
    const report = {
      report_id: 3,
      date: '2023-04-03',
      createdAt: '2023-04-03T12:00:00Z',
      rice: 30,
      oil: 20,
    };
    const itemFields = ['rice', 'oil'];
    const itemsDistributed = 50;

    const result = formatDailyReport(report, itemFields, itemsDistributed);

    expect(result).toEqual({
      report_id: 3,
      date: '2023-04-03',
      createdAt: '2023-04-03T12:00:00Z',
      reliefDistribution: {
        rice: 30,
        oil: 20,
        totalItems: 50,
      },
    });
  });

  it('should include only the provided rescue data', () => {
    const report = {
      report_id: 4,
      date: '2023-04-04',
      createdAt: '2023-04-04T12:00:00Z',
      rescuedMen: 3,
      rescuedChildren: 2,
    };
    const itemFields = [];
    const itemsDistributed = 0;

    const result = formatDailyReport(report, itemFields, itemsDistributed);

    expect(result).toEqual({
      report_id: 4,
      date: '2023-04-04',
      createdAt: '2023-04-04T12:00:00Z',
      rescueShelter: {
        men: 3,
        children: 2,
        totalRescued: 5,
      },
    });
  });

  it('should include only the provided medical items', () => {
    const report = {
      report_id: 5,
      date: '2023-04-05',
      createdAt: '2023-04-05T12:00:00Z',
      saline: 10,
      paracetamol: 5,
    };
    const itemFields = [];
    const itemsDistributed = 0;

    const result = formatDailyReport(report, itemFields, itemsDistributed);

    expect(result).toEqual({
      report_id: 5,
      date: '2023-04-05',
      createdAt: '2023-04-05T12:00:00Z',
      medicalAid: {
        saline: 10,
        paracetamol: 5,
      },
    });
  });
});