const help = require('../helpers/help.js');

help.desc(
  'help',
  'help [COMMAND]',
  'コマンドのヘルプメッセージを表示する'
);

module.exports = function(controller) {
  controller.hears('help (.+)', 'direct_message,direct_mention,mention', function(bot, message) {
    const command = message.match[1];
    bot.reply(message, help.getManual(command));
  });

  controller.hears('help', 'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, help.list());
  });
}
