const help = require('../helpers/help.js');

var choice = function(array) {
  index = Math.floor(Math.random() * (array.length))
  return array[index];
}

help.desc(
  'choice',
  'choice ITEM...',
  '空白/改行区切りの要素から、ランダムに１つを選んで返す'
)
module.exports = function(controller) {
  controller.hears('choice ((.|\\s)+)$','direct_message,direct_mention,mention', function(bot, message) {
    var text = message.match[1].trim();
    var targetArr = text.split(/\s+/);

    bot.reply(message, choice(targetArr));
  });
}
