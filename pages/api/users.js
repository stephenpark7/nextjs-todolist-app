import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import middleware from "../../middlewares/database";

const handler = nextConnect();

handler.use(middleware); // see how we"re reusing our middleware

// POST /api/users
handler.post(async (req, res) => {
  const { username, password } = req.body;
  const email = normalizeEmail(req.body.email); // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same
  // check email address
  if (!isEmail(email)) {
    res.status(400).send("The email you entered is invalid.");
    return;
  }
  // check password & username
  if (!password || !username) {
    res.status(400).send("Missing field(s)");
    return;
  }
  // check if username exists
  if ((await req.db.collection("users").countDocuments({ username })) > 0) {
    res.status(400).send("The username has already been used.");
    return;
  }
  // check if email exists
  if ((await req.db.collection("users").countDocuments({ email })) > 0) {
    res.status(400).send("The email has already been used.");
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await req.db
    .collection("users")
    .insertOne({ email, password: hashedPassword, username });

  res.status(201).json(user);

});

export default handler;
