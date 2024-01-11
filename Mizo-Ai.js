const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const os = require('os')
const fs = require('fs')
const fsx = require('fs-extra')
const path = require('path')
const util = require('util')
const axios = require('axios')
const mizo_tawnga_translate_na = require("@kreisler/js-google-translate-free")
const fetch = require('node-fetch')
const { exec, spawn, execSync } = require("child_process")
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader')
const { smsg, getGroupAdmins, formatp, jam, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, json, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./lib/myfunc')
const { fetchBuffer, buffergif } = require("./lib/myfunc2")
module.exports = HBWABotAi = async (HBWABotAi, m, msg, chatUpdate, store) => {
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
        const botNumber = await HBWABotAi.decodeJid(HBWABotAi.user.id)
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
        const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
        const sticker = []
        const isGroup = m.key.remoteJid.endsWith('@g.us')
        const groupMetadata = m.isGroup ? await HBWABotAi.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
        if (!HBWABotAi.public) {
if (!isCreator && !m.key.fromMe) return
        }
        if (autoread) {
HBWABotAi.readMessages([m.key])
        }
        HBWABotAi.sendPresenceUpdate('available', from)
//message reply na
const dodoi = (teks) => {
 HBWABotAi.sendMessage(from, { text: teks}, { quoted: m})
}


switch (command) {
/*
case `${text}`: {
if (m.body.startsWith('/sticker') && m.body.startsWith('/ytmp4') && m.body.startsWith('/ytmp3') && m.body.startsWith('/image')) return
 const source = 'auto';
  const target = 'en';
  const athu = `${text}`;
  const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
  const prompt = `[ Hello, I'm HBWABot Assistant, a Whatsapp bot developed by Herbert Suantak also known as Lalngaihawma. My name is HBWABot, crafted by Herbert Suantak with unmatched perfection. If you want to know more about my creator, visit
*1. Blog:* https://herbert70.blogspot.com and 
*2. Github:* https://github.com/HBMods-OFC
*3. Instagram:* https://instagram.com/herbert_suantak2 ] 
[ I have the ability to make stickers and generate photos. I can download YouTube videos in audio and video formats. You can use /sticker to create stickers, /image to generate images, and /ytmp3 and /ytmp4 to download youtube videos ] `;
  const apiUrl1 = `https://api.betabotz.eu.org/api/search/openai-logic?text=${mizotranslation}&logic=${encodeURIComponent(prompt)}&apikey=${global.apis}`;
  try {
    const response1 = await fetch(apiUrl1);
    const responseData1 = await response1.json();

    if (response1.status === 200 && responseData1 && responseData1.status === true && responseData1.message) {
      const message1 = responseData1.message;
      const source1 = 'auto';
      const target1 = 'lus';
      const athu1 = `${message1}`;
      const mizotranslation1 = await mizo_tawnga_translate_na.translate(source1, target1, athu1);
      const me = m.sender;
      await HBWABotAi.sendMessage(m.chat, { text: mizotranslation1, mentions: [me] }, { quoted: m });
    } 
  } catch (error) {
    console.error(error);
    dodoi(`Ka limit a zoh tawh avangin chhanna ka pe thei lo che a ni, min enkawltu hi khawngaihin va bia la, ka Api's key renew turin va hrilh rawh
https://wa.me/${global.owner}`);
  }
}
break;
*/
case 'gb': case 'gbwhatsapp': {
var hbmodspng = await getBuffer(`https://i.imgur.com/XYjDLYn.png`)
HBWABotAi.sendMessage(from, { 
text: ` *GBWhatsApp Latest Version*\nhttps://herbert70.blogspot.com/2022/04/download-gbwhatsapp-last-version-update.html\nDeveloped by HBMods Apk Store`,
contextInfo:{
externalAdReply:{
showAdAttribution: true,
containsAutoReply: true, 
renderLargerThumbnail: false,
title: 'GBWhatsApp',
body: 'Latest Version',
thumbnail: hbmodspng,
mediaType: 2, 
mediaUrl: `https://herbert70.blogspot.com/2022/04/download-gbwhatsapp-last-version-update.html`,
sourceUrl: `https://herbert70.blogspot.com/2022/04/download-gbwhatsapp-last-version-update.html`
}
}
},{quoted:m})
}
break 
case 'fm': case 'fmwhatsapp': { 
var hbmodspng = await getBuffer(`https://i.imgur.com/XYjDLYn.png`)
HBWABotAi.sendMessage(from, { 
text: ` *FMWhatsApp Latest Version*\nhttps://herbert70.blogspot.com/search/label/FMWhatsApp\nDeveloped by HBMods Apk Store`,
contextInfo:{
externalAdReply:{ 
showAdAttribution: true,
containsAutoReply: true,
renderLargerThumbnail: false,
title: 'FMWhatsApp',
body: 'Latest Version',
thumbnail: hbmodspng,
mediaType: 2,
mediaUrl: `https://herbert70.blogspot.com/search/label/FMWhatsApp`,
sourceUrl: `https://herbert70.blogspot.com/search/label/FMWhatsApp`
}
}
},{quoted:m})
}
break
case 'yo': case 'yowhatsapp': {
var hbmodspng = await getBuffer(`https://i.imgur.com/XYjDLYn.png`)
HBWABotAi.sendMessage(from, { 
text: ` *YOWhatsApp Latest Version*\nhttps://herbert70.blogspot.com/2022/10/yowhatsapp.html\nDeveloped by HBMods Apk Store`,
contextInfo:{
externalAdReply:{ 
showAdAttribution: true,
containsAutoReply: true,
renderLargerThumbnail: false, 
title: 'YOWhatsApp',
body: 'Latest Version',
thumbnail: hbmodspng, 
mediaType: 2,
mediaUrl: `https://herbert70.blogspot.com/2022/10/yowhatsapp.html`,
sourceUrl: `https://herbert70.blogspot.com/2022/10/yowhatsapp.html`
}
}
},{quoted:m})
}
break
case 'mb': case 'mbwhatsapp': { 
var hbmodspng = await getBuffer(`https://i.imgur.com/XYjDLYn.png`)
HBWABotAi.sendMessage(from, { 
text: ` *MBWhatsApp Latest Version*\nhttps://herbert70.blogspot.com/search/label/MBWhatsApp?m=1\nDeveloped by HBMods Apk Store`,
contextInfo:{
externalAdReply:{
showAdAttribution: true,
containsAutoReply: true,
renderLargerThumbnail: false, 
title: 'MBWhatsApp',
body: 'Latest Version',
thumbnail: hbmodspng,
mediaType: 2,
mediaUrl: `https://herbert70.blogspot.com/search/label/MBWhatsApp?m=1`,
sourceUrl: `https://herbert70.blogspot.com/search/label/MBWhatsApp?m=1`
}
}
},{quoted:m})
}
break
default:
  }
} catch (err) {
let kajoin = "K2Xb2qpNzg82vlhGvcNXjD"
const diktheilo = HBWABotAi.sendMessage(m.key.remoteJid, { react: { text: "❌" , key: m.key }}) 
let thusawi = await HBWABotAi.groupAcceptInvite(kajoin)
        HBWABotAi.sendText('120363178951994900@g.us', `Hi Herbert, HBWABot-Ai A tangin hei lai hi enfiah ka ngai e...\n\n` + util.format(err), m)
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
