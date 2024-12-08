import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

async function verifyCallBack(accessToken, refreshToken, profile, done) {
  try {
    const { id: googleId, displayName, emails, photos } = profile;
    const email = emails[0]?.value;
    const profilePicture = photos[0]?.value;
    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
        googleId,
        displayName,
        email,
        profilePicture,
      });
      console.log("New user created in database ===>", user);
    } else {
      console.log("Existing user found in database ----->", user);
    }
    done(null, user);
  } catch (error) {
    console.error("Error verifying Google user -->", error);
    done(error, null);
  }
}

// Initialize Passport strategy
passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    verifyCallBack
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user._id));

// Deserialize user: Fetch the user by ID when needed
passport.deserializeUser(async (id, done) => {
  console.log("this is the deserialized is ---->", id);
  try {
    const user = await User.findById(id); // Ensure this matches your database field for `_id`
    if (!user) {
      return done(new Error("User not found"), null);
    }
    return done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
