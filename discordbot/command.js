const {REST,Routes} = require("discord.js");

const commands = [
    {
        name: "ping",
        description: "Replies with Pong!",
    },
    {
        name: "create",
        description: "Creates a new short URL",
    },
];

const rest = new REST({ version: '10' }).setToken('MTIxNjA5NDU3MDM1NDQ0MjM2MQ.GGhutM.Vpnmbx-VLy9yUdj4_oz3_Hk9HWnZaGz3JvDRCI');

(async () =>{
    
    try {
        console.log('Started refreshing application (/) commands.');
      
        await rest.put(Routes.applicationCommands("1216094570354442361"), { body: commands });
      
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }

})();
