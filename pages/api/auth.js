import nextConnect from "next-connect";
import middleware from "../../middlewares/database";
import passport from "../../lib/passport";
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware);

// POST /api/users
handler.post(passport.authenticate("local"), (req, res) => {
  console.log("WHY")
  // return our user object
  res.json({ user: extractUser(req.user) });
});

export default handler;

// handler.post(async (req, res) => {

//   let db = req.db;
//   let username = req.body.username;
//   let password = req.body.password;

//   try {
//     const userData = await getUserData(db, username);
//     await verifyUserLogin(password, userData[0].password);
//     res.status(201).send({ message: "success" });
//   } catch (err) {
//     res.status(400).send(err);
//   }
  
// });

// function verifyUserLogin(password, hashedPassword) {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(password, hashedPassword)
//     .then(result => {
//       if (!result) {
//         reject("Incorrect password.");
//       } else {
//         resolve();
//       }
//     });
//   });
// }

// function getUserData(db, username) {
//   return new Promise((resolve, reject) => {
//     db.collection("users").find({ username: { $eq: username } }).toArray((err, docs) => {
//       if (err) {
//         reject(err);
//       } else if (docs.length === 0) {
//         reject("Username does not exist.");
//       } else {
//         resolve(docs);
//       }
//     });
//   });
// }

