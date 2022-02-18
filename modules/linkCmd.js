function linkCmd(Discord, client, message, fs, decache, path) {

  var chanID = message.channel.id;
  var guildID = message.guild.id;
  var linkedGuildPath = linkedDir + guildID + "/";
  var linkedGuildFilePath = linkedDir + guildID + "/" + chanID + ".js";
  var unlinkedGuildPath = unlinkedDir + guildID + "/";
  var unlinkedGuilFilePath = unlinkedDir + guildID + "/" + chanID + ".js";



  if (fs.existsSync(linkedGuildFilePath)) return message.reply(`This channel is already linked, or you already made a request
A single channel cannot be linked more than once.\nIf you wish to unlink or change network, use the following command: **\`!unlink\`** `).then(msg => msg.delete(7000))

  if (!fs.existsSync(unlinkedGuildPath)) fs.mkdir(unlinkedGuildPath)
  if (!fs.existsSync(linkedGuildPath)) fs.mkdir(linkedGuildPath)

  if (!fs.existsSync(linkedGuildFilePath)) fs.createFileSync(linkedGuildFilePath)

    fs.readdir(linkedGuildPath, (err, files) => {
    
    if (!files) return console.log("err 001")
      console.log(files.length)
    var fileCount = 0 
    fileCount = files.length

    if (fileCount >= 10) {

      return message.reply("Maximum of**" + fileCount + "** file authorized by server networks has been achieved")

    } else {

      message.reply("Please select a network :").then(msg => {

    msg.react("1️⃣").then(react0 => msg.react("2️⃣").then(react1 => msg.react("3️⃣").then(react2 => msg.react("🔞"))))
    console.log("Adding reactions")

    client.on("messageReactionAdd", (reaction, user, channel) => {
      console.log("Reaction added")

      if (user.id != client.user.id) { // is not bot user

        if (user.id != message.author.id) { // user react is not the same of user message
          message.channel.send(`**${user}** It's not your responsibility to react`).then(msg => reaction.remove() && msg.delete(30500));

        } else if ((user.id == message.author.id) && (reaction.message.id == msg.id)) {

          if (reaction.emoji.name == "1️⃣"){
            netChoice = "A00"; 
          }
          else if (reaction.emoji.name == "2️⃣"){
            netChoice = "B00";
          } 
          else if (reaction.emoji.name == "3️⃣"){
            netChoice = "C00";
          } 
          else if (reaction.emoji.name ==  "🔞"){
            if(message.channel.nsfw){
              netChoice = "NSFW000"
            }
            else {
              message.channel.send("This channel is not NSFW\nYou will be logged in automatically to the default network.")
              netChoice = "A00" //backup
            }
            
          } 


          if ((msg != undefined)||(msg != null)) //msg.delete();

          console.log("\n network choice : " + netChoice)
          console.log(" maxSlot :" + maxSlot)

          var newGuildFilePath = networksDir + netChoice + "/" + guildID + "/" + chanID + ".js";

          fs.readdir(networksDir + netChoice, (err, files) => {
            console.log(files)
            var fileCount = files.length


            var registerGuildPath = function() {
              
              if (!fs.existsSync(unlinkedGuildPath)) { // il n'y a pas de dossier de configuration portant pour nom l'identifiant de ce serveur dans ./unlinked_servers/

                if (fs.existsSync(linkedGuildPath)) { // un dossier de configuration pour ce serveur existe déjà dans le ./linked_servers/

                  return console.log("TEST")

                }

              } else { // si il y a un dossier de configuration pour ce serveur dans ./unlinked_servers/

                if (!fs.existsSync(linkedGuildFilePath)) fs.createFileSync(linkedGuildFilePath)  // on vérifie qu'aucun fichier ne porte déjà ce nom et on créé un fichier dans le dossier ./linked_servers/

                if (!fs.existsSync(newGuildFilePath)) { // on vérifie qu'aucun fichier ne porte déjà ce nom dans le dossier réseau choisi

                  fs.createFileSync(newGuildFilePath) // on créé un dossier et le fichier de configuration pour notre salon à link

                  if (!fs.existsSync(unlinkedGuilFilePath)) fs.createFileSync(unlinkedGuilFilePath) // on créé un fichier

                  fs.rename(unlinkedGuilFilePath, newGuildFilePath, function (err) {
                    if (err) throw err
                    else {
                      console.log(" Le serveur " + guildID + " a été ajouté au réseau " + netChoice)

                      fs.readdir(unlinkedDir + guildID, (err, files) => { // 
                        var fileCount = files.length;
                        if (fileCount == 0) fs.rmdir(unlinkedDir + guildID) && console.log(" Le dossier " + unlinkedDir + guildID + " est vide, il a été supprimé")
                        else console.log(" Le dossier " + unlinkedDir + guildID + " n'est pas vide, il n'a donc pas pu être supprimé")
                      })
                    }
                  })
                  

                }
              }
            };

            var addGuildToNetworkChoice = function(Discord, client) {

              if (fs.existsSync(newGuildFilePath)) {

                linkedChanIDsList.push(chanID)
                

                var listPushLoaderPath = "./modules/listPushLoader.js";

                const loadPusherList = require("." + listPushLoaderPath)
                loadPusherList(netChoice, chanID)
              }
                  
            };

            var createFileServ = function() {

              message.channel.createWebhook(client.user.tag, default_avatar).then(wb=> {

                var hookID = wb.id;
                var hookToken = wb.token;
                var fileText = `var Discord = require("discord.js")\n
hook_${chanID} = new Discord.WebhookClient({ url: "https://discord.com/api/webhooks/${hookID}/${hookToken}"});\n
module.exports = hook_${chanID}`;

                if (fs.existsSync(newGuildFilePath)) {

                  fs.writeFileSync(newGuildFilePath, fileText)

                  addGuildToNetworkChoice()

                  message.channel.send(`Your channel **#` + message.channel.name + "** has just been signed in** " + netChoice + "**")

                }

                console.log(" ID of channel : " + wb.channelID)

                

              })

            };

            if (fileCount == maxSlot) {
              
              return message.channel.send("The Network **" + netChoice + "** is satured, please re-enter the command **\`!link\`** and chose another network").then(msg => msg.delete(7000))

            } else if (fileCount <= 1) {
              message.channel.send("You are the first on the network **" + netChoice + "**").then(msg => {
                registerGuildPath()
                createFileServ()
                
              })

            } else if ((fileCount <= maxSlot-1) && (fileCount >= 1)) {
              message.channel.send("**"+ fileCount + " server(s)** are currently located on the network **" + netChoice + "**").then(msg => {
                registerGuildPath()
                createFileServ()

              })
            }

          })

        }
      }
    })

  })

    }
  })

  
}

module.exports = linkCmd