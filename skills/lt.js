const help = require('../helpers/help.js');

var toLt = function(lt_num) {
  return 'kosen10s LT #' + lt_num;
}

const issues = [
  "日付決定",
  "会場手配",
  "connpassでのイベント作成",
  "開会宣言",
  "買うものと買い出し要員",
  "懇親会の会場手配",
  "会計収支表作成",
]

module.exports = function(controller) {
  const helper = require('../helpers/auth.js')(controller);
  const github = require('../helpers/github.js');

  help.desc(
    'lt start',
    'lt start',
    '次回イベントに向けたissueをリポジトリに発行する'
  )
  controller.hears('lt start', 'direct_message,direct_mention,mention', function(bot, message) {
    helper.hasRole(message.user, 'lt', function(has) {
      if (!has) {
        bot.reply(message, 'Not allowed: this command requires `lt` role');
        return;
      }

      controller.storage.teams.get(bot.identifyTeam(), function(err, team) {
        if (!team) {
          team = {id: bot.identifyTeam(), lt_next_num: 1};
        }
        if (!team.lt_next_num) {
          team.lt_next_num = 1;
        }

        bot.startConversation(message, function(err, convo) {
          if (err) {
            return;
          }

          convo.say('Next LT is ' + toLt(team.lt_next_num));
          convo.ask('Start? (`yes` or `no`)', [
            {
              pattern: 'yes',
              callback: function(response, convo) {
                // since no further messages are queued after this,
                // the conversation will end naturally with status == 'completed'
                convo.next();
              }
            },
            {
              pattern: 'no',
              callback: function(response, convo) {
                // stop the conversation. this will cause it to end with status == 'stopped'
                convo.stop();
              }
            },
            {
              default: true,
              callback: function(response, convo) {
                convo.repeat();
                convo.next();
              }
            }
          ]);

          convo.on('end', async function(convo) {
            if (convo.status == 'completed') {
              bot.reply(message, 'Doing...');
              var label = toLt(team.lt_next_num)
              await github.createLabel(label);
              for (let title of issues) {
                await github.createIssue(title, label);
              }

              team.lt_next_num += 1;
              controller.storage.teams.save(team);
              bot.reply(message, "Finished! Let's start " + label + "!!!\n" + github.issueTrackerUrl);
            } else {
              bot.reply(message, 'OK, nevermind!');
            }
          });
        });
      });
    });
  });

  help.desc(
    'lt next',
    'lt next NUMBER',
    '次回イベントのナンバリングを変更する'
  )
  controller.hears('lt next (\\d+)', 'direct_message,direct_mention,mention', function(bot, message) {
    var next = parseInt(message.match[1]);
    controller.storage.teams.get(bot.identifyTeam(), function(err, team) {
      if (!team) {
        team = {id: bot.identifyTeam()};
      }
      team.lt_next_num = next;
      controller.storage.teams.save(team, function(err) {
        bot.reply(message, 'Next LT is `' + toLt(next) + '`');
      });
    });
  });
}
