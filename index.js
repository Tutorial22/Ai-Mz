require('./language')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, default: HBWABotMzConnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode } = require('@whiskeysockets/baileys');
const os = require('os');
const fs = require('fs');
const fsx = require('fs-extra');
const path = require('path');
const util = require('util');
const axios = require('axios');
const fetch = require('node-fetch');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');
const { exec, spawn, execSync } = require("child_process");
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader');
const { smsg, getGroupAdmins, formatp, jam, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, json, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./lib/myfunc');
const { fetchBuffer, buffergif } = require("./lib/myfunc2");
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const chalk = require('chalk');
const FileType = require('file-type');
const PhoneNumber = require('awesome-phonenumber');
const NodeCache = require("node-cache");
const Pino = require("pino");
const readline = require("readline");
const { parsePhoneNumber } = require("libphonenumber-js");
const makeWASocket = require("@whiskeysockets/baileys").default;
const mizo_tawnga_translate_na = require("@kreisler/js-google-translate-free")
const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})
let phoneNumber = "918416093656"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
async function startHBWABotMz() {
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./session`)
    const msgRetryCounterCache = new NodeCache()
    const HBWABotMz = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode,
      mobile: useMobile, 
      browser: ['Chrome (Linux)', '', ''],
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      browser: ['Chrome (Linux)', '', ''],
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)
         return msg?.message || ""
      },
      msgRetryCounterCache, 
      defaultQueryTimeoutMs: undefined, 
   })   
   store.bind(HBWABotMz.ev)
   if (pairingCode && !HBWABotMz.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')
      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +918416093656")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number 😍\nFor example: +918416093656 : `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +918416093656")))
            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number 😍\nFor example: +918416093656 : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }
      setTimeout(async () => {
         let code = await HBWABotMz.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
      }, 3000)
   }
    HBWABotMz.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    HBWABotMz.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = HBWABotMz.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })
    HBWABotMz.getName = (jid, withoutContact = false) => {
        id = HBWABotMz.decodeJid(jid)
        withoutContact = HBWABotMz.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = HBWABotMz.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === HBWABotMz.decodeJid(HBWABotMz.user.id) ?
            HBWABotMz.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    HBWABotMz.public = true
    HBWABotMz.serializeM = (m) => smsg(HBWABotMz, m, store)
HBWABotMz.ev.on("connection.update",async  (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
        	console.log(chalk.magenta(` `))
            console.log(chalk.yellow(`🌿Connected to => ` + JSON.stringify(HBWABotMz.user, null, 2)))
			await delay(1999)
            console.log(chalk.yellow(`\n\n${chalk.bold.blue(`[ HBWABot-Mz Ai ]`)}\n\n`))
            console.log(chalk.cyan(`HBWABot Ai ah ka lo lawm a che`))
        }
        if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            startHBWABotMz()
        }
    })
    HBWABotMz.ev.on('creds.update', saveCreds)
    HBWABotMz.ev.on("messages.upsert",  () => { })

    HBWABotMz.sendText = (jid, text, quoted = '', options) => HBWABotMz.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })
    HBWABotMz.sendTextWithMentions = async (jid, text, quoted, options = {}) => HBWABotMz.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })
    HBWABotMz.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }
        await HBWABotMz.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    HBWABotMz.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }
        await HBWABotMz.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    HBWABotMz.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    HBWABotMz.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }
    }
return startHBWABotMz()
module.exports = HBWABotMz = async (HBWABotMz, m, msg, chatUpdate, store) => {
    try {
        const {
type,
quotedMsg,
mentioned,
now,
fromMe
        } = m
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectdodoi.selectedRowId : (m.mtype == 'templateButtondodoiMessage') ? m.message.templateButtondodoiMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectdodoi.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const full_args = body.replace(command, '').slice(1).trim()
        const pushname = m.pushName || "No Name"
        const botNumber = await HBWABotMz.decodeJid(HBWABotMz.user.id)
        const itsMe = m.sender == botNumber ? true : false
        const sender = m.sender
        const text = q = args.join(" ")
        const from = m.key.remoteJid
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isAudio = (type == 'audioMessage')
        const isText = (type == 'textMessage')
        const isSticker = (type == 'stickerMessage')
//message reply na
const dodoi = (teks) => {
 HBWABotMz.sendMessage(from, { text: teks}, { quoted: m})
}
async function processOpenAiCommand(args, m) {
  try {
    if (m.sender.startsWith('/sticker') || m.sender.startsWith('/image') || m.sender.startsWith('/ytmp3') || m.sender.startsWith('/ytmp4')) {
      return  }
    const source = 'auto';
    const target = 'en';
    const athu = `${q}`;
    const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
    const prompt = `[ Hello, I'm HBWABot Assistant, a Whatsapp bot developed by Herbert Suantak also known as Lalngaihawma. My name is HBWABot, crafted by Herbert Suantak with unmatched perfection. If you want to know more about my creator, visit
*1. Blog:* https://herbert70.blogspot.com and 
*2. Github:* https://github.com/HBMods-OFC
*3. Instagram:* https://instagram.com/herbert_suantak2 ] 
[ I have the ability to make stickers and generate photos. I can download YouTube videos in audio and video formats. You can use /sticker to create stickers, /image to generate images, and /ytmp3 and /ytmp4 to download youtube videos ] `;
const apiUrl1 = `https://api.betabotz.eu.org/api/search/openai-logic?text=${mizotranslation}&logic=${encodeURIComponent(prompt)}&apikey=${apis}`;
    const response1 = await fetch(apiUrl1);
    const responseData1 = await response1.json();
    if (response1.status === 200 && responseData1 && responseData1.status === true && responseData1.message) {
      const message1 = responseData1.message;
      const source1 = 'auto';
      const target1 = 'lus';
      const athu1 = `${message1}`;
      const mizotranslation1 = await mizo_tawnga_translate_na.translate(source1, target1, athu1);
      const me = m.sender;
      await HBWABotMz.sendMessage(from, { text: mizotranslation1, mentions: [me] }, { quoted: m });
    } 
  } catch (error) {
    console.error(error);
    dodoi(`Ka limit a zoh tawh avangin chhanna ka pe thei lo che a ni, min enkawltu hi khawngaihin va bia la, ka Api's key renew turin va hrilh rawh\nhttps://wa.me/${owner}`);
  }
}
if (!HBWABotMz.public) {
if (!isCreator && !m.key.fromMe) return
        }
        if (autoread) {
HBWABotMz.readMessages([m.key])
        }
        HBWABotMz.sendPresenceUpdate('available', from)
switch (command) {
case '/ytmp4': case '/ytvideo': {
const herbertvideo = require('./lib/ytdl2')
if (args.length < 1 || !isUrl(text) || !herbertvideo.isYTUrl(text)) return dodoi(`Video link rawn dah rawh!!\n\n_🤖Kha tiang ringawt loh khan tiang hian type tur_\n*⟨Entirnan :* ${prefix + command} https://youtube.com/watch?v=DA9gCKwaefgs`)
const vid=await herbertvideo.mp4(text)
const ytc=`
╭═══════════┈
┃𒆜┌───┈
┃𒆜│ *Tittle:* ${vid.title}
┃𒆜│ *Date:* ${vid.date}
┃𒆜│ *Duration:* ${vid.duration}
┃𒆜│ *Quality:* ${vid.quality}
┃𒆜└───────────┈ 
╰════════════──┈`
await HBWABotMz.sendMessage(m.chat,{
    video: {url:vid.videoUrl},
    caption: ytc
},{quoted:m})
}
break
default:
  }
} catch (err) {
let kajoin = "K2Xb2qpNzg82vlhGvcNXjD"
const diktheilo = HBWABotMz.sendMessage(m.key.remoteJid, { react: { text: "❌" , key: m.key }}) 
let thusawi = await HBWABotMz.groupAcceptInvite(kajoin)
        HBWABotMz.sendText('120363178951994900@g.us', `Hi Herbert, HBWABot-Ai A tangin hei lai hi enfiah ka ngai e...\n\n` + util.format(err), m)
    }
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("Socket connection timeout")) return
if (e.includes("item-not-found")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})