// Create a Discord Bot using 0penAI API that interacts on the Discord Server
require ('dotenv').config();


// Prepare to connect to the Discord API
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

// Prepare connection to OpenA工 API
const { Configuration , OpenAIApi } = require ('openai');

const configuration = new Configuration({
    organization: process.env.local.OPENAI_ORG,
    apiKey: process.env.local.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

// Check for when a message on discord is sent
client.on('messageCreate', async function(message){
try {
  //Don;t respond to yourself or other bots
    if(message.author.bot) return;

    // Echo
    //   console.log(message.content);
    //   message.reply(`You said: ${message.content}`);

    const gptResponse = await openai.createCompletion({
        model: "davinci",
        prompt:`chatGPT is a friendly chatbot . \n\
ChatGPT: Hello,how are you? \n\
${message.author.username}: ${message.content}\n\
chatGPT:`,
        temperature: 0.9,
        max_tokens: 100,
        stop: ["chatGPT: ","Adrian Twarog:"],
        })

        message.reply(`${gptResponse.data.choices[0].text}`);
        return;
}catch(err){
    console.log(error)
}
});

// Log the bot into Discord
client.login(process.env.DISCORD_TOKEN);
console.log ("chatGPT Bot is online on Discord")
