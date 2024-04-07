const db = require("../config/database");

const Admin = {
  create: (admin) => {
    return db
      .promise()
      .execute(
        "INSERT INTO admins (username, email, password) VALUES (?, ?, ?)",
        [admin.username, admin.email, admin.password]
      );
  },

  findByEmail: (email) => {
    return db.promise().query("SELECT * FROM admins WHERE email = ?", [email]);
  },
};

module.exports = Admin;
