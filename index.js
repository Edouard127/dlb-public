//////////////////////////////////////////////////////////////////////////////////////////
// DLB-DEV
/////////////////////////////////////////////////////////////////////////////////////////

const Discord  = require("./node_modules/discord.js");
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const client = new Discord.Client({autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/});
const config = require("./config.json");
const fs = require("fs-extra");
const decache = require("decache");
const path = require("path");

const db = require("quick.db");

var prefix = config.prefix;

/////////////////////////////////////////////////////////////////////////////////////////
// LINK CODE
/////////////////////////////////////////////////////////////////////////////////////////

client.on("err", err => {
  console.log(err)
});

client.on("ready", (message, channel) => {
  const onReady = require("./events/onReady.js")
  onReady(Discord, client, message, channel, path, fs, decache)
});

client.on("guildCreate", (guild, message, channel) => {
  const guildCreate = require("./events/guildCreate.js")
  guildCreate(Discord, client, guild, fs, decache)
});

client.on("guildDelete", guild => {
  const guildDelete = require("./events/guildDelete.js")
  guildDelete(Discord, client, guild, fs, decache)
});
client.on("channelDelete", guild => {
  const guildDelete = require("./events/channelDelete.js")
  guildDelete(Discord, client, guild, fs, decache)
})


client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
  var id = (await reaction.message.guild.members.fetch()).find(user => user.user.tag === reaction.message.author.username)
  console.log(id)
  
  
  var username = reaction.message.author.username
  var time = new Date(reaction.message.author.createdTimestamp)
  var fromS = reaction.message.guild.name
  var fromC = reaction.message.channel.name
  var content = reaction.message.content
  var ownerOf = reaction.message.guild.fetchOwner()
  
  if(reaction.message.webhookId !== null){
    const exampleEmbed = new MessageEmbed()
	.setTitle('User Informations')
	.setAuthor({ name: client.user.username, iconURL: client.user.avatarURL, url: 'https://protogenparadise.xyz' })
	.setThumbnail(reaction.message.author.avatarURL())
	.addFields(
    { name: `Content:`, value: `${content}`, inline: true },
    { name: '\u200B', value: '\u200B' },
		{ name: `ID:`, value: `${id.id}`, inline: true },
    { name: '\u200B', value: '\u200B' },
		{ name: 'Username', value: `${username}`, inline: true },
    { name: '\u200B', value: '\u200B' },
    { name: 'Sent at:', value: `${time}`, inline: true },
    { name: '\u200B', value: '\u200B' },
    { name: 'Sent from:', value: `${fromS}\nIn: ${fromC}`, inline: true },
    { name: '\u200B', value: '\u200B' },
    { name: 'Owner of:', value: `${fromS}: ${(await ownerOf).user.username}\n${reaction.message.guild.memberCount} members`, inline: true },
    { name: '\u200B', value: '\u200B' },
	)
	.setTimestamp()
	.setFooter({ text: 'Created by xzdc, Continued by Kamigen#0001', iconURL: 'https://cdn.discordapp.com/avatars/944637831844864020/401906366a8da021b14e8c8b57b4b170.webp' })
  const report = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('report')
					.setLabel('Report User ?')
					.setStyle('DANGER')
      )
      const reportForm = new MessageActionRow()
			.addComponents(
				
      
          new MessageSelectMenu()
					.setCustomId('reportForm')
					.setPlaceholder('Nothing selected')
					.setMaxValues(2)
					.addOptions([
						{
							label: 'Cyber-bulllying or harrassement',
							value: 'harrassement',
						},
						{
							label: 'Spam',
							value: 'spam',
						},
						{
							label: 'Graphic or sexual content',
							value: 'graphic',
						},
            {
							label: 'Scam',
							value: 'scam',
						},
						{
							label: 'Promotion or encouragement of self-harm or suicide',
							value: 'suicide',
						},
						{
							label: 'Harmful misinformation or violent extremism',
							value: 'karen',
						},
            {
              label: 'Other',
              value: 'other',
            }
					])
      )
      
			
      user.send({ embeds: [exampleEmbed], components: [report] }).then(message => {
        
        
        message.awaitMessageComponent()
          .then(interaction => interaction.update({ embeds: [exampleEmbed], components: [reportForm]}))
          .catch(err => console.log(err));
      })
      client.on("interaction", interaction => {
        const reportMessage = new MessageEmbed()
	.setTitle('Report')
	.setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
	.setThumbnail(interaction.user.avatarURL())
	.addFields(
    { name: `Content:`, value: `${content}`, inline: true },
    { name: '\u200B', value: '\u200B' },
		{ name: `ID:`, value: `${id.id}`, inline: true },
    { name: '\u200B', value: '\u200B' },
		{ name: 'Username', value: `${username}`, inline: true },
    { name: '\u200B', value: '\u200B' },
    { name: 'Sent at:', value: `${time}`, inline: true },
    { name: '\u200B', value: '\u200B' },
    { name: 'Sent from:', value: `${fromS}\nIn: ${fromC}`, inline: true },
    { name: '\u200B', value: '\u200B' },
	)
        var owner = client.users.cache.get('385441179069579265')
        if(interaction.values){
        owner.send({ embeds: [reportMessage]})
        }
      })



    //user.send(`id: ${reaction.message.author.id}\nUsername: ${reaction.message.author.username}\nAvatar: ${reaction.message.author.avatar}`)
  }
  //console.log(reaction.message)
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});
client.on("messageCreate", (message) => {
  // on ne prend pas en compte les DMs
  if (message.channel.type == "dm") return;
  /*if(message.content === "!servers"){
    var invites = []; // starting array
    message.client.guilds.cache.forEach(async (guild) => { // iterate loop on each guild bot is in
  
      // get the first channel that appears from that discord, because
      // `.createInvite()` is a method for a channel, not a guild.
      const channel = guild.channels.cache 
        .filter((channel) => channel.type === 'text')
        .first();
      if (!channel || guild.member(client.user).hasPermission('CREATE_INSTANT_INVITE')){ console.log("no permission to invite")}
      await channel.createInvite({ maxAge: 0, maxUses: 0 })
        .then(async (invite) => {
          invites.push(`${guild.name} - ${invite.url}`); // push invite link and guild name to array
        })
        .catch((error) => console.log(error));
      console.log(invites);
    })
  }*/

    // COMMANDE DE LINK
  if (message.content == "!link") {
    const linkCmd = require("./modules/linkCmd.js")
    linkCmd(Discord, client, message, fs, decache, path)
    
    

  // COMMANDE DE DELINK
  } 
  else if (message.content == "!unlink") {
    const unlinkCmd = require("./modules/unlinkCmd.js")
    unlinkCmd(Discord, client, message, fs, decache, path)

  } else if (message.content == "!log A") {
	console.log(A00)
  } else if (message.content == "!log B") {
	console.log(B00)
  } else if (message.content == "!log C") {
	console.log(C00)
  } else if (message.content == "!log all") {
	networksList.forEach(net => {
		net.map(id => {
			console.log(id)
		})
	})
	
  } else if (message.content == "!purge webhooks") console.log(message.guild)

  else if (message.content == "!purge all") client.channels.forEach(chan => chan.delete())

  else if (message.content == "!networksList") {console.log(" Networks List :"), console.log(networksList)}

  else if (message.content == "!linkedHooksList") {console.log(" Linked Hooks List :"), console.log(linkedHooksList)}

  else if (message.content == "!linkedFilesList") {console.log(" Linked Files List :"), console.log(linkedFilesList)}

  else if (message.content == "!unlinkedHooksList") {console.log(" Unlinked Hooks List :"), console.log(unlinkedHooksList)}

  else if (message.content == "!unlinkedFilesList") {console.log(" Unlinkd Files List :"), console.log(unlinkedFilesList)}

  else if (message.content == "!unlinkedChanIDsList") {console.log(" Unlinked ChanIDs List :"), console.log(unlinkedChanIDsList)}

  else if (message.content == "!linkedChanIDsList") {console.log(" Linked ChanIDs List :"), console.log(linkedChanIDsList)}

  else if (message.content == "!oldList") {console.log(" Old Networks List :"), console.log(oldNetworksList)}

  else if (message.content == "!newNetList") {console.log(" New Network List :"), console.log(newNetworkList)}


  if(message.content.startsWith(prefix + 'blacklist') && !message.author.bot){

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //console.log(args[1]);
    let reason = args.slice(2).join(' '); // arguments should already be defined
    const blackList = require("./functions/blackList.js")
    blackList(Discord, client, message, fs, decache, path, args, reason, db)
  }
  if(message.content.startsWith(prefix + 'unblacklist') && !message.author.bot){

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //console.log(args[1]);
    let reason = args.slice(2).join(' '); // arguments should already be defined
    const unblackList = require("./functions/unblackList.js")
    unblackList(Discord, client, message, fs, decache, path, args, reason)
  }




  if ((message.author.bot) || message.content.startsWith(prefix)) return;

  var chanID = message.channel.id;
  //var channel = client.channels.get(chanID); 
  var authorID = client.users.cache.get(`${message.author.id}`);
  let avatarURL = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
//console.log(authorID.avatarURL())
  if (authorID.avatarURL !== null) avatarURL = authorID.avatarURL().split('size=2048').join('size=64');

  let msg = message.content;

  if (message.attachments) message.attachments.forEach(att => {
    if (!message.content) msg = `${att.url}`;
    else if (message.content) msg = `${message.content}\n ${att.url}`;
  })


  // GLOBAL LINK

  // pour chaque liste de la liste des réseaux
  networksList.forEach(list => {
    // si l'ID du salon d'où provient le message n'appartient à aucune liste on arrête ici
  	if (!list.includes(chanID)) return
    // si l'ID du salon d'où provient le message appartient à une liste, alors ...
  	else {
  	  // on vérifie que chaque liste réseau contienne une liste
  	   if (Array.isArray(list)) list.forEach(element => {
      	// on exclu l'élément (chanID) d'où provient le message
        if (element != chanID) {
          // on lit chaque dossier contenu dans le dossier des réseaux puis...
          fs.readdirSync("./networks/").forEach(network => {
          	// on lit chaque dossier contenu dans le dossier du réseau concerné
            fs.readdirSync("./networks/" + network + "/").forEach(guildDir => {
              // on exclu le fichier ".keep" (utile pour github) puis on définit chaque fichier contenu dans le dossier de la Guild ()
           	  if (guildDir != ".keep") fs.readdirSync("./networks/" + network + "/" + guildDir).forEach(file => {
           	  	// on définit fileName comme étant le nom du fichier sans extension
          		var fileName = file.split(".js").join("")
          		// si le nom du fichier (chanID) est égal à un élément de cette liste
                if (fileName == element) {
                  // on définit l'emplacement du fichier du webhook
                  var wbFile = "./networks/" + network + "/" + guildDir + "/" + element + ".js";
                  // on require le fichier du webhook
          	      var wb = require(wbFile)
                  // on édite le fichier du webhook
                  try {
                  wb.edit({'name': message.author.tag, 'avatar': avatarURL}).catch(err => {
                    if (err) console.log(err)
                  // puis...
                  }).then(wb => {
                  	// si le webhook existe on l'envoie
                    var everyone = false
                    if(msg.includes("@everyone") || msg.includes("@here")){
                      everyone = true
                    }
                    
                        var bannedList = db.get("bans.bans")
                        console.log(bannedList)
                        for(var banned in bannedList){
                          //console.log(banned)
                          if(message.author.id == bannedList[banned]){
                            everyone = true
                          }
                        }
                      
                    
                      if (wb != undefined && !everyone){ 
                        try {
                        wb.send(msg)
                        //console.log(wb)
                        } catch(err) {
                          message.channel.send("There was an error with the hook" + element)
                        }
                      }
                      else if(everyone){
                        message.channel.send(`Sorry ${message.author.username}, unfortunately you are banned from using this bot`).then((msg) => {
                          if(message) message.delete()
                          setTimeout(() => msg.delete(), 3000)
                        })
                      }
                    // s'il n'existe pas on supprime le fichier
                    if(wb == undefined){
                      fs.removeSync(wbFile) && console.log(" Le fichier " + wbFile + " a été supprimé car le webhook associé n'existe plus")
                    }
                      
                   
                    //console.log(blackListed)
                    
                    
                  })
                }
                catch(err){
                  message.channel.send("There was an error with the hook " + element)
                }

                }

              })

            })

          })
          // on retourne dans la console le nom d'utilisateur et le message
        } else { 
          console.log(" " + message.author.tag + " : " + msg)
        }
  	  })
    }
  })

// END OF LINK CODE  

});

client.login(process.env.TOKEN || config.token);