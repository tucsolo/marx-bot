const { Telegraf, Extra } = require('telegraf');
const rateLimit = require('telegraf-ratelimit');
const bot = new Telegraf(process.env.token);
const { marxify } = require('./communism');

// Record last time WE sent a message as correction
let lastTime = Date.now();
// Set an average of 10 messages per hour
//  converted to messages per millisecond
const messageRate = 10 / (60 * 60 * 1000);

bot.use(rateLimit({
	window: 60 * 60 * 1000,
	limit: 10,
	onLimitExceeded: (ctx, next) => {
		try {
			let timeNow = Date.now();
			let sinceLast = timeNow - lastTime;
			let probOfThisMessage = 1 - Math.exp(-messageRate * sinceLast);
			if (Math.random() <= probOfThisMessage) {
				lastTime = timeNow;
				next();
			} else if (sinceLast < 10000) {
				let msg = ctx.message.text || ctx.message.caption;
				if (msg) {
					let nms = marxify(msg);
					if (nms.localeCompare(msg) != 0)
						ctx.reply('State sprecando il NOSTRO tempo, abbiamo anche altro da fare oltre che correggere messaggi.');
				}
			}
		}catch(e){ console.log(e)}
	}
}));

bot.start((ctx) => ctx.reply('Mi fa piacere essere qui kompagni.'));

bot.on(['message', 'video', 'photo'], (ctx) => {
	let msg = ctx.message.text || ctx.message.caption;
	if (msg) {
		try {
			let simpsonref = msg.replace(/ /gi, '');
			if (simpsonref.toLowerCase().includes('unionesovietica?manonsieradisciolta?')) ctx.reply('Si, è questo che volevamo farvi credere *preme bottone*');
			if (simpsonref.toLowerCase().includes('femmin')) ctx.replyWithMarkdown('Sembra che tu abbia utilizzato la parola con la F, non farlo in quanto può essere sessista.', Extra.inReplyTo(ctx.message.message_id));
			if (simpsonref.toLowerCase().includes('donna') || simpsonref.toLowerCase().includes('donne')) ctx.reply('Sembra che tu abbia utilizzato la parola con la D, non farlo in quanto può essere sessista.', Extra.inReplyTo(ctx.message.message_id));
			if (simpsonref.toLowerCase().includes('ragazza') || simpsonref.toLowerCase().includes('ragazze')) ctx.reply('Sembra che tu abbia utilizzato la parola con la R, non farlo in quanto può essere sessista.', Extra.inReplyTo(ctx.message.message_id));
			if (simpsonref.toLowerCase().includes('negro') || simpsonref.toLowerCase().includes('nigg')) ctx.reply('Sembra che tu abbia utilizzato la parola con la N, non farlo in quanto può essere razzista.', Extra.inReplyTo(ctx.message.message_id));
			if (simpsonref.toLowerCase().includes('@matteounitn')) ctx.reply('Sembra che tu abbia menzionato @matteounitn, bravo, fallo perchè si vede che qualcosa non va.', Extra.inReplyTo(ctx.message.message_id));
			if (simpsonref.toLowerCase().includes('snitch')) ctx.reply('L\'unione sovietica non riconosce le spie, ma solo i collaboratori della giustizia.', Extra.inReplyTo(ctx.message.message_id));
			let nms = marxify(msg);
			if (nms.localeCompare(msg) != 0)
				ctx.reply(nms + '*', Extra.inReplyTo(ctx.message.message_id)); // Inviamo la NOSTRA correzzione
		} catch (e) { console.log(e) }
	}
});

bot.launch();
