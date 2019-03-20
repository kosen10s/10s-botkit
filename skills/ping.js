const help = require('../helpers/help.js');

help.desc(
  'ping',
  'ping',
  'pongと返答する'
)
module.exports = function(controller) {
  controller.hears('ping','direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, 'pong');
  });
}
