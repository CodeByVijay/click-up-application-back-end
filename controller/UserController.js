import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db_conn from "../connection.js";

export const Register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailCheck = "SELECT `email` FROM users WHERE `email`= ?";
  db_conn.query(emailCheck, [email], async (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res
        .status(201)
        .json({ result: "failed", msg: "Email already exist." });
    } else {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const insert = "INSERT INTO `users` (name,email,password) VALUES(?,?,?)";
      db_conn.query(insert, [name, email, hashPassword], (err, result) => {
        if (err) throw err;
        return res
          .status(200)
          .json({
            result: "success",
            msg: "Registration successfully completed.",
          });
      });
    }
  });
  //   console.log(name);
};
// export const Test = (req, res) => {
//   const user = "test";
//   const userId = "1";
//   const accessToken = jwt.sign(
//     { userId, user },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: "15s",
//     }
//   );
//   console.log(accessToken);
// };
