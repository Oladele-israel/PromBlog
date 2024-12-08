export const checkLoggedIn = (req, res, next) => {
  console.log("Middleware: Checking authentication...");
  console.log("Session data: ", req.session);
  console.log("User data: ", req.user);

  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Please log in to continue.",
    });
  }

  next();
};
