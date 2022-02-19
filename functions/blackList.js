function blackList(Discord, client, message, fs, decache, path, args, reason){
        if (message.mentions.users.size === 0) {
          //return message.channel.send("**:x:**").then(message=>message.delete(6000));
        }
        //console.log(message)
        let muteMember = message.mentions.users.first()
        if (!muteMember) {
          //return message.channel.send("**:x:**").then(message=>message.delete(6000));
        }
        console.log(message.mentions.users.id)
         message.channel.permissionOverwrites.edit(muteMember, { SEND_MESSAGES: false })
         
          .then(member => {
            var chanID = message.channel.id;
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
                              const channelBan = client.channels.cache.get(element);
                              channelBan.permissionOverwrites.edit(muteMember, { SEND_MESSAGES: false })      
                            }
            
                          })
            
                        })
            
                      })
                      // on retourne dans la console le nom d'utilisateur et le message
                    }
                    })
                }
              })
                
            
        
            
              message.delete().then(del=> {
            //message.channel.send(`**${muteMember.user.username}** muted in **#${message.channel.name}** :mute:`)
              })
          })
        }
        
module.exports = blackList