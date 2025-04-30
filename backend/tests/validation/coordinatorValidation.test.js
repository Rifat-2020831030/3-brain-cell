const {
    createDisasterSchema,
    updateDisasterSchema,
    approveAnOrganizationSchema,
    assignDisasterToTeamSchema,
    updateTeamSchema,
    emergencyNotificationSchema
  } = require('../../src/validation/coordinatorValidation');
  
  describe('Coordinator Validation Schemas', () => {
    describe('createDisasterSchema', () => {
      it('should validate a valid disaster creation payload', () => {
        const validPayload = {
          title: 'Flood in Dhaka',
          type: 'Flood',
          description: 'Severe flooding in Dhaka city due to heavy rainfall.',
          location: 'Dhaka, Bangladesh',
          coordinates: '23.8103, 90.4125',
          startDate: '2023-10-01'
        };
  
        const { error } = createDisasterSchema.validate(validPayload);
        expect(error).toBeUndefined();
      });
  
      it('should fail if required fields are missing', () => {
        const invalidPayload = {
          type: 'Flood',
          description: 'Severe flooding in Dhaka city due to heavy rainfall.'
        };
  
        const { error } = createDisasterSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"title" is required');
      });
  
      it('should fail if type is invalid', () => {
        const invalidPayload = {
          title: 'Flood in Dhaka',
          type: 'InvalidType',
          description: 'Severe flooding in Dhaka city due to heavy rainfall.',
          location: 'Dhaka, Bangladesh',
          coordinates: '23.8103, 90.4125',
          startDate: '2023-10-01'
        };
  
        const { error } = createDisasterSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"type" must be one of [Earthquake, Flood, Landslide, Hurricane, Fire, Tornado, Tsunami, Drought, Pandemic, Industrial, Other]');
      });
    });
  
    describe('updateDisasterSchema', () => {
      it('should validate a valid disaster update payload', () => {
        const validPayload = {
          title: 'Updated Flood in Dhaka',
          description: 'Updated description of the disaster.',
          status: 'Open',
          coordinates: '23.8103, 90.4125',
          area: ['Dhaka', 'Chittagong'],
          endDate: '2023-12-01'
        };
  
        const { error } = updateDisasterSchema.validate(validPayload);
        expect(error).toBeUndefined();
      });
  
      it('should fail if coordinates format is invalid', () => {
        const invalidPayload = {
          coordinates: 'invalid-coordinates'
        };
  
        const { error } = updateDisasterSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"coordinates" with value "invalid-coordinates" fails to match the required pattern');
      });
    });
  
    describe('approveAnOrganizationSchema', () => {
      it('should validate a valid approval payload', () => {
        const validPayload = {
          status: 'approved'
        };
  
        const { error } = approveAnOrganizationSchema.validate(validPayload);
        expect(error).toBeUndefined();
      });
  
      it('should fail if status is invalid', () => {
        const invalidPayload = {
          status: 'invalidStatus'
        };
  
        const { error } = approveAnOrganizationSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"status" must be one of [approved, rejected]');
      });
    });
  
    describe('assignDisasterToTeamSchema', () => {
      it('should validate a valid team assignment payload', () => {
        const validPayload = {
          teamId: 1,
          disasterId: 2,
          location: 'Dhaka, Bangladesh',
          responsibility: 'Rescue operations'
        };
  
        const { error } = assignDisasterToTeamSchema.validate(validPayload);
        expect(error).toBeUndefined();
      });
  
      it('should fail if teamId is missing', () => {
        const invalidPayload = {
          disasterId: 2,
          location: 'Dhaka, Bangladesh',
          responsibility: 'Rescue operations'
        };
  
        const { error } = assignDisasterToTeamSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"teamId" is required');
      });
    });
  
    describe('updateTeamSchema', () => {
      it('should validate a valid team update payload', () => {
        const validPayload = {
          responsibility: 'Updated responsibility',
          location: 'Updated location',
          assignmentStatus: 'assigned'
        };
  
        const { error } = updateTeamSchema.validate(validPayload);
        expect(error).toBeUndefined();
      });
  
      it('should fail if assignmentStatus is invalid', () => {
        const invalidPayload = {
          assignmentStatus: 'invalidStatus'
        };
  
        const { error } = updateTeamSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"assignmentStatus" must be one of [assigned, unassigned]');
      });
    });
  
    describe('emergencyNotificationSchema', () => {
      it('should validate a valid emergency notification payload', () => {
        const validPayload = {
          subject: 'Emergency Alert',
          message: 'This is an emergency notification.'
        };
  
        const { error } = emergencyNotificationSchema.validate(validPayload);
        expect(error).toBeUndefined();
      });
  
      it('should fail if subject is missing', () => {
        const invalidPayload = {
          message: 'This is an emergency notification.'
        };
  
        const { error } = emergencyNotificationSchema.validate(invalidPayload);
        expect(error).toBeDefined();
        expect(error.details[0].message).toContain('"subject" is required');
      });
    });
  });