const { AppDataSource } = require('../config/database');
const Organization = require('../models/Organization');
const Volunteer = require('../models/Volunteer');
const Disaster = require('../models/Disaster');

const getOrganizationsForVolunteer = async (req, res) => {
  try {
    const volunteerRepository = AppDataSource.getRepository(Volunteer);
    const volunteer = await volunteerRepository.findOne({
      where: { user: { userId: req.user.id } },  
      relations: ['organization'],
    });

    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found.' });
    }

    const organizationRepository = AppDataSource.getRepository(Organization);
    const organizations = await organizationRepository.find({
      where: {
        approval_status: true,  
      },
      relations: ['user'], 
    });

    const availableOrganizations = organizations.filter(org => {
      return !volunteer.organization || org.organization_id !== volunteer.organization.organization_id;
    });

    return res.status(200).json({ organizations: availableOrganizations });
  } catch (error) {
    console.error('Error fetching organizations for volunteer:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getOngoingDisasters = async (req, res) => {
  try {
    const disasterRepository = AppDataSource.getRepository(Disaster);

    const disasters = await disasterRepository.find({
      where: { status: 'OPEN' },  
    });

    if (disasters.length === 0) {
      return res.status(404).json({ message: 'No ongoing disasters found.' });
    }

    return res.status(200).json({
      disasters: disasters.map(disaster => ({
        disaster_id: disaster.disaster_id,
        title: disaster.title,
        description: disaster.description,
        location: disaster.location,
        startDate: disaster.startDate,
        status: disaster.status,
        createdAt: disaster.createdAt,
      }))
    });
  } catch (error) {
    console.error('Error fetching ongoing disasters:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = { getOngoingDisasters, getOrganizationsForVolunteer };
