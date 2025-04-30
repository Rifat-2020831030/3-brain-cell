const {
    updateApplicationStatusSchema,
    createTeamSchema,
    submitDailyReportSchema
  } = require('../../src/validation/organizationValidation');
  
  describe('Organization Validation Schemas', () => {
    describe('updateApplicationStatusSchema', () => {
      it('should validate a valid application status payload', () => {
        const validPayload = { status: 'approved' };
  
        const { error } = updateApplicationStatusSchema.validate(validPayload);
        expect(error).toBeUndefined();
      });
  
      it('should fail if status is invalid', () => {
        const invalidPayload = { status: 'invalidStatus' };
  
        const { error } = updateApplicationStatusSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"status" must be one of [approved, rejected]');
      });
  
      it('should fail if status is missing', () => {
        const invalidPayload = {};
  
        const { error } = updateApplicationStatusSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"status" is required');
      });
    });
  
    describe('createTeamSchema', () => {
      it('should validate a valid team creation payload', () => {
        const validPayload = {
          teamName: 'Rescue Team Alpha',
          teamLeader: 1,
          disasterId: 2,
          memberIds: [3, 4, 5]
        };
  
        const { error } = createTeamSchema.validate(validPayload);
        expect(error).toBeUndefined();
      });
  
      it('should fail if teamName is missing', () => {
        const invalidPayload = {
          teamLeader: 1,
          disasterId: 2,
          memberIds: [3, 4, 5]
        };
  
        const { error } = createTeamSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"teamName" is required');
      });
  
      it('should fail if memberIds is empty', () => {
        const invalidPayload = {
          teamName: 'Rescue Team Alpha',
          teamLeader: 1,
          disasterId: 2,
          memberIds: []
        };
  
        const { error } = createTeamSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"memberIds" must contain at least 1 items');
      });
    });
  
    describe('submitDailyReportSchema', () => {
      it('should validate a valid daily report payload', () => {
        const validPayload = {
          description: 'Daily report for rescue operations.',
          volunteersCount: 10,
          waterFiltrationTablets: 50,
          rice: 100,
          rescuedMen: 5,
          rescuedWomen: 3,
          rescuedChildren: 2
        };
  
        const { error } = submitDailyReportSchema.validate(validPayload);
        expect(error).toBeUndefined();
      });
  
      it('should fail if description is missing', () => {
        const invalidPayload = {
          volunteersCount: 10
        };
  
        const { error } = submitDailyReportSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"description" is required');
      });
  
      it('should fail if volunteersCount is negative', () => {
        const invalidPayload = {
          description: 'Daily report for rescue operations.',
          volunteersCount: -5
        };
  
        const { error } = submitDailyReportSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"volunteersCount" must be greater than or equal to 0');
      });
  
      it('should validate optional fields when provided', () => {
        const validPayload = {
          description: 'Daily report for rescue operations.',
          volunteersCount: 10,
          waterFiltrationTablets: 20,
          rice: 50,
          rescuedMen: 5,
          rescuedWomen: 3,
          rescuedChildren: 2,
          sanitaryPads: 15
        };
  
        const { error } = submitDailyReportSchema.validate(validPayload);
        expect(error).toBeUndefined();
      });
    });
  });