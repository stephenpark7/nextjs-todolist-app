import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { ObjectId } from "mongodb";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
  req.db
    .collection("users")
    .findOne({ _id: id })
    .then((user) => done(null, user));
});

// passport.serializeUser(function(user, done) {
//   done(null, user._id.toString());
// });

// passport.deserializeUser(function(req, id, done) {
//   req.db
//     .collection("users")
//     .findOne(ObjectId(id))
//     .then(user => done(null, user));
// });

// passport.use(
//   new LocalStrategy(
//     { usernameField: "email", passReqToCallback: true },
//     async (req, email, password, done) => {
//       console.log(req);
//       console.log(username);
//       console.log(password);
//       console.log(done);
//       const user = await req.db.collection("users").findOne({ email });
//       if (user) done(null, user);
//       else done(null, false);
//     }
// ));

// passport.use(new LocalStrategy(
//   {usernameField: "email", passReqToCallback: true},
//   async function(req, email, password, done) {
//     console.log(req.body);
//     console.log(email);
//     console.log(password);
//     // now you can check req.body.foo
//   }
// ));

  // passport.use(new LocalStrategy(
  //   { usernameField: "email", passReqToCallback: true },
  //   async (req, email, password, done) => {
  //     const user = await req.db.collection("users").findOne({ email });
  //     if (user && (await bcrypt.compare(password, user.password))) done(null, user);
  //     else done(null, false)
  //   },
  // ),
  // );

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      const user = await req.db.collection("users").findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) done(null, user);
      else done(null, false, { message: "Email or password is incorrect" });
    },
  ),
);
  
export default passport;