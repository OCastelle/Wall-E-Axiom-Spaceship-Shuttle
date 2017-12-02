var Discord = require('discord.js');
var bot = new Discord.Client();
var profanities = require('profanities');
const fs = require('fs');
const db = require('quick.db');

bot.on('message', message =>{
  var sender = message.author;
  var msg = message.content.toUpperCase();
  var prefix = '>'

  db.updateValue(message.author.id + message.guild.id, 1).then(i => {
     
    let messages;
    if (i.value == 25) messages = 5;
    else if (i.value == 50) messages = 10;
    else if (i.value == 100) messages = 15; 

    if (!isNaN(messages)) { // If messages IS STILL empty, run this.
      db.updateValue(`userLevel_${message.author.id + message.guild.id}`, 1).then(o => { // This returns the updated object of userLevel_ID. 
          message.channel.send(`You sent ${messages} messages, therefore you leveled up! You are now level ${o.value}`) // Send their updated level to the channel.
      })
     }

  })

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
      message.channel.send({embed:{
            title: "Ping!",
            description: "PONG!",
            color: 0xa93226
      }})
    }

  if (msg === prefix + 'HELP') {   
      message.channel.send({embed: {
              title: ">Input & Output Commands",
              description: "Command #1: -Input: Hi! -Output: a Pleasant Greeting",
              color: 0x85929e
    }})

      message.channel.send({embed:{
              title: ">Input & Output Commands",
              description: "Command #2: -Input: !Skip -Output: skips Currnet Song",
              color: 0x34495e
    }})
}

  if (msg.includes('SHIT')) {
    message.delete();
    message.author.send('The WORD **shit** is banned, Do not attempt to type it again!')
  }

  if(msg.includes('NIGGER')) {
    message.delete();
    message.author.send('The WORD **NIGGER** is racist, Do not attempt to type it again!')
  }

  if(msg.includes('!SKIP')) {
    message.channel.send({embed: {
            title: "Disliked Song",
            description: "Next Song on PlayList",
            color: 0xd35400

    }})
  }

  if (msg.includes('FUCK')) {
      message.delete();
      message.author.send('The word **Fuck** is banned, Do not attempt to type it again!')
  }
});

bot.login('MzgyODQ1ODIyNTAyNTY3OTM2.DPz17Q.SjfRDOFg6uWd_IpfgCnQVvipRyA')

