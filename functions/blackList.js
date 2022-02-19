
function blackList(Discord, client, message, fs, decache, path, args, reason){
    const db = require('quick.db');
    //console.log(args[0]);
    try {
        if(args[1]){
            if(args[1].match(/^[0-9]+$/) != null){
                if(args[1].length == 18){
                    var banUser = 0
                    banUser = args[1]
                    
                    if(!db.get("bans")){
                        db.set("bans", {})
                        db.push("bans.bans", [args[1]])
                    }
                    else {
                        db.push("bans.bans", [args[1]])
                    }
                    //console.log(db.get("bans.bans"))
                    
                    message.reply(`${args[1]} successfully banned`)
                }
                else {
                    message.reply("Invalid ID")
                }
            }
            else {
                message.reply("Please make sure to enter the user ID")
            }
        }
      } catch(err) {
        console.error(err)
      }
}
module.exports = blackList