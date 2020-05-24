import nextConnect from "next-connect";
// import isEmail from "validator/lib/isEmail";
// import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import middleware from "../../middlewares/database";

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {

  let db = req.db;
  let username = req.body.username;
  let password = req.body.password;

  try {
    const userData = await getUserData(db, username);
    await verifyUserLogin(password, userData[0].password);
    res.status(201).send({ message: "success" });
  } catch (err) {
    res.status(400).send(err);
  }
  
});

function verifyUserLogin(password, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword)
    .then(result => {
      if (!result) {
        reject("Incorrect password.");
      } else {
        resolve();
      }
    });
  });
}

function getUserData(db, username) {
  return new Promise((resolve, reject) => {
    db.collection("users").find({ username: { $eq: username } }).toArray((err, docs) => {
      if (err) {
        reject(err);
      } else if (docs.length === 0) {
        reject("Username does not exist.");
      } else {
        resolve(docs);
      }
    });
  });
}

export default handler;
