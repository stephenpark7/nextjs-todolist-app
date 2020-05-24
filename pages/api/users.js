import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import middleware from "../../middlewares/database";

const handler = nextConnect();
handler.use(middleware);

// POST /api/users
handler.post(async (req, res) => {

  const { username, password } = req.body;
  const email = normalizeEmail(req.body.email);
  
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
  
  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert username into collection
  await req.db.collection("users").insertOne({ email, password: hashedPassword, username });

  // send message indicating success
  res.status(201).send({ message: "success" });
});

export default handler;
