export const checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Please log in to continue.",
    });
  }

  next();
};
