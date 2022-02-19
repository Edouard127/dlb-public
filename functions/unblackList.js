function unblackList(Discord, client, message, fs, decache, path, args, reason){
    const db = require('quick.db');
    if (message.mentions.users.size === 0) {
      //return message.channel.send("**:x:**").then(message=>message.delete(6000));
    }
    //console.log(message)
    let muteMember = message.mentions.users.first()
    if (!muteMember) {
      //return message.channel.send("**:x:**").then(message=>message.delete(6000));
    }
    if(!db.get("bans")){
        message.channel.send("The database does not exist")
    }
    else {
        db.delete("bans.bans", args[1])
        message.channel.send(`${args[1]} has been unbanned`)
    }
    }
    
module.exports = unblackList