const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || '',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "MR MONEYMAN",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "+233539238838",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/926c7a8ad7ff624c144b7.jpg,https://telegra.ph/file/187cfa2365d88ffe98fec.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0lESDVxakUrYXp1VHRMT29SWm9TalN1L2QyVmRmRk9ENkJ5cHl3anNIST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTHdxT2JPWm5lYTRTS0dSK2dKVVRjZk9wRTdrTi9rQ0JJWk1iOXU3MlNTdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHTk5ySGd3UDdLUk5kRE8xWG8zQmhwWGhlK3BBK1RuNkNWYjlOWGFWYUVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxZ2ZPV09HdWRGTXBhdmRzWElZSDFRWm9YMndkUnZiQ0VCR2R3WkY1UHhZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNIKzYvQ29hcldBLzJ2d1RLcDM5U28rK0w1bWJxdVY3SkswOWtucjZybkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjF3K2FrZU5kbFN0dittakZNWmlUUDdqRlFNNWxMNTdOcEdmcmdxRGozUVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0JNbjNsblcwbWl5U3k3cVFrZHlKUzB4c0ZuVWR5eGNDWm9FWWxhZGpuRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZVhMTmZIZCtYSnUyNExtTUg5OUtaeElmd2lCam5mNnJrM1I3cW9ESGRSQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRkZ0F1NENDaWFwckZJNytuVVA1dlRSWWJNWGhJZ0VkclZCRytpWDBoVGZ3WUJ3eGdyL05ITzY2c0tKajN3cG1BUWFLUkV4a2NSU01Valg5dGpVOWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjgsImFkdlNlY3JldEtleSI6Iis3WlZzSGdsSk1UMzVHRlBTZldsejNqN1ptYWkvZjRwK0xnNUpCQ1dEclE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzNTM5MjM4ODM4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBRDZENDYwQTI0NTkyNDczQkE5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjY1NjE2ODN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik9nalZIOXRjUVZDSUJ4Y2JESnd6MUEiLCJwaG9uZUlkIjoiMGRlMjlhYzMtNTkyYi00ZmE4LWEzZjUtMTY4OWRmYzEyYTE5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklCZ08zaXovNnMxQ0hCWHJieWhKVXQvQndTTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmQ096MDBpaWFQYlg2MElUZElybXRwakxQeUE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMlhYVkVNOUUiLCJtZSI6eyJpZCI6IjIzMzUzOTIzODgzODo0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik1SIE1PTkVZTUFOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNSHJncmdIRUlQN3BMY0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJnUm9mSkJJOUFhdkpabHhkS2d6dDNUK29WZmtNNzdmZGl6OGRJcTJ1VjB3PSIsImFjY291bnRTaWduYXR1cmUiOiJsb3BVM1FENnl1RHJZL1c0MURUdVo1ZjZFTnk5YnAxcDZsWmNpOFZjV2c4azl6Sy9HYURYb3l1MVRpZGVhNVkyeVJGcnR5am90b09pa0c0eEJZQkRqQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWDJGMjVVcEk1VWtmbkZIUWtZRGJEMDk2cEphZDBwcVpML0RSQ1RxUlFnVlFQOTBLRGFsSUFGdTU5QlNKSjAvUTFRdmoycTcycEZtci9JMjFva1R3akE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1MzkyMzg4Mzg6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZRWFIeVFTUFFHcnlXWmNYU29NN2QwL3FGWDVETyszM1lzL0hTS3RybGRNIn19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjY1NjE2NzksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRERCIn0=,
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
