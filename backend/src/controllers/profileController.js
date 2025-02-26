const jwt = require("jsonwebtoken");
const { AppDataSource } = require('../config/database');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');
const Organization = require('../models/Organization');
const Coordinator = require('../models/Coordinator');

const completeRegistration = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { role, ...profileData } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) return res.status(404).json({ message: "User not found" });

        user.role = role;
        await userRepository.save(user);


        if (role === "volunteer") {
            const volunteerRepository = AppDataSource.getRepository(Volunteer);
            const volunteer = volunteerRepository.create({
                user: { id: userId },
                skills: profileData.skills,
                work_location: profileData.location,
            });
            await volunteerRepository.save(volunteer);
        } else if (role === "organization") {
            const organizationRepository = AppDataSource.getRepository(Organization);
            const organization = organizationRepository.create({
                user: { id: userId },
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
        } else if (role === "coordinator") {
            const coordinatorRepository = AppDataSource.getRepository(Coordinator);
            const coordinator = coordinatorRepository.create({
                user: { id: userId },
                disasterid: profileData.disasterid || null,
            });
            await coordinatorRepository.save(coordinator);
        } else {
            return res.status(400).json({ message: "Invalid role selected" });
        }

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { completeRegistration };
