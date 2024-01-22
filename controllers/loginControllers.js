const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require('mysql')
const config = require ("../config/db")






module.exports = {
    login: async (req, res) => {
        try {
          const name = req.body.name; // Adjust this based on your form field
    
          // Find user by unique username using a MySQL query
          config.query('SELECT * FROM users WHERE name = ?', [name], async (err, results) => {
            if (err) {
              console.error("MySQL Error:", err);
              return res.status(500).json({ message: "Internal server error" });
            }
    
            // If no user is found, throw an error
            const user = results[0];
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
    
          
    
            // Determine the user role (Assuming you have a role field in your user table)
            let role = "";
            if (user.role == "employee") {
              role = "employee";
            } else if (user.role === "HR") {
              role = "HR";
            }
    
            res.status(200).json({ message: "Login successful", role });
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      },

  signUp: async (req, res) => {

    try {
      const {
        id,
        name,
        email,
        department,
        role,
      } = req.body;

     

      config.query('insert into Users values(?,?,?,?,?)',[id,name,role,department,email])

      res.send("POSTED");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while signing up." });
    }
  },

  get: async (req, res) => {
    try {
        // Perform a MySQL query to get all users
        const sql = "SELECT * FROM users";
        config.query(sql, (err, results) => {
            if (err) {
                console.error("MySQL Error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            // Check if users were found
            if (results.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }

            // Send the list of users in the response
            res.status(200).json({ users: results });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},
   getById : async(req,res)=>{
    const userId = req.params.id;

    // Perform a MySQL query to get the user by ID
    const sql = "SELECT * FROM users WHERE idusers = ?";
    config.query(sql, [userId], (err, results) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
  
      // Check if a user with the specified ID was found
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Send the user details in the response
      const user = results[0];
      res.status(200).json({ user });
    });
  },
  updateUserById: async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, department, role } = req.body;

        // Perform a MySQL query to update the user by ID
        const sql = "UPDATE users SET name=?, email=?, department=?, role=? WHERE idusers=?";
        config.query(sql, [name, email, department, role, userId], (err, results) => {
            if (err) {
                console.error("MySQL Error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            // Check if a user with the specified ID was found and updated
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            // Send a success message in the response
            res.status(200).json({ message: "User updated successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
};
