const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../../models/admin");
const { validationResult } = require("express-validator");

const adminAuthController = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          status: errors.array(),
          status_code: 400
        });
      }

      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await Admin.create({ username, email, password: hashedPassword });
      res.status(200).json({ 
        message: "Admin Account successfully created",
        status_code: 200,
        user_id: newAdmin.id
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: "Registration failed",
        status_code: 500
      });
    }
  },

  login: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { email, password } = req.body;
      const [rows] = await Admin.findByEmail(email);

      if (rows.length === 0) {
        return res.status(401).json({ 
          status: "Incorrect username/password provided. Please retry",
          status_code: 401
         });
      }

      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ 
          status: "Incorrect username/password provided. Please retry",
          status_code: 401
         });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.DB_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ 
        status: "Login Successful",
        status_code: 200,
        user_id: user.id,
        access_token: token
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Login failed" });
    }
  },
};

module.exports = adminAuthController;
