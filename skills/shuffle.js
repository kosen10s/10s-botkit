function shuffle(array) {
  for(var i = array.length - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
}

module.exports = function(controller) {
  controller.hears('shuffle ((.|\\s)+)$','direct_message,direct_mention,mention', function(bot, message) {
    var text = message.match[1].trim();
    var targetArr = text.split(/\s+/);
    shuffle(targetArr);

    bot.reply(message, targetArr.join('\n'));
  });
}
