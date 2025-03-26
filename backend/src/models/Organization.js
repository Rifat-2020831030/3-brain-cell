const { EntitySchema } = require('typeorm');

const Organization = new EntitySchema({
  name: "Organization",
  tableName: "organizations",
  columns: {
    organization_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    organization_name: {
      type: "varchar",
      nullable: false, 
    },
    type: {
      type: "enum",
      enum: ["Non-profit", "Government", "Private"],
      default: "Non-profit", 
    },
    sector: {
      type: "enum",
      enum: ["Health", "Education", "NGO"],
      default: "NGO",
    },
    documentLink: {
      type: "varchar",
    },
    regNo: {
      type: "varchar",
    },
    establishedDate: {
      type: "date",
    },
    mission: {
      type: "text",
    },
    secondaryContactName: {
      type: "varchar",
    },
    secondaryContactTitle: {
      type: "varchar",
    },
    secondaryContactMail: {
      type: "varchar",
    },
    location: {
      type: "varchar",
    },
    website: {
      type: "varchar",
    },
    socialMediaLink: {
      type: "varchar",
    },
    parentOrg: {
      type: "varchar",
    },
    approval_status: {
      type: "boolean",
      default: false,
    },
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-many",
      inverseSide: "organization",
    },
    members: {
      target: "Volunteer",
      type: "one-to-many",
      inverseSide: "organization",
    },
    teams: {
      target: "Team",
      type: "one-to-many",
      inverseSide: "organization",
    },
  },
});

module.exports = Organization;
