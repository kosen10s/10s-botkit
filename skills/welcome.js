const help = require('../helpers/help.js');

help.desc(
  'welcome',
  'welcome [MESSAGE]',
  'ユーザーがチャンネルにjoinした時のメッセージを更新する'
)
module.exports = function(controller) {
  controller.on('user_channel_join,user_group_join', function(bot, message) {
    controller.storage.channels.get(message.channel, function(err, channel) {
      if (!channel) {
        channel = {}
      }
      var welcomeMsg = channel.welcomeMsg || 'Welcome, <@' + message.user + '>';
      bot.reply(message, welcomeMsg);
    });
  });

  controller.hears('welcome ((.|\\s)+)$','direct_mention,mention', function(bot, message) {
    var welcomeMsg = message.match[1];
    controller.storage.channels.get(message.channel, function(err, channel) {
      if (!channel) {
        channel = { id: message.channel };
      }
      channel.welcomeMsg = welcomeMsg;
      controller.storage.channels.save(channel, function(err, id) {
        bot.reply(message, 'Saved: ' + welcomeMsg);
      });
    });
  });

  controller.hears('welcome', 'direct_mention,mention', function(bot, message) {
    controller.storage.channels.get(message.channel, function(err, channel) {
      if (!channel) {
        channel = {}
      }
      var welcomeMsg = channel.welcomeMsg || 'Welcome, <@' + message.user + '>';
      bot.reply(message, welcomeMsg);
    });
  });
}
