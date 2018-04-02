var choice = function(array) {
  index = Math.floor(Math.random() * (array.length))
  return array[index];
}

module.exports = function(controller) {
  controller.hears('choice ((.|\\s)+)$','direct_message,direct_mention,mention', function(bot, message) {
    var text = message.match[1].trim();
    var targetArr = text.split(/\s+/);

    bot.reply(message, choice(targetArr));
  });
}
