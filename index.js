// 🌐 KEEP-ALIVE SERVER (untuk UptimeRobot)
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("✅ Selfbot is running and connected!");
});
app.listen(3000, () => {
  console.log("🌐 Keep-alive server aktif di http://localhost:3000");
});

// 🤖 DISCORD SELF-BOT SETUP
const { Client } = require("discord.js-selfbot-v13");
const {
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
} = require("@discordjs/voice");

// 🔐 ENVIRONMENT VARIABLES dari Replit Secrets
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;

const client = new Client();

client.on("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    console.log(`📦 Guild Fetched: ${guild.name}`);

    const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);

    if (!channel) {
      console.error("❌ Channel tidak ditemukan di cache!");
      return;
    }

    console.log(`📢 Channel Fetched: ${channel.name}`);
    console.log(`📺 Channel Type: ${channel.type}`);

    // ✅ Pengecekan diperbarui ke string
    if (channel.type !== "GUILD_VOICE") {
      console.error("❌ Channel bukan tipe GUILD_VOICE (voice biasa)");
      return;
    }

    const connection = joinVoiceChannel({
      channelId: VOICE_CHANNEL_ID,
      guildId: GUILD_ID,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: true,
    });

    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    console.log("🎧 Berhasil join ke voice channel!");
  } catch (error) {
    console.error("❌ Error saat fetch/join:", error);
  }
});

client.login(TOKEN);
