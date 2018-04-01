module.exports = function(controller) {
  const helper = require('../helpers/auth.js')(controller);

  controller.hears('assign (\\w+) <@(.+?)>', 'direct_message,direct_mention,mention', function(bot, message) {
    let role = message.match[1];
    let userId = message.match[2];
    helper.hasRole(message.user, 'assign', function(has) {
      if (!has) {
        bot.reply(message, 'Not allowed: this command requires `assign` role');
        return;
      }

      helper.assignRole(userId, role, function() {
        bot.reply(message, 'Assigned ' + role + ' to <@' + userId + '>');
      })
    });
  });

  controller.hears('what is my role', 'direct_message,direct_mention,mention', function(bot, message) {
    controller.storage.users.get(message.user, function(err, user) {
      if (!user || !user.roles || user.roles.length == 0) {
        console.log(user);
        bot.reply(message, 'You have no role.');
      } else {
        bot.reply(message, user.roles.join(', '));
      }
    });
  });

  controller.hears('what is my id', 'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, 'Your ID is `' + message.user + '`');
  });
}
