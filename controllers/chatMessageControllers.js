const express = require("express");
const config = require("../config/db");

module.exports = {
    post: async (req, res) => {
        try {
          const {  content } = req.body;
      
          // Ensure that the number of placeholders (?) matches the number of columns in the table
          const sql = "INSERT INTO chat_messages (content) VALUES (?)";
      
          // Pass the values as an array to the query
          config.query(sql, [ content], (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "An error occurred while posting chats." });
            }
      
            res.send("POSTED");
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "An error occurred while posting chats." });
        }
      },
      

      get: async (req, res) => {
        try {
            // Perform a MySQL query to get all benefits
            const sql = "SELECT * FROM recursif.chat_messages;";
           
            config.query(sql, (err, results) => {
                if (err) {
                    console.error("MySQL Error:", err);
                    return res.status(500).json({ message: "Internal server error" });
                }
    
                // Check if users were found
                if (results.length === 0) {
                    return res.status(404).json({ message: "No chats found" });
                }
    
                // Send the list of users in the response
                res.status(200).json({ users: results });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
  getById: async (req, res) => {
    const userId = req.params.id;

    // Perform a MySQL query to get the user by ID
    const sql = "SELECT * FROM users WHERE message_id = ?";
    config.query(sql, [userId], (err, results) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Check if a user with the specified ID was found
      if (results.length === 0) {
        return res.status(404).json({ message: "Message not found" });
      }

      // Send the user details in the response
      const user = results[0];
      res.status(200).json({ user });
    });
  },
//   updateUserById: async (req, res) => {
//     try {
//       const id = req.params.id;
//       const {context, timestamp } = req.body;

//       // Perform a MySQL query to update the user by ID
//       const sql =
//         "UPDATE users SET context=?,  timestamp=?";
//       config.query(
//         sql,
//         [id, name, description, eligibility],
//         (err, results) => {
//           if (err) {
//             console.error("MySQL Error:", err);
//             return res.status(500).json({ message: "Internal server error" });
//           }

//           // Check if a user with the specified ID was found and updated
//           if (results.affectedRows === 0) {
//             return res.status(404).json({ message: "Benefit not found" });
//           }

//           // Send a success message in the response
//           res.status(200).json({ message: "Benefit updated successfully" });
//         }
//       );
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },
};
