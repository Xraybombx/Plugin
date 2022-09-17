import path from 'path'
import { Player, PluginApi } from './@interface/pluginApi.i'
const { MessageEmbed } = require('discord.js');
const { Client, Collection, Intents } = require('discord.js');
const { Authflow } = require('prismarine-auth')
import axios from 'axios'
import { isPartiallyEmittedExpression } from 'typescript';
import { setInterval } from 'timers/promises';
const fs = require('fs')
const { TOKEN, REALMCHATID, BANNED, AUTOMODLOGS, PLAYERLOGS, MOD, DISCORD, REALMID, EMAIL, GAMERSCORE_MINIMUM, WHITELIST_PSN_XBOX, ANTISPAM, XBOXMESSAGE, SHOWDEATHMSGS, SHOWSKINCHANGES, PLUGINNAME, DEVMODE } = require('../config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(TOKEN)

const clearconsole = () => {
  if (!DEVMODE) console.clear()
  if (!DEVMODE) console.log(`Connected To ${PLUGINNAME()}`);
  setTimeout(clearconsole, 45000);
}
setTimeout(clearconsole, 45000);

process.on('uncaughtException',(e)=>{
  
  if (DEVMODE) console.log("BeRP attempted to crash but error was caught.")
  if (DEVMODE) console.log(e)
})

process.on('uncaughtException',(e)=>{
  if (DEVMODE) console.log("Berp Tried To Crash But Error Was Caught")
})

class DiscordmodPlugin {
    private api: PluginApi

    constructor(api: PluginApi) {
      this.api = api
    }
   public cooldown = new Set<string>();
    public onLoaded(): void {
      this.api.getLogger().info('Plugin loaded!')
    this.api.autoConnect(EMAIL,REALMID)
        this.api.autoReconnect(EMAIL,REALMID)
    }
    public onEnabled(): void {
      this.api.getLogger().info('Plugin enabled!')
      {this.api.getCommandManager().executeCommand(`tellraw @a {"rawtext":[{"text":"§✣§l§aAutomod Connected To Realm\n${this.api.getConnection().realm.name} §r§7(${this.api.getRealmManager().getId()})\n"}]}`)
    }
  const runcommands = () => {
    const BOTGT = this.api.getConnection().getXboxProfile().extraData.displayName
    this.api.getCommandManager().executeCommand(`tp "${BOTGT}" 0 0 0`);
    setTimeout(runcommands, 20000);
  }
  setTimeout(runcommands, 20000);

      this.api.getEventManager().on('PlayerJoin', async (userJoin) => {
        if(!DISCORD) return;
        new Authflow('',`${this.api.path}\\auth`,{ relyingParty: 'http://xboxlive.com'}).getXboxToken().then(async (t: { userHash: any; XSTSToken: any; })=>{
          const MicrosoftGT = (await axios.get(`https://profile.xboxlive.com/users/xuid(${userJoin.getXuid()})/profile/settings?settings=Gamertag`, {
            headers:{
              'x-xbl-contract-version': '2',
              'Authorization': `XBL3.0 x=${t.userHash};${t.XSTSToken}`,
              "Accept-Language": "en-US"
            }
          })).data.profileUsers[0].settings[0].value

          const PFP = (await axios.get(`https://profile.xboxlive.com/users/xuid(${userJoin.getXuid()})/profile/settings?settings=GameDisplayPicRaw`, {
            headers:{
              'x-xbl-contract-version': '2',
              'Authorization': `XBL3.0 x=${t.userHash};${t.XSTSToken}`,
              "Accept-Language": "en-US"
            }
          })).data.profileUsers[0].settings[0].value
          if (BANNED.includes(userJoin.getDevice())) {
            const BKMSG = new MessageEmbed()
            .setTimestamp()
            .setColor(`#ff5858`)
            .setFooter(`Playing On ${userJoin.getDevice()}`)
            .setDescription(`**${userJoin.getName()} Was Kicked By Automod**`)
            
            client.channels.fetch(PLAYERLOGS).then(async (channel: { send: (arg0: { embeds: any[]; }) => any; }) => await channel.send({embeds: [BKMSG]})).catch();
          } else {
            if (DEVMODE) this.api.getLogger().info(`**${userJoin.getName()} Joined on ${userJoin.getDevice()}**`)
            const JoinMSG = new MessageEmbed()
            .setTitle(`(+) ${this.api.getConnection().realm.name}`)
            .setFooter(`Joined ${this.api.getConnection().realm.name}`)
            .setTimestamp()
            .setColor(`#21b361`)
            .setDescription(`**${userJoin.getName()} Joined on ${userJoin.getDevice()}**`) 
            client.channels.fetch(PLAYERLOGS).then(async (channel: { send: (arg0: { embeds: any[]; }) => any; }) => await channel.send({embeds: [JoinMSG]})).catch();
      }})
    })

      this.api.getEventManager().on(`PlayerInitialized`,(p)=>{
        this.automod(p)
      })
      this.api.getEventManager().on(`PlayerLeft`,async (userLeft)=>{
        if(!DISCORD) return;
        new Authflow('',`${this.api.path}\\auth`,{ relyingParty: 'http://xboxlive.com'}).getXboxToken().then(async (t: { userHash: any; XSTSToken: any; })=>{
          const MicrosoftGT = (await axios.get(`https://profile.xboxlive.com/users/xuid(${userLeft.getXuid()})/profile/settings?settings=Gamertag`, {
            headers:{
              'x-xbl-contract-version': '2',
              'Authorization': `XBL3.0 x=${t.userHash};${t.XSTSToken}`,
              "Accept-Language": "en-US"
            }
          })).data.profileUsers[0].settings[0].value

          new Authflow('',`${this.api.path}\\auth`,{ relyingParty: 'http://xboxlive.com'}).getXboxToken().then(async (t: { userHash: any; XSTSToken: any; })=>{
          const PFP = (await axios.get(`https://profile.xboxlive.com/users/xuid(${userLeft.getXuid()})/profile/settings?settings=GameDisplayPicRaw`, {
            headers:{
              'x-xbl-contract-version': '2',
              'Authorization': `XBL3.0 x=${t.userHash};${t.XSTSToken}`,
              "Accept-Language": "en-US"
            }
          })).data.profileUsers[0].settings[0].value
          if ((userLeft.getDevice() == "Windows")) {
          } else if ((userLeft.getDevice() == "Android")) {
            } else {
        if (DEVMODE) this.api.getLogger().info(`**${userLeft.getName()} Left the Realm**`)
        const LeftMSG = new MessageEmbed()
        .setTitle(`(-) ${this.api.getConnection().realm.name}`)
        .setFooter(`Left ${this.api.getConnection().realm.name}`)
        .setTimestamp()
        .setColor(`#f09119`)
        .setDescription(`**${userLeft.getName()} Left the Realm**`)
        client.channels.fetch(PLAYERLOGS).then(async (channel: { send: (arg0: { embeds: any[]; }) => any; }) => await channel.send({embeds: [LeftMSG]})).catch();

      }})
    })
  })
  this.api.getEventManager().on('PlayerMessage', async (p)=> {
    if(!ANTISPAM) return;

    if(this.cooldown.has(`${p.sender.getName()}-${JSON.stringify(p.message)}-${this.cooldown.size}`)&& this.cooldown.size == 8) this.kickplayer(p.sender,`§8\n§5Realm: ⊳ ${this.api.getConnection().realm.name} ⊲\n§eUser: \`${p.sender.getName()}\`\n\n§cKicked For Spamming Chat`, `Spamming Chat`)
    this.cooldown.add(`${p.sender.getName()}-${JSON.stringify(p.message)}-${this.cooldown.size+1}`)
    setTimeout(()=>{
      this.cooldown.forEach(p=>{
        this.cooldown.delete(p)
      })
    },20000)
})
        this.api.getEventManager().on(`PlayerMessage`,async (userMessage)=>{
          if(!DISCORD) return;
          new Authflow('',`${this.api.path}\\auth`,{ relyingParty: 'http://xboxlive.com'}).getXboxToken().then(async (t: { userHash: any; XSTSToken: any; })=>{
            const PFP = (await axios.get(`https://profile.xboxlive.com/users/xuid(${userMessage.sender.getXuid()})/profile/settings?settings=GameDisplayPicRaw`, {
              headers:{
                'x-xbl-contract-version': '2',
                'Authorization': `XBL3.0 x=${t.userHash};${t.XSTSToken}`,
                "Accept-Language": "en-US"
              }})).data.profileUsers[0].settings[0].value
              const playername = userMessage.sender.getName()
              const playermsg = new MessageEmbed()
          .setAuthor (`<${userMessage.sender.getName()}> ${userMessage.message.replace(`@`,``)}`, PFP)
          if (playername.startsWith("a")) (playermsg.setColor(`#ff5900`))
           if (playername.startsWith("b")) (playermsg.setColor(`#ff5900`))
            if (playername.startsWith("c")) (playermsg.setColor(`#ff5900`))
           if (playername.startsWith("d")) (playermsg.setColor(`#ffb500`))
            if (playername.startsWith("e")) (playermsg.setColor(`#ffb500`))
             if (playername.startsWith("f")) (playermsg.setColor(`#ffb500`))
            if (playername.startsWith("g")) (playermsg.setColor(`#21ff00`))
             if (playername.startsWith("h")) (playermsg.setColor(`#21ff00`))
              if (playername.startsWith("i")) (playermsg.setColor(`#21ff00`))
             if (playername.startsWith("j")) (playermsg.setColor(`#00ffd4`))
              if (playername.startsWith("k")) (playermsg.setColor(`#00ffd4`))
               if (playername.startsWith("l")) (playermsg.setColor(`#00ffd4`))
              if (playername.startsWith("m")) (playermsg.setColor(`#0054ff`))
               if (playername.startsWith("n")) (playermsg.setColor(`#0054ff`))
                if (playername.startsWith("o")) (playermsg.setColor(`#0054ff`))
               if (playername.startsWith("p")) (playermsg.setColor(`#ab00ff`))
                if (playername.startsWith("q")) (playermsg.setColor(`#ab00ff`))
                 if (playername.startsWith("r")) (playermsg.setColor(`#ab00ff`))
                if (playername.startsWith("s")) (playermsg.setColor(`#ff00d9`))
                 if (playername.startsWith("t")) (playermsg.setColor(`#ff00d9`))
                  if (playername.startsWith("u")) (playermsg.setColor(`#ff00d9`))
                 if (playername.startsWith("v")) (playermsg.setColor(`#60ff7e`))
                  if (playername.startsWith("w")) (playermsg.setColor(`#60ff7e`))
                   if (playername.startsWith("x")) (playermsg.setColor(`#60ff7e`))
                  if (playername.startsWith("y")) (playermsg.setColor(`#6b60ff`))
                   if (playername.startsWith("z")) (playermsg.setColor(`#6b60ff`))
          setTimeout(() => { client.channels.fetch(REALMCHATID).then(async (channel: { send: (arg0: { embeds: any[]; }) => any; }) => await channel.send({embeds: [playermsg]})).catch()}, 200);
          })
        })
        if (SHOWDEATHMSGS)
        this.api.getEventManager().on('PlayerDied', async (p) => {
          var deathmsg = new MessageEmbed()
            .setColor('#c70000')
          if(!p.killer) deathmsg = deathmsg.setDescription(`**${p.player.getName()}** ${p.cause.replace('attack.anvil','was squashed by a falling anvil.').replace('attack.cactus','was pricked to death.').replace('attack.drown','didnt know how to swim.').replace('attack.explosion','was blown up.').replace('attack.fall','hit the ground too hard.').replace('attack.fallingBlock','was squashed by a falling block.').replace('attack.fireworks','went off with a bang.').replace('attack.flyIntoWall','experienced kinetic energy.').replace('attack.generic','experienced death.').replace('attack.inFire','went up in flames').replace('attack.inWall','suffocated in a wall.').replace('attack.lava','tried to swim in lava.').replace('attack.lightningBolt','was struck by lightning.').replace('attack.magic','was killed by magic.').replace('attack.magma','discovered the floor was lava.').replace('attack.onFire','burned to death.').replace('attack.outOfWorld','fell out of the world.').replace('attack.spit','was spitballed by a lama.').replace('attack.starve','starved to death.').replace('attack.wither','withered away.').replace('attack.freeze','froze to death.').replace('attack.stalactite','was skewered by a falling stalacite.').replace('attack.stalagmite','was impaled on a stalagmite.').replace('fell.accident.generic','fell from a high place.').replace('fell.accident.ladder','fell off a ladder.').replace('fell.accident.vines','fell off some vines.').replace('fell.accident.water','fell out of the water.').replace('fell.accident.killer','was doomed to fall...').replace('fell.accident','fell.').replace('attack','experienced death.')}`)
          client.channels.fetch(REALMCHATID).then(async (channel: { send: (arg0: { embeds: any[]; }) => any; }) => await channel.send({embeds: [deathmsg]})).catch()}
        )
        if (SHOWSKINCHANGES)
        this.api.getConnection().on('player_skin', async (ps) => {
          var changeskin = new MessageEmbed()
            .setColor('#ff00d5')
            .setDescription(`**${this.api.getPlayerManager().getPlayerByUUID(ps.uuid).getName()}** has changed their skin.`)
            client.channels.fetch(REALMCHATID).then(async (channel: { send: (arg0: { embeds: any[]; }) => any; }) => await channel.send({embeds: [changeskin]})).catch()}
        )
      client.on(`messageCreate`,(message: { author: { bot: any; username: any; tag: any; }; channel: { id: any; }; content: any; guild: { name: any; }; })=>{
        if(!DISCORD) return;
        if(message.author.bot) return;
       if(message.channel.id == REALMCHATID){
        if (DEVMODE) this.api.getLogger().info(`(Discord) ${message.author.username}: ${message.content}`)
        this.api.getCommandManager().executeCommand(`tellraw @a {\"rawtext\":[{\"text\":\"§f§l(§9${message.guild.name}§f) §r§d${message.author.tag}§r: ${message.content}\"}]}`)
   }
    })
    client.on('interactionCreate', async (interaction: { isCommand?: any; options?: any; reply?: any; memberPermissions?: any; commandName?: any; }) => {
      this.api.getCommandManager().executeCommand('list', async (res) => {
        if (!interaction.isCommand()) return;

        const commandNameSub = `${interaction.options.getSubcommand()}`;
        const { commandName } = interaction;
      
        if (commandName === 'ping') {
          await interaction.reply('Pong!');
        }
        if (commandNameSub === 'kick') {
          if (!interaction.memberPermissions.has('ADMINISTRATOR')) return interaction.reply(`You don't have permission to run this!`)
          try {
            for (const [, c] of this.api.getConnection().getConnectionManager().getConnections()) {
              const pl = c.getPlugins().get(this.api.getConfig().name)
              const api = pl.api
            }
            const listPlayersOnline1 = res.output[1].paramaters[0];
            var gamertag = interaction.options.getString('gamertag')
            let reason = interaction.options.getString('reason')
              if (listPlayersOnline1.includes(gamertag)) {
                if (!reason) reason = 'No Reason.'
              this.api.getCommandManager().executeCommand(`Kick "${gamertag}" ${reason}`);
              } else {
                return interaction.reply({content:'That user isn\'t in the realm or can\'t be found!', ephemeral: true})
              }
              } catch (error) {
                return interaction.reply(`Error! Try again!`)
              }
              return interaction.reply({content: `Successfully kicked ${gamertag}!`, ephemeral: true })
              }
        if (commandNameSub === 'command') {
          if (!interaction.memberPermissions.has('ADMINISTRATOR')) return interaction.reply(`You don't have permission to run this!`)
          try {
          this.api.getCommandManager().executeCommand(`${interaction.options.getString('command')}`);
          } catch (error) {
            return interaction.reply(`Error! Try again!`)
          }
          return interaction.reply({content: `Successfully executed \`${interaction.options.getString('command')}\`!`, ephemeral: true })
        }
        if (commandNameSub === 'list') {
          try {
            const BOTGT =   this.api.getConnection().getXboxProfile().extraData.displayName
            const REALMNAME = this.api.getConnection().realm.name
            let response = `/10 Players Online**:`;
            let players = [];
            response += `\n*-* ${BOTGT} (Bot)`;
            for (const [, p] of this.api.getPlayerManager().getPlayerList()) {
                players.push(p.getName());
                response += `\n*-* ${p.getName()} (${p.getDevice()})`;
            }
            const fancyResponse = new MessageEmbed()
                .setColor("#5a0cc0")
                .setTitle(`${REALMNAME}`)
                .setDescription(`**${players.length + 1}${response}`)
            await interaction.reply({embeds:[fancyResponse]})
                .catch((error: unknown) => {
           if (DEVMODE) this.api.getLogger().error(error);
            
            });
          }catch(err) { if (DEVMODE) console.log(err)}
        }
        else if(commandNameSub === `whitelist`){
          if (!interaction.memberPermissions.has('ADMINISTRATOR')) return interaction.reply(`You don't have permission to run this!`)
          new Authflow('', `.\\auth`, { relyingParty: 'http://xboxlive.com' }).getXboxToken().then(async (t: { userHash: any; XSTSToken: any; }) => {
            const  { data }  = await axios(`https://profile.xboxlive.com/users/gt(${interaction.options.getString(`gamertag`)})/profile/settings?settings=Gamertag`, {
              headers:{ 'x-xbl-contract-version': '2','Authorization': `XBL3.0 x=${t.userHash};${t.XSTSToken}`,"Accept-Language": "en-US" }
            })
            const xuid = data.profileUsers[0].id
          interaction.reply({ content: `${interaction.options.getString('gamertag')} has been Whitelisted!`, ephemeral: true })
          fs.readFile(`./plugins/${PLUGINNAME}/whitelist.json`, 'utf8', (err: any,data: string)=>{
            var obj = JSON.parse(data)
            if(obj.includes(xuid)) return
            obj.push(xuid)
            var json = JSON.stringify(obj)
            fs.writeFile(`./plugins/${PLUGINNAME}/whitelist.json`, json,(err: any) =>{
              if(err) {
                if (DEVMODE) console.log(err)
                return
              }
            })
          })
          })
        }
        else if(commandNameSub === 'unwhitelist') {
          if (!interaction.memberPermissions.has('ADMINISTRATOR')) return interaction.reply(`You don't have permission to run this!`)
            new Authflow('', `.\\auth`, { relyingParty: 'http://xboxlive.com' }).getXboxToken().then(async (t: { userHash: any; XSTSToken: any; }) => {
            const  { data }  = await axios(`https://profile.xboxlive.com/users/gt(${interaction.options.getString(`gamertag`)})/profile/settings?settings=Gamertag`, {
              headers:{ 'x-xbl-contract-version': '2','Authorization': `XBL3.0 x=${t.userHash};${t.XSTSToken}`,"Accept-Language": "en-US" }
            })
            const xuid = data.profileUsers[0].id
          fs.readFile(`./plugins/${PLUGINNAME}/whitelist.json`, 'utf8', (err: any,data: string)=>{
            if(err) return interaction.reply("Could not read whitelist list! An unexpected error occurred! Try again.")
            var obj = JSON.parse(data)
            if(!obj.includes(xuid)) return interaction.reply(`User isn't whitelisted yet!`)
            for(var i = 0; i < obj.length; i++) {
              if(obj[i].includes(xuid)) obj.splice(i, 1)
            }
            var json = JSON.stringify(obj)
            fs.writeFile(`./plugins/${PLUGINNAME}/whitelist.json`, json,(err: any) =>{
              if(err) {
                if (DEVMODE) console.log(err)
                return interaction.reply("Unexpected error when trying to remove from whitelist!")
              }
              else {
                interaction.reply(`Sucessfully removed user from whitelist`);
              }
            })
          })
          })
        }
        else if(commandNameSub === 'bot-info') {
          if (!interaction.memberPermissions.has('ADMINISTRATOR')) return interaction.reply(`You don't have permission to run this!`)
          const BOTGT =   this.api.getConnection().getXboxProfile().extraData.displayName


          const botinfo = new MessageEmbed()
          .setColor("#0084ee")
          .setTitle(`__${BOTGT} Info__`)
          .setDescription(`**Connected To:**\n${this.api.getConnection().realm.name}\n\n**Online Players:** N/A\n\n**Banned Devices:** \n${BANNED}\n\n**Realm ID:** (${this.api.getRealmManager().getId()})`)

      await interaction.reply({embeds:[botinfo]})


          .catch((error: unknown) => {
            if (DEVMODE) this.api.getLogger().error(error)
            }
          )}

        else if(commandNameSub === `reconnect`){
          if (!interaction.memberPermissions.has('ADMINISTRATOR')) return interaction.reply(`You don't have permission to run this!`)
          const BOTGT =   this.api.getConnection().getXboxProfile().extraData.displayName
          interaction.reply({content:`Reconnecting ${BOTGT} To ${this.api.getConnection().realm.name}...`, ephemeral: true})
          setTimeout(() => { process.exit(1)}, 100);
      }
    })
  })
      }
  public automod(p: Player): void {
    if(!MOD) return;
    new Authflow('',`${this.api.path}\\auth`,{ relyingParty: 'http://xboxlive.com'}).getXboxToken().then(async (t: { userHash: any; XSTSToken: any; })=>{
      const GamerScore =  (await axios.get(`https://profile.xboxlive.com/users/xuid(${p.getXuid()})/profile/settings?settings=Gamerscore`, {
        headers:{
          'x-xbl-contract-version': '2',
          'Authorization': `XBL3.0 x=${t.userHash};${t.XSTSToken}`,
          "Accept-Language": "en-US"
        }
      })).data.profileUsers[0].settings[0].value
      if (DEVMODE) console.log(GamerScore)
    fs.readFile(path.resolve(`./plugins/${PLUGINNAME}/whitelist.json`), 'utf8',  async (err: any,data: string | string[])=>{
      if (DEVMODE) if(!data || err) return console.log(err);
      if(data.includes(p.getXuid())) return 

    const invalidname = ["§" || "-"]
if(p.getName().length > 16) return this.kickplayer(p,`§b\n§5Realm: §r⊳ §b${this.api.getConnection().realm.name} §r⊲\n§eUser: ${p.getName()}\n\n§cYour Gamertag is Invalid!`, `Namespoofing`)
if(p.getName().includes(`${invalidname}`)) return this.kickplayer(p, `§b\n§5Realm: §r⊳ §b${this.api.getConnection().realm.name} §r⊲\n§eUser: ${p.getName()}\n\n§cYour Gamertag is Invalid!`, `Namespoofing`)
    if(BANNED.includes(p.getDevice())) return this.kickplayer(p,`§b\n§5Realm: §r⊳ §b${this.api.getConnection().realm.name} §r⊲\n§eUser: ${p.getName()}\n\n§cSorry, ${p.getDevice()} Is a Blocked Device`, `${p.getDevice()} Is A Blocked Device`)
    new Authflow('',`${this.api.path}\\auth`,{ relyingParty: 'http://xboxlive.com'}).getXboxToken().then((t: { userHash: any; XSTSToken: any; })=>{
      axios.get(`https://titlehub.xboxlive.com/users/xuid(${p.getXuid()})/titles/titlehistory/decoration/scid,image,detail`, {
        headers:{
          'x-xbl-contract-version': '2',
          'Authorization': `XBL3.0 x=${t.userHash};${t.XSTSToken}`,
          "Accept-Language": "en-US"
        }
      }).then((res)=>{
        if(GamerScore < GAMERSCORE_MINIMUM && !WHITELIST_PSN_XBOX) return this.kickplayer(p,`§b\n§5Realm: ⊳ §b${this.api.getConnection().realm.name} §r⊲\n**§eUser:**§e${p.getName()}\n\n§cGamerscore Must Be ${GAMERSCORE_MINIMUM}} Or Higher To Join!`, `Gamerscore is too low!`)
        if(GamerScore < GAMERSCORE_MINIMUM && WHITELIST_PSN_XBOX && p.getDevice().includes!(`Playstation`)) return this.kickplayer(p,`§b\n§5Realm: ⊳ §b${this.api.getConnection().realm.name} §r⊲\n**§eUser:**§e${p.getName()}\n\n§cGamerscore Must Be ${GAMERSCORE_MINIMUM}} Or Higher To Join!`, `Gamerscore is too low!`)
        if(!res.data.titles[0]) return this.kickplayer(p,`§r\n§5Realm: §r⊳ ${this.api.getConnection().realm.name} ⊲\n§eUser: ${p.getName()}\n\n§6Go To https://account.xbox.com/Profile (Privacy Settings) \nUnder (Others Can:) Set Each One To * Everyone`, `Private Title History/Appearing Offline`)
        if(BANNED.includes(res.data.titles[0].name.replace(new RegExp('Minecraft for ','g'),'')) && !(p.getDevice().includes(res.data.titles[0].name))) return this.kickplayer(p,`§8\n§5Realm: §r⊳ §b${this.api.getConnection().realm.name} §r⊲\n§eUser: ${p.getName()}\n\n§cDevice Spoofing On ${res.data.titles[0].name}`, `\n${res.data.titles[0].name} \nSpoofing As ${p.getDevice()}`)
        if(BANNED.includes(res.data.titles[0].name.replace(new RegExp('Minecraft for ','g'),''))) return this.kickplayer(p,`§8\n§5Realm: §r⊳ §b${this.api.getConnection().realm.name} §r⊲\n§eUser: ${p.getName()}\n\n§cRecently Played On A Blocked Device!`, `Recently Played On ${res.data.titles[0].name}`)
        if(BANNED.includes(res.data.titles[1].name.replace(new RegExp('Minecraft for ','g'),''))) return this.kickplayer(p,`§8\n§5Realm: §r⊳ §b${this.api.getConnection().realm.name} §r⊲\n§eUser: ${p.getName()}\n\n§cRecently Played On A Blocked Device!`, `Recently Played On ${res.data.titles[1].name}`)
        if(BANNED.includes(res.data.titles[2].name.replace(new RegExp('Minecraft for ','g'),''))) return this.kickplayer(p,`§8\n§5Realm: §r⊳ §b${this.api.getConnection().realm.name} §r⊲\n§eUser: ${p.getName()}\n\n§cRecently Played On A Blocked Device!`, `Recently Played On ${res.data.titles[2].name}`)
      if(!res.data.titles[0].name.includes(`Minecraft`)) return this.kickplayer(p,`§b\n§5Realm: §r⊳ §b${this.api.getConnection().realm.name} ⊲\n§eUser: ${p.getName()}\n\n§cXbox Api Says You're Not Playing Minecraft`, `No API Match`)
      })
    })
  })
})
  }
  public kickplayer(p: Player, r: string, rl: string): void{
this.api.getCommandManager().executeCommand(`Kick "${p.getXuid()}" ${r}`)
this.Xmessage(p,`You have been kicked from ${this.api.getConnection().realm.name}. Reason: ${rl}`)
if(!DISCORD) return;
this.api.getWorldManager().sendMessage(`§⊳§l§c${p.getName()} Was Kicked By Automod ${rl}`)
const AUTOMODLOG = new MessageEmbed()
.setTitle(`__${this.api.getConnection().realm.name}__`)
.setTimestamp()
.setFooter(`Automod Violation`)
.setColor(`#ff5858`)
.setDescription(`\n**Player Name:** ${p.getNameTag()}\n**XUID:** ${p.getXuid()}\n**Device**: ${p.getDevice()}\n**Gamerscore:** N/A\n**Reason**: *${rl}*`)
.setThumbnail(``)
setTimeout(() => {
client.channels.fetch(AUTOMODLOGS).then(async (channel: { send: (arg0: { embeds: any[]; }) => any; }) => await channel.send({embeds: [AUTOMODLOG]})).catch()
}, 10000);
  }
    public onDisabled(): void {
      if (DEVMODE) this.api.getLogger().info('Plugin disabled!')
      process.exit(1)
    }
    public Xmessage(p:Player,m:string): void{
      if(!XBOXMESSAGE) return;
      new Authflow('',`${this.api.path}\\auth`,{ relyingParty: 'http://xboxlive.com'}).getXboxToken().then(async (t: { userHash: any; XSTSToken: any; })=>{
        const message = await axios(`https://xblmessaging.xboxlive.com/network/xbox/users/me/conversations/users/xuid(${p.getXuid()})`, {
                method: 'POST',
              data: {
                      parts: [
                          {
                              text: `${m}`,
                              contentType: 'text',
                              version: 0,
                          },
                      ],
                  },
                  headers: {
                      Authorization: `XBL3.0 x=${t.userHash};${t.XSTSToken}`,
                  },
                });
          });
    }
}
export = DiscordmodPlugin
