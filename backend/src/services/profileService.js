const { AppDataSource } = require('../config/database');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');
const Organization = require('../models/Organization');
const Coordinator = require('../models/Coordinator');
const { UserDoesNotExistError } = require('../utils/errors');
const { validateProfileData } = require('../validation/profileValidation'); 


const completeUserProfile = async (userId, profileData) => {
  const userRepository = AppDataSource.getRepository(User);
  
  const user = await userRepository.findOne({ where: { userId } });
  if (!user) throw new UserDoesNotExistError();

  if (!user.role) {
    throw new Error('Role not assigned during registration');
  }

  if (user.role !== profileData.role) {
    user.role = profileData.role;
    await userRepository.save(user);
  }

  await validateProfileData(profileData, user.role);

  if (user.role === 'volunteer') {
    const volunteerRepository = AppDataSource.getRepository(Volunteer);
    const volunteer = volunteerRepository.create({
      user: user,
      skills: profileData.skills,
      work_location: profileData.location,
    });
    await volunteerRepository.save(volunteer);
  } else if (user.role === 'organization') {
    const organizationRepository = AppDataSource.getRepository(Organization);
    const organization = organizationRepository.create({
      user: user,
      organization_name: profileData.organization_name,
      type: profileData.type,
      sector: profileData.sector,
      documentLink: profileData.documentLink,
      regNo: profileData.regNo,
      establishedDate: profileData.establishedDate,
      mission: profileData.mission,
      secondaryContactName: profileData.secondaryContactName,
      secondaryContactTitle: profileData.secondaryContactTitle,
      secondaryContactMail: profileData.secondaryContactMail,
      location: profileData.location,
      website: profileData.website,
      socialMediaLink: profileData.socialMediaLink,
      parentOrg: profileData.parentOrg,
      approval_status: profileData.approval_status,
    });
    await organizationRepository.save(organization);
    user.organization = organization;  
    await userRepository.save(user);
  } else if (user.role === 'coordinator') {
    const coordinatorRepository = AppDataSource.getRepository(Coordinator);
    const coordinator = coordinatorRepository.create({
      user: user,
      department: profileData.department,
      region: profileData.region,
      officialContactNumber: profileData.officialContactNumber,
      roleTitle: profileData.roleTitle,
      experience: profileData.experience,
      certifications: profileData.certifications,
      bio: profileData.bio,
    });
    await coordinatorRepository.save(coordinator);
  } else {
    throw new Error('Invalid role selected');
  }

  return user;
};

module.exports = { completeUserProfile };
