const discord = require("discord.js")
const Enmap = require("enmap")
const fs = require("fs")
const config = require("./BOT.json")
const mysql = require('mysql2/promise');
const data = require("database.json")
const bot = new discord.Client({
    intents:
    [   discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MEMBERS,
        discord.Intents.FLAGS.GUILD_MESSAGES, 
        discord.Intents.FLAGS.GUILD_PRESENCES,
        discord.Intents.FLAGS.DIRECT_MESSAGES,
        discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ]
})
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();

const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
//<-------- Generate Random Code ------------>//
function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }
  
    return randomCode;
  }
    const randomCode = generateRandomCode(6);

bot.on("ready", ()=>{
    console.log("Ready")
})

bot.on("guildCreate", (guild)=>{
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
    if (channel) {
        channel.send('Hi :D');
    }
})
//<---------- Message Logging ------->//
bot.on("messageCreate", async message =>{
    const db = mysql.createPool({
        host: data.host,
        user: data.user,
        password: data.passwort,
        database: data.database_message
    })
    let query = `INSERT INTO ${database_message} (code, Username, Date, Message) VALUES (${randomCode}, ${user} || ${user.id}, ${formattedTime}, ${message})`
    db.query(query);

})
//<---------- Ban Logging ----------->//
bot.on("guildBanAdd", (guild, user)=>{
    const db = mysql.createPool({
        host: data.host,
        user: data.user,
        password: data.passwort,
        database: data.database_ban
    })
    const reason = banEntry.reason || 'No Reason';

    const query = `INSERT INTO ${database_ban} (hex, username, time, reason) VALUES (${randomCode},${user} || ${user.id},${formattedTime}, ${reason})`
    db.query(query);
})
//<---------- unban Logging ----------->//
bot.on("guildBanRemove", (guild, user)=>{
    const db = mysql.createPool({
        host: data.host,
        user: data.user,
        password: data.passwort,
        database: data.database_ban
    })

    const query = `DELETE FROM ${database_ban} WHERE username = ${user}`
    db.query(query);
})
bot.login(config.token)