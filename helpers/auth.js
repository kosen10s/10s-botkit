module.exports = function(controller) {
  var auth = {};

  auth.isAdmin = function(userId) {
    return userId == process.env.adminId;
  }

  auth.hasRole = function(userId, role, cb) {
    if (auth.isAdmin(userId)) {
      cb(true);
      return;
    }

    controller.storage.users.get(userId, function(err, user) {
      if (!user || !user.roles) {
        cb(false);
      } else {
        cb(user.roles.includes(role));
      }
    });
  }

  auth.assignRole = function(userId, role, cb) {
    controller.storage.users.get(userId, function(err, user) {
      if (!user) {
        user = { id: userId, roles: [] };
      }
      if (!user.roles) {
        user.roles = [];
      }

      if (user.roles.includes(role)) {
        cb();
        return
      }

      user.roles.push(role);
      controller.storage.users.save(user, function(err, id) {
        cb();
      });
    });
  }

  return auth;
}
