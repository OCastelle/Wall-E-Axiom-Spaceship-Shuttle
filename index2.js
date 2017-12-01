var Discord = require('discord.js');
var bot = new Discord.Client();
var profanities = require('profanities');

bot.on('message', message =>{
  var sender = message.author;
  var msg = message.content.toUpperCase();
  var prefix = '>'

bot.user.setPresence({ game: { name: "!+=soundblock=+!" , type: 0 } });

  for (x = 0; x < profanities.length; x++) {
        if (message.content.toUpperCase() == profanities[x].toUpperCase()) {
             message.channel.send('HEY! That is inappropriate, Please Do Not Attempt to type that again!')
             message.delete();
             return;
        }
  }

  if (message.author.equals(bot.user)) return;

  if (message.content == "Hi!"){
      message.channel.sendMessage("Greetings, From The Axiom Space Shuttle!");

  }

  if (msg === prefix + 'PING') {
      message.channel.send('PONG!')
  }

  if (msg.includes('SHIT')) {
    message.delete();
    message.author.send('The WORD **shit** is banned, Do not attempt to type it again!')
  }

  if(msg.includes('NIGGER')) {
    message.delete();
    message.author.send('The WORD **NIGGER** is racist, Do not attempt to type it again!')
  }

  if (msg.includes('FUCK')) {
      message.delete();
      message.author.send('The word **Fuck** is banned, Do not attempt to type it again!')
  }
});

bot.login('MzgyODQ1ODIyNTAyNTY3OTM2.DPz17Q.SjfRDOFg6uWd_IpfgCnQVvipRyA')
