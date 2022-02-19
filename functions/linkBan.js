function linkBan(Discord, client, message, fs, decache, path, args){

    console.log(args[0])
    try {
            message.author.send({
              files: [
                `${__dirname}/data/blackList.txt`
              ]
        })
      } catch(err) {
        console.error(err)
      }
}
module.exports = linkBan