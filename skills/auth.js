const help = require('../helpers/help.js');

module.exports = function(controller) {
  const helper = require('../helpers/auth.js')(controller);

  help.desc(
    'assign',
    'assign ROLE @USER',
    '指定したコマンドの実行権限をユーザーに与える'
  );
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

  help.desc(
    'what is my role',
    'what is my role',
    '自分が実行権限を持つコマンドを表示する'
  );
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

  help.desc(
    'what is my id',
    'what is my id',
    '自分のSlack内部IDを表示する'
  );
  controller.hears('what is my id', 'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, 'Your ID is `' + message.user + '`');
  });
}
