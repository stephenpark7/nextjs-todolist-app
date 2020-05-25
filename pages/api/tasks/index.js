import nextConnect from "next-connect";
import middleware from "../../../middlewares/middleware";
// import passport from "../../lib/passport";
// import { extractUser } from "../../lib/api-helpers";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  if (!req.user) {
    return res.status(401).send("unauthenticated");
  }

  const result = await req.db
    .collection("users")
    .find( { _id: { $eq: req.user._id } })
    .toArray();

  res.status(200).json(result[0].tasks);
});

handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).send("unauthenticated");
  }

  await req.db
    .collection("users")
    .updateOne({ _id: req.user._id},
            { $push: {
              tasks: req.body
            }});

  res.status(200).json({
    message: "success"
  });
});

export default handler;