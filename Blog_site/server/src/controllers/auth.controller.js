import passport from "../config/passport.config.js";

export const googleAuth = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
});

// Handle OAuth callback and establish session
export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err || !user) {
      console.error("OAuth Callback Error:", err || info);
      return res.redirect("/auth/failure");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login Error:", err);
        return res.redirect("/auth/failure");
      }
      console.log("User logged in successfully:", user);
      res.redirect("http://localhost:5173");
    });
  })(req, res, next);
};

// Get currently logged-in user
export const getUser = (req, res) => {
  const authenticatedUser = req.user;
  console.log("Session data ------------?: ", req.session.id);

  if (!authenticatedUser) {
    return res.status(404).json({
      success: false,
      message: "No authenticated user found.",
    });
  }

  console.log("Authenticated user:", authenticatedUser);

  return res.status(200).json({
    success: true,
    message: "Authenticated user retrieved successfully.",
    user: {
      id: authenticatedUser._id,
      email: authenticatedUser.email,
      name: authenticatedUser.displayName || authenticatedUser.name,
      picture: authenticatedUser.profilePicture,
    },
  });
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }

    // Explicitly destroy the session (optional if not needed)
    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        console.error("Error destroying session:", sessionErr);
        return res.status(500).json({
          success: false,
          message: "Failed to clear session",
        });
      }

      // Clear session cookie if it exists (adjust cookie name if needed)
      res.clearCookie("wtf"); // Replace with your session cookie name
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
};

export const failure = (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed to log in.",
  });
};
