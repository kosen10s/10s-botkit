let help = {};
let commands = {};

help.desc = function(name, syonpsis, description) {
  const command = {
    name,
    syonpsis,
    description,
  }
  commands[name] = command;
}

help.list = function() {
  let examples = Object.values(commands).map(x => x.syonpsis).sort();
  return '```' + examples.join('\n') + '```';
}

help.getManual = function(name) {
  const command = commands[name];
  if (!command) {
    return 'No manual entry for ' + name;
  }
  return '```' + command.syonpsis + '```\n' + command.description;
}

module.exports = help;
