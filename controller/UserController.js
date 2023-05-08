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
        return res.status(200).json({
          result: "success",
          msg: "Registration successfully completed.",
        });
      });
    }
  });
  //   console.log(name);
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const selUser = "SELECT * FROM users WHERE `email`=?";

    db_conn.query(selUser, [email], async (err, result) => {
      if (err) throw err;
      // return console.log(result.length)
      if (result.length > 0) {
        const match = await bcrypt.compare(password, result[0].password);
        if (!match)
          return res
            .status(403)
            .json({ result: "failed", msg: "Wrong Password" });
        const userData = result[0];
        const userId = result[0].id;
        const username = result[0].username;
        const email = result[0].email;
        const accessToken = jwt.sign(
          { userId, username, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );
        // const refreshToken = jwt.sign(
        //   { userId, username, email },
        //   process.env.REFRESH_TOKEN_SECRET,
        //   {
        //     expiresIn: "1d",
        //   }
        // );

        const response = {
          result: "success",
          access_token: accessToken,
          user_data: userData,
        };
        res.status(200).json(response);
        // const updateToken = "UPDATE `users` SET `refresh_token`=? WHERE `id`=?";
        // db_conn.query(updateToken, [refreshToken, userId], (err, result) => {
        //   if (err) throw err;
        // });
      } else {
        return res
          .status(403)
          .json({ result: "failed", msg: "Email not registered." });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ result: "failed", msg: "Internal server error." });
  }
};

export const UserList = (req, res) => {
  try {
    const selUserList =
      "SELECT id, name, email,status FROM users WHERE `status`=?";
    db_conn.query(selUserList, [1], (err, result) => {
      if (err) throw err;
      return res.status(200).json({ result: result, msg: "user list." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
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
