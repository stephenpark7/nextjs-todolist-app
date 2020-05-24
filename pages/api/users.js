import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import middleware from "../../middlewares/middleware";
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware);

// POST /api/users
handler.post(async (req, res) => {

  const { name, password } = req.body;
  const email = normalizeEmail(req.body.email);
  
  // check email address
  if (!isEmail(email)) {
    res.status(400).send("The email you entered is invalid.");
    return;
  }

  // check password & username
  if (!password || !name) {
    res.status(400).send("Missing field(s)");
    return;
  }
  
  // check if email exists
  if ((await req.db.collection("users").countDocuments({ email })) > 0) {
    res.status(400).send("The email has already been used.");
    return;
  }
  
  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert username into collection
  const user = await req.db
    .collection("users")
    .insertOne({ email, password: hashedPassword, name });

  req.logIn(user, (err) => {
    if (err) throw err;
    res.status(201).json({
      user: extractUser(req),
    });
  });

  // req.logIn(user, err => {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //     return;
  //   }
  //   res.status(201).json({
  //     user: extractUser(req)
  //   });
  // });

  // send message indicating success
  // res.status(201).send({ message: "success" });
});

export default handler;
