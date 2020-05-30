import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";

// MIDDLEWARE
const handler = nextConnect();
handler.use(middleware);

// GET TASKS
handler.get(async (req, res) => {

  if (!req.user) {
    return res.status(401).send("unauthenticated");
  }

  const result = await req.db
    .collection("tasks")
    .find( { owner: { $eq: req.user._id } })
    .toArray();

  res.status(200).json(result);
});

// ADD TASKS
handler.post(async (req, res) => {

  if (!req.user) {
    return res.status(401).send("unauthenticated");
  }

  const taskName = req.body.taskName;

  const result = await req.db
    .collection("tasks")
    .insertOne({ 
      owner: req.user._id,
      name: taskName
     });

  if (result.insertedCount > 0) {
    res.status(201).json({ message: "success" });
  }
});

// DELETE TASKS
handler.delete(async (req, res) => {

  if (!req.user) {
    return res.status(401).send("unauthenticated");
  }

  const taskId = req.body.taskId;

  const result = await req.db
    .collection("tasks")
    .deleteOne( { _id: new req.objectID(taskId) });

  if (result.deletedCount > 0) {
    res.status(201).json({ message: "success" });
  }
});

export default handler;