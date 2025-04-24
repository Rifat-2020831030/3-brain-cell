const getAssociatedDisaster = (organization, disasterId) => {
    if (disasterId) {
      const disaster = organization.disasters.find(
        d => d.disaster_id === parseInt(disasterId, 10) && d.status !== 'Closed'
      );
      if (!disaster) {
        throw new Error("Organization is not associated with the provided disaster ID or the disaster is closed.");
      }
      return disaster;
    }
  
    const activeDisasters = organization.disasters.filter(d => d.status !== 'Closed');
    if (activeDisasters.length === 0) {
      throw new Error("No active disaster found for this organization. Cannot create team without an active disaster.");
    }
  
    return activeDisasters.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  };
  

const fetchAndValidateVolunteers = async (memberIds, organizationId, volunteerRepository) => {
    const volunteers = await Promise.all(
      memberIds.map(async (id) => {
        const volunteer = await volunteerRepository.findOne({
          where: { volunteer_id: id },
          relations: ['user']
        });
  
        if (!volunteer) {
          throw new Error(`Volunteer with ID ${id} not found`);
        }
  
        if (volunteer.organization && volunteer.organization.organization_id !== organizationId) {
          throw new Error(`Volunteer with ID ${id} does not belong to this organization`);
        }
  
        return volunteer;
      })
    );
    return volunteers;
  };
  

module.exports = { getAssociatedDisaster, fetchAndValidateVolunteers};