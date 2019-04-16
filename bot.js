var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


bot.on('message', function (user, userID, channelID, message, evt) {
	/* 
	$ represents name.
	% is he/she.
	@ is him/her.
	& is his/hers.
	*/
  var insults = ["**If $ was any more inbred, %'d be a sandwich.**",
    "**$ is a spherical dumbass. No matter what way you look at @, %'s a dumbass.**",
    "**$ couldn't pour piss out of a boot if the instructions were written on the heel.**",
    "**The tallest cliff in the world can be found looking down from $'s ego to & IQ.**",
    "**The smallest unit of time is the Planck time, which is the amount of time it takes light to travel a Planck length. A Planck length represents the length of $'s penis.**",
    "**The only ass $ is going to get is when & hand rips through the toilet paper.**",
    "**$ is like Rapunzel except instead of letting & hair down % lets down everyone in his life.**",
    "**$'s family tree is a circle.**",
    "**$ is about as useful as a screen door on a submarine.**",
    "**$ has got more dick in his personality than he does in his pants.**",
    "**How the fuck was $ the sperm that won?**",
    "**Fuck you " + user + ", don't tell me what to do.**",
    "**Put a condom on your head $, because if you're going to act like a dick, you may as well dress as one.**",
    "**I wonder if $ would be able to speak more clearly if their parents were second cousins instead of first.**",
    "**I'd call $ a cunt, but % has neither the warmth nor the depth.**",
    "**I would have been $'s daddy, but a dog beat me over the fence.**",
		"**$ is a toaster.**"];

  if (message.substring(0, 8) == "!insult ") {
    var messageAfterCommand = message.substring(8);
		var firstSpaceIndex = messageAfterCommand.indexOf(" ");
		
		if (!(firstSpaceIndex < 0)) {
			var name = messageAfterCommand.substring(0, firstSpaceIndex);
			var gender = messageAfterCommand.substring(firstSpaceIndex).trim().toLowerCase();

			if (gender.length < 1 || gender.length > 1 || (gender != "f" && gender != "m")) {
				bot.sendMessage({
					to: channelID,
					message: "Please type a command in the form of !insult *name gender*. Use the letters f or m for female and male, respectively."
				});
			} else {
				var subPronoun = gender == "f" ? "she" : "he";
				var objPronoun = gender == "f" ? "her" : "him";
				var possPronoun = gender == "f" ? "hers" : "his";

				var insultIndex = Math.floor(Math.random() * insults.length);

				if (gender == "f") {
					while (insultIndex == 9 || insultIndex == 4) {
						insultIndex = Math.floor(Math.random() * insults.length);
					}
				}

				bot.sendMessage({
					to: channelID,
					message: insults[insultIndex].replace("$", name).replace("%", subPronoun).replace("@", objPronoun).replace("&", possPronoun)
				});
			}
		} else {
			bot.sendMessage({
				to: channelID,
				message: "Please type a command in the form of !insult *name gender*. Use the letters f or m for female and male, respectively."
			});
		}
  }
});
