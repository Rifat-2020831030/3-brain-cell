const { EntitySchema } = require('typeorm');
const DailyReport = require('../../src/models/DailyReport');

describe('DailyReport Entity Schema', () => {
  it('should have the correct name and tableName', () => {
    expect(DailyReport.options.name).toBe('DailyReport');
    expect(DailyReport.options.tableName).toBe('daily_reports');
  });

  it('should define the correct columns', () => {
    const columns = DailyReport.options.columns;

    expect(columns).toHaveProperty('report_id');
    expect(columns.report_id).toMatchObject({
      primary: true,
      type: 'int',
      generated: true,
    });

    expect(columns).toHaveProperty('date');
    expect(columns.date).toMatchObject({
      type: 'date',
      default: expect.any(Function),
    });

    expect(columns).toHaveProperty('description');
    expect(columns.description).toMatchObject({
      type: 'text',
      nullable: false,
    });

    const reliefFields = [
      'waterFiltrationTablets', 'rice', 'flattenedRice', 'puffedRice',
      'potato', 'onion', 'sugar', 'oil', 'salt', 'candles',
    ];
    reliefFields.forEach((field) => {
      expect(columns).toHaveProperty(field);
      expect(columns[field]).toMatchObject({
        type: 'int',
        nullable: true,
      });
    });

    const rescueFields = ['rescuedMen', 'rescuedWomen', 'rescuedChildren'];
    rescueFields.forEach((field) => {
      expect(columns).toHaveProperty(field);
      expect(columns[field]).toMatchObject({
        type: 'int',
        nullable: true,
      });
    });

    const medicalFields = ['saline', 'paracetamol', 'bandages', 'sanitaryPads'];
    medicalFields.forEach((field) => {
      expect(columns).toHaveProperty(field);
      expect(columns[field]).toMatchObject({
        type: 'int',
        nullable: true,
      });
    });

    expect(columns).toHaveProperty('volunteersCount');
    expect(columns.volunteersCount).toMatchObject({
      type: 'int',
      nullable: true,
    });

    expect(columns).toHaveProperty('createdAt');
    expect(columns.createdAt).toMatchObject({
      type: 'timestamp',
      default: expect.any(Function),
    });
  });

  it('should define the correct relations', () => {
    const relations = DailyReport.options.relations;

    expect(relations).toHaveProperty('organization');
    expect(relations.organization).toMatchObject({
      target: 'Organization',
      type: 'many-to-one',
      joinColumn: true,
      nullable: false,
    });

    expect(relations).toHaveProperty('disaster');
    expect(relations.disaster).toMatchObject({
      target: 'Disaster',
      type: 'many-to-one',
      joinColumn: true,
      nullable: false,
    });
  });
});