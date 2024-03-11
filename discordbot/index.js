const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv/config");
const { OpenAI } = require("openai");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const CHANNELS = ["1216093628703965206"];
const openai = new OpenAI({
  apikey: process.env.OPENAI_API_KEY,
});
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!CHANNELS.includes(message.channelId)) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({
      content: "Generting Short ID for" + url,
    });
  }

  if (message.content.toLowerCase().includes("what is your name")) {
    return message.reply({
      content:
        "My name is Nikki Dagar and I'm working as a software developer. How can I assist you today?",
    });
  }

  if (message.content.toLowerCase().includes("tell me about yourself")) {
    return message.reply({
      content:
        "Sure !! My name is Nikki Dagar and I'm working as a software developer.I've designed this bot to help you to help answer questions and have conversations with users like you. I can provide information on a wide range of topics, offer suggestions, and engage in friendly conversation. Feel free to ask it anything you'd like to know!",
    });
  }

  if (message.content.toLowerCase().includes("what is your favourite color")) {
    return message.reply({
      content: "My Favourite color is black and what is your favourite color",
    });
  }

  await message.channel.sendTyping();

  const sendTypingInterval = setInterval(() => {
    message.channel.sendTyping();
  }, 5000);

  let conversation = [];
  conversation.push({
    role: "system",
    content: "Chat GPT is a friendly chatbot.",
  });

  let prevMessages = await message.channel.messages.fetch({ limit: 10 });
  prevMessages.reverse();

  prevMessages.forEach((msg) => {
    if (msg.author.bot && msg.author.id !== client.user.id) return;
    if (msg.content.startsWith("!")) return;

    const username = msg.author.username
      .replace(/\s+/g, "_")
      .replace(/[^\w\s]/gi, "");

    if (msg.author.id === client.user.id) {
      conversation.push({
        role: "assistant",
        name: username,
        content: msg.content,
      });

      return;
    }

    conversation.push({
      role: "user",
      name: username,
      content: msg.content,
    });
  });

  const response = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    })
    .catch((error) => console.error("OpenAI Error:\n", error));

  clearInterval(sendTypingInterval);

  if (!response) {
    message.reply("I'm having trouble with the OpenAI. Try again in a moment");
    return;
  }

  const responseMessage = response.choices[0].message.content;
  const chunkSizeLimit = 2000;

  for (let i = 0; i < responseMessage.length; i += chunkSizeLimit) {
    const chunk = responseMessage.substring(i, i + chunkSizeLimit);

    await message.reply(chunk);
  }

  // message.reply(response.choices[0].message.content)
  // message.reply({
  //     content: "Hi From Bot",
  // })
});

client.login(
  "MTIxNjA5NDU3MDM1NDQ0MjM2MQ.GGhutM.Vpnmbx-VLy9yUdj4_oz3_Hk9HWnZaGz3JvDRCI"
);

client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  interaction.reply("Pong!!");
});
