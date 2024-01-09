const fs = require('fs')
const chalk = require('chalk')
global.autoread = true
global.mizolanguage = true //if you put false the bot can talk to English language 
global.apis = "YybHI6GZ"
global.prefa = ['','!','.','#','&']
global.owner = '+918416093656'
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})