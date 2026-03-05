const mineflayer = require('mineflayer')
const http = require('http')

http.createServer((req,res) => {
    res.write('Bot is alive')
    res.end()
}).listen(8080)

function createBot() {
    const bot = mineflayer.createBot({
        host: 'eu18-free.falixserver.net', // الرابط من صفحة الـ Network عندك
        port: 20965, // البورت الأساسي للسيرفر
        username: 'HookBot', 
        version: '1.21.11' 
    })

    bot.on('login', () => {
        console.log('✅ البوت دخل سيرفر Hookara بنجاح!')
    })

    // حركة بسيطة كل دقيقة لمنع الطرد (Anti-AFK)
    setInterval(() => {
        bot.setControlState('jump', true)
        setTimeout(() => bot.setControlState('jump', false), 500)
    }, 60000)

    bot.on('end', () => {
        console.log('❌ انقطع الاتصال، جاري إعادة المحاولة...')
        setTimeout(createBot, 30000)
    })
}


createBot()
