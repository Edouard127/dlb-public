//////////////////////////////////////////////////////////////////////////////////////////
// DLB-DEV
/////////////////////////////////////////////////////////////////////////////////////////

const Discord  = require("./node_modules/discord.js");
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Permissions, MessageAttachment } = require('discord.js');
const client = new Discord.Client({autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/});
const config = require("./config.json");
const fs = require("fs-extra");
const decache = require("decache");
const path = require("path");
const wordList = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fuck me", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "goddamned", "hardcoresex", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "shag", "shagger", "shaggin", "shagging", "shemale", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx", "moan", "moans", "cums"]
const devs = ["385441179069579265"]
const mods = ["385441179069579265"]

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
	.setThumbnail(reaction.message.author.avatarURL())
	.addFields(
    { name: `Reason:`, value: `${interaction.values}`, inline: true },
    { name: '\u200B', value: '\u200B' },
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
	//console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	//console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});
client.on("messageCreate", (message) => {
  switch(true) {
    
    case (message.content.startsWith(prefix + "link") && message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && !message.author.bot && message.channel.type !== "dm"): { const linkCmd = require("./modules/linkCmd.js");linkCmd(Discord, client, message, fs, decache, path)}; break;

    case (message.content.startsWith(prefix + "unlink") && message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && !message.author.bot) && message.channel.type !== "dm": {const unlinkCmd = require("./modules/unlinkCmd.js");unlinkCmd(Discord, client, message, fs, decache, path)} break;

    case (message.content.startsWith(prefix + "log") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): {networksList.forEach(net => {net.map(id => {console.log(id)})})} break;

    case (message.content.startsWith(prefix + "purge webhooks") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): console.log(message.guild); break;

    case (message.content.startsWith(prefix + "networksList") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): {console.log(" Networks List :"), console.log(networksList)} break;

    case (message.content.startsWith(prefix + "linkedHooksList") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): {console.log(" Linked Hooks List :"), console.log(linkedHooksList)} break;

    case (message.content.startsWith(prefix + "linkedFilesList") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): {console.log(" Linked Files List :"), console.log(linkedFilesList)} break;

    case (message.content.startsWith(prefix + "unlinkedHooksList") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): {console.log(" Unlinked Hooks List :"), console.log(unlinkedHooksList)} break;

    case (message.content.startsWith(prefix + "unlinkedFiles") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): {console.log(" Unlinkd Files List :"), console.log(unlinkedFilesList)} break;

    case (message.content.startsWith(prefix + "unlinkedFilesList") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): {console.log(" Unlinked ChanIDs List :"), console.log(unlinkedChanIDsList)} break;

    case (message.content.startsWith(prefix + "linkedChanIDsList") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): {console.log(" Linked ChanIDs List :"), console.log(linkedChanIDsList)} break;

    case (message.content.startsWith(prefix + "oldList") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): {console.log(" Old Networks List :"), console.log(oldNetworksList)} break;

    case (message.content .startsWith(prefix + "newList") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): {console.log(" New Network List :"), console.log(newNetworkList)} break;

    case (message.content.startsWith(prefix + "newNetList") && devs.includes(message.author.id) && !message.author.bot && message.channel.type !== "dm"): {console.log(" New Network List :"), console.log(newNetworkList)}; break;

    case (message.content.startsWith(prefix + 'blacklist') && !message.author.bot && mods.includes(message.author.id) && message.channel.type !== "dm"):{

      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      //console.log(args[1]);
      let reason = args.slice(2).join(' '); // arguments should already be defined
      const blackList = require("./functions/blackList.js")
      blackList(Discord, client, message, fs, decache, path, args, reason, db)
    } break;

    case (message.content.startsWith(prefix + 'unblacklist' ) && !message.author.bot && mods.includes(message.author.id) && message.channel.type !== "dm"): {

      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      //console.log(args[1]);
      let reason = args.slice(2).join(' '); // arguments should already be defined
      const unblackList = require("./functions/unblackList.js")
      unblackList(Discord, client, message, fs, decache, path, args, reason)
    } break;



    default:
      
  }


  if ((message.author.bot) || message.content.startsWith(prefix)) return;

  var chanID = message.channel.id;
  //var channel = client.channels.get(chanID); 
  var authorID = client.users.cache.get(message.author.id);
  let avatarURL = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
//console.log(authorID.avatarURL())
  if (authorID.avatarURL() !== null) 
    avatarURL = authorID.avatarURL().split('size=2048').join('size=64');

  let msg = message.content;

  if (message.attachments) message.attachments.forEach(att => {
    if (!message.content) msg = `${att.url}`;
    else if (message.content) msg = `${message.content}\n ${att.url}`;
  })


  // GLOBAL LINK

  // pour chaque liste de la liste des réseaux
  // for each list of the list of networks
  networksList.forEach(list => {
    // si l'ID du salon d'où provient le message n'appartient à aucune liste on arrête ici
    // if the ID of the channel where it comes doesn't come from any of those list, we stop there
  	if (!list.includes(chanID)) return
    // si l'ID du salon d'où provient le message appartient à une liste, alors ...
    // if the ID of the channel where it come does come from any of those list, then..
  	else {
  	  // on vérifie que chaque liste réseau contienne une liste
      // we check that each network list has at least one list
  	   if (Array.isArray(list)) list.forEach(element => {
      	// on exclu l'élément (chanID) d'où provient le message
        // we recomve the element (chanID) where the message comes from
        if (element != chanID) {
          // on lit chaque dossier contenu dans le dossier des réseaux puis...
          // we read each folder inside the folder of networks then...
          fs.readdirSync("./networks/").forEach(network => {
          	// on lit chaque dossier contenu dans le dossier du réseau concerné
            // we read each folder inside the folder of the concerned network
            fs.readdirSync("./networks/" + network + "/").forEach(guildDir => {
              // on exclu le fichier ".keep" (utile pour github) puis on définit chaque fichier contenu dans le dossier de la Guild ()
              // we remove the file ".keep" (useful for github) then we define each files inside the folder inside the folder of the guild
           	  if (guildDir != ".keep") fs.readdirSync("./networks/" + network + "/" + guildDir).forEach(file => {
           	  	// on définit fileName comme étant le nom du fichier sans extension
                // we define 'fileName' as being the name of the file without extension
          		var fileName = file.split(".js").join("")
          		// si le nom du fichier (chanID) est égal à un élément de cette liste
              // if the name of the file (chanID) is equal at one element from this list
                if (fileName == element) {
                  // on définit l'emplacement du fichier du webhook
                  // we define the emplacement of the file of the webhook
                  var wbFile = "./networks/" + network + "/" + guildDir + "/" + element + ".js";
                  // on require le fichier du webhook
                  // we require the file of the webhook
          	      var wb = require(wbFile)
                  // on édite le fichier du webhook
                  // we edit the file of the webhook
                  try {
                    
                  wb.edit({'name': message.author.tag, 'avatar': avatarURL}).catch(err => {
                    if (err) console.log(err)
                  // puis...
                  // then...
                  }).then(wb => {
                  	// si le webhook existe on l'envoie
                    // if the webhook exist, we send it
                    var everyone = false
                    // variable de condition pour savoir si ont peux envoyer le message ou non
                    // condition variable to check if we can send the message or no
                    if(msg.includes("@everyone") || msg.includes("@here")){
                      everyone = true
                    }
                    // si le message contient "@everyone" ou "@here", la condition est vrai
                    // if the message contains "@everyone" or "@here", the condition is true
                    
                        var bannedList = db.get("bans.bans")
                        // ont récupére la ban list de json.sqlite
                        // console.log(bannedList)
                        for(var banned in bannedList){
                          
                          if(message.author.id == bannedList[banned]){
                            everyone = true
                            // si l'ID du membre est dans la ban list, la condition est vrai
                            // if the ID of the member is in the ban list, the condition is true
                          }
                        }
                        /*if(message.type == "REPLY"){
                          const drawImage = require('./functions/drawImage.js')
                          drawImage(Discord, client, message, fs, decache, path, Canvas, MessageAttachment)
                        }*/
                        var splitedMSG = msg.split(' ')
                        // ont récupere le message est ont splite chaque mot dans un array
                        // we take the message and split each words into an array
                        var except = "NSFW"
                        // si le nom du réseau contient 'NSFW' ;)
                        // if the name of the network includes the word 'NSFW' ;)
                        for(var i = 0; i < splitedMSG.length; i++) {
                          if(network.replace(/[0-9]/g, '') !== except){
                            // ont retire les nombres dans le nom du réseau et ont regarde si le nom n'est pas 'NSFW'
                            // we remove the numbers inside the name of the network and check if the name is not 'NSFW'
                          if(wordList.includes(splitedMSG[i].replace(/[&\`+$~%.:*]/g, ''))) {
                            // ont regarde si le mot est dans l'array de mots bannie, tout en enlevant certains caracteres spéciaux
                            // we check if the word is in the array of banned words, while removing certains spiecials caracters
                            everyone = true
                            // si les mot est la, la condition est vrai
                            // if the word is in the array of banned words, the condition is true
                            i = splitedMSG.length
                            // la variable d'indexation est égal a la taille de l'array de "splitedMSG"
                            // the indexation variable is equivalent to the array length of "splitedMSG"

                          }
                        }

                        }
                        
                      
                    
                      if (wb != undefined && !everyone){ 
                        // si le webhook n'est pas indéfinie et que la variable de condition est fausse, ...
                        try {
                          if(message.type == "REPLY"){
                        (async () => {
                          const repliedTo = await message.channel.messages.fetch(message.reference.messageId);
                            
                            
                            msg = '> Replying to ' + message.mentions.repliedUser.username + ': ```' + repliedTo.content + '```\n' + msg
                            wb.send(msg)
                        })();
                      } else {
                        wb.send(msg)
                      }
                        
                        
                        // envoie le message dans tout les salons lié dans le réseau
                        // send the message to all the channels linked in the network
                        } catch(err) {
                          message.channel.send("There was an error with the hook" + element + "\n\n\n" + err)
                        }
                      }
                      else if(everyone){
                        // si la variable de condition est vrai, le message n'est pas envoyé, et un message est envoyé
                        // if the condition variable is true, the message is bot sent to all the channels linked in the network
                        message.channel.send(`Sorry ${message.author.username}, unfortunately, your message is not allowed to be sent or you have been banned.`).then((msg) => {
                          
                          setTimeout(() => msg.delete(), 3000)
                        })
                      }
                    
                    if(wb == undefined){
                      fs.removeSync(wbFile) && console.log(" Le fichier " + wbFile + " a été supprimé car le webhook associé n'existe plus")
                    }
                    // si le webhook n'existe pas on supprime le fichier
                    // if the webhook does not exist, we delete the file
                      
                   
                    
                    
                    
                  })
                }
                catch(err){
                  message.channel.send("There was an error with the hook " + element)
                }

                }

              })

            })

          })
          
        } else { 
          console.log(" " + message.author.tag + " : " + msg)
          // on retourne dans la console le nom d'utilisateur et le message
          // we send in the console the username and the message
        }
  	  })
    }
  })

// END OF LINK CODE  

});

client.login(process.env.TOKEN || config.token);