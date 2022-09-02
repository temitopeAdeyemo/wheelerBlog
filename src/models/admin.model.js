const { createAdmin } = require("../database/queries/admin.query");
const pool = require("../database/pgsql");

class Admin {
  constructor(instanceObject) {
    this.firstName = instanceObject.firstName;
    this.lastName = instanceObject.lastName;
    this.username = instanceObject.username;
    this.hashPassword = instanceObject.hashPassword;
    this.email = instanceObject.email;
    this.age = instanceObject.age;
    this.gender = instanceObject.gender;
  }

  async save() {
    try {
      const admin = await pool.query(createAdmin, [
        this.firstName,
        this.lastName,
        this.username,
        this.hashPassword,
        this.email,
        this.age,
        this.gender,
        "display_picture",
      ]);
      return admin.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Admin;
