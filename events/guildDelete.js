function guildDelete(Discord, client, guild, fs, decache) {

  var guildName = guild.name;
  var guildID = guild.id;
  var unlinkedGuildDir = unlinkedGuildDir + guildID + "/";

  console.log(` ${client.user.tag} vient d'être retiré du serveur ${guildName} (${guildID})`)

  // Si le serveur n'est pas linké
  if (fs.existsSync(unlinkedGuildDir)) {

    fs.readdirSync(unlinkedGuildDir).forEach(file => {
      try {
      fs.removeSync(unlinkedDir + file)
      console.log(" Le fichier " + unlinkedGuildDir + file + ".js" + " vient d'être supprimé")
      } catch (err) {
        console.log(err)
      }
    })

    fs.removeSync(unlinkedGuildDir)
    
  }
  
  // Si le serveur est linké
  networksList.forEach(network => {

    var networkDir = networksDir + network + "/";
    
    fs.readdirSync(networkDir).forEach(dir => {

      if (dir == guildID) {

        var guildDir = guildDir + dir + "/";

        fs.readdirSync(guildDir).forEach(file => {
          try {
          fs.removeSync(guildDir + file)
          console.log(" Le fichier " + guildFile + " vient d'être supprimé")
          } catch(err) {
            console.log(err)
          }
          
        })

      }

    })
    
  })

}

module.exports = guildDelete