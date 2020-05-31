import nextConnect from "next-connect";
import middleware from "../../../middlewares/middleware";

// MIDDLEWARE
const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const task = req.query.id;
  console.log(task);
  res.send( { message: "success" } );
});

// DELETE TASKS
handler.delete(async (req, res) => {

  if (!req.user) {
    return res.status(401).send("unauthenticated");
  }
  
  const taskId = req.query.id;

  const result = await req.db
    .collection("tasks")
    .deleteOne( { _id: new req.objectID(taskId) });

  if (result.deletedCount > 0) {
    res.status(201).json({ message: "success" });
  }
});

// TOGGLE TASKS
handler.put(async (req, res) => {

  if (!req.user) {
    return res.status(401).send("unauthenticated");
  }

  const taskId = req.query.id;
  const done = (req.query.done === "true");

  const result = await req.db
  .collection("tasks")
  .updateOne(
    { 
      _id: new req.objectID(taskId)
    },
    {
      $set: { "done" : !done }
    }
  );

  if (result.modifiedCount > 0) {
    res.status(201).json({ message: "success" });
  }

});

export default handler;