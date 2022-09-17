const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { CLIENTID, GUILDID, TOKEN } = require('../config.json');

const commands = [
    new SlashCommandBuilder().setName('realm').setDescription('Allows you to interact with your realm!')
	.addSubcommand(subcommand => subcommand.setName('whitelist').setDescription('Whitelist players from being targeted by Automod.').addStringOption((option) => option.setName('gamertag').setDescription('The player you want to whitelist via their gamertag!')))
	.addSubcommand(subcommand => subcommand.setName('unwhitelist').setDescription('Unwhitelist players from being targeted by Automod.').addStringOption((option) => option.setName('gamertag').setDescription('The player you want to unwhitelist via their gamertag!')))
	.addSubcommand(subcommand => subcommand.setName('bot-info').setDescription('Shows info about your automod.'))
	.addSubcommand(subcommand => subcommand.setName('reconnect').setDescription('Attempt to reconnect the bot to your realm.'))
	.addSubcommand(subcommand => subcommand.setName('list').setDescription('Lists all players on the realm and information on them.'))
	.addSubcommand(subcommand => subcommand.setName('command').setDescription('Executes a command in the realm.').addStringOption((option) => option.setName('command').setDescription('The command to execute in-game!')))
	.addSubcommand(subcommand => subcommand.setName('kick').setDescription('Kicks a player from the realm.').addStringOption((option) => option.setName('gamertag').setDescription('The victim\'s gamertag!')).addStringOption((option) => option.setName('reason').setDescription('The reason for the kick (optional)!'))),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(CLIENTID, GUILDID),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
