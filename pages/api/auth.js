import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";
import passport from "../../lib/passport";
import { extractUser } from "../../lib/api-helpers";

// MIDDLEWARE
const handler = nextConnect();
handler.use(middleware);

// AUTHENTICATE LOGIN
handler.post(passport.authenticate("local"), (req, res) => {
  res.json({ user: extractUser(req) });
});

// LOGOUT
handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;