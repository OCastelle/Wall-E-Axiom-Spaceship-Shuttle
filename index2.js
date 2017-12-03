var Discord = require('discord.js');
var bot = new Discord.Client();
var profanities = require('profanities');
const fs = require('fs');
const db = require('quick.db');
const weather = require('weather-js');

bot.on('message', message =>{
  var sender = message.author;
  var msg = message.content.toUpperCase();
  var prefix = '>'
  let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
  let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

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
              title: "✨Input & Output Commands",
              description: "⬆Link in Bio",
              url: "https://www.youtube.com/channel/UCcgVECVN4OKV6DH1jLkqmcA",
              color: 0xc2a649,
              fields:[
                {
                    name: " ➡Command #1-The-Ping-Pong-Command",
                    value: "-Input: >PING -Output: PONG!",
                    inline: true
                },
                {
                    name: " ➡Command #2-The-Skip-Command",
                    value: "-Input: !SKIP - Output: Skips current song.",
                    inline: true
                },
                {
                    name: "➡Command #3-The-Weather-Command",
                    value: "-Input: >WEATHER (location, + State) -Output: shows weather of said location.",
                    inline: true
                },
                {
                    name: " ➡Command #4-Greeting-Command",
                    value: "-Input: Hi! -Output: a please greeting.",
                    inline: false
                },
              ],
              timestamp: new Date(),
              footer: {
                  text: "Thank you for reading the commands",
                  icon_url: "http://il2.picdn.net/shutterstock/videos/400882/thumb/1.jpg"
              }
    }})
}

  if (msg.startsWith(prefix + 'WEATHER')) { // This checks to see if the beginning of the message is calling the weather command.
    // You can find some of the code used here on the weather-js npm page in the description.

    weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
        if (err) message.channel.send(err);

        // We also want them to know if a place they enter is invalid.
        if (result === undefined || result.length === 0) {
            message.channel.send('**Please enter a valid location.**') // This tells them in chat that the place they entered is invalid.
            return; // This exits the code so the rest doesn't run.
        }

        // Variables
        var current = result[0].current; // This is a variable for the current part of the JSON output
        var location = result[0].location; // This is a variable for the location part of the JSON output

        // Let's use an embed for this.
        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`) // This is the text of what the sky looks like, remember you can find all of this on the weather-js npm page.
            .setAuthor(`Weather for ${current.observationpoint}`) // This shows the current location of the weather.
            .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
            .setColor(0xc2a649) // This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex
            .addField('Timezone',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
            .addField('Degree Type',location.degreetype, true)// This is the field that shows the degree type, and is inline
            .addField('Temperature',`${current.temperature} Degrees`, true)
            .addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Winds',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)

            // Now, let's display it when called
            message.channel.send({embed});
    });
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
