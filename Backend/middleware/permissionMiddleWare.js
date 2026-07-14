// Permission middleware for role- and permission-based access control
// Exported helpers: `permit(allowedRoles)` and `permitPermissions(requiredPermissions)`

// Roles check middleware
const permit = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const userRole = (req.user.Role || req.user.userRole || req.user.role || "").toString().toUpperCase();
      const allowed = allowedRoles.map((r) => r.toString().toUpperCase());

      if (allowed.includes(userRole)) return next();

      return res.status(403).json({ message: "Forbidden: insufficient role" });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

// Permissions check middleware (optional)
const permitPermissions = (requiredPermissions = []) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const userPermissions = req.user.userPermissions || req.user.permissions || [];
      const missing = requiredPermissions.filter((p) => !userPermissions.includes(p));

      if (missing.length === 0) return next();

      return res.status(403).json({ message: "Forbidden: missing permissions", missing });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export { permit, permitPermissions };
