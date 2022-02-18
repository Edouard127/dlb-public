function guildCreate(Discord, client, guild, fs, decache) {

  var unlinked_dir = `./unlinked_servers/`;
  var guildName = guild.name;
  var guildID = guild.id;
  var guildDir = unlinked_dir + guildID + "/";

  console.log(` Le serveur ${guildName} (${guildID}) vient de faire entrer ${client.user.tag}`);

  guild.createChannel("shared-chat", { type: "text"}).then(chan => {

    var guildFile = guildDir + chan.id + ".js";
    var fileText = `var Discord = require("discord.js")\n
\/\/hook_${chan.id} = undefined;\n
module.exports = hook`;

    chan.send(`**Discord Shared Chat**`);

    if (!fs.existsSync(guildDir)) {

      fs.mkdir(guildDir)

      fs.createFile(guildFile).then(writeFileSync => {

        fs.writeFileSync(guildFile, fileText)
        console.log(" Le Fichier " + guildFile + " vient d'être généré")

      });
      
    };

  })
  
}

module.exports = guildCreate