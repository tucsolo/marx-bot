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
			let trigger = ''
			if (simpsonref.toLowerCase().includes('femmin')) trigger += '\nSembra che tu abbia utilizzato la parola con la F, non farlo in quanto può essere sessista.';
			if (simpsonref.toLowerCase().includes(' donna') || simpsonref.toLowerCase().includes(' donne'))  trigger += '\nSembra che tu abbia utilizzato la parola con la D, non farlo in quanto può essere sessista.';
			if (simpsonref.toLowerCase().includes('ragazza') || simpsonref.toLowerCase().includes('ragazze'))  trigger += '\nSembra che tu abbia utilizzato la parola con la R, non farlo in quanto può essere sessista.';
			if (simpsonref.toLowerCase().includes('negro') || simpsonref.toLowerCase().includes('nigg'))  trigger += '\nSembra che tu abbia utilizzato la parola con la N, non farlo in quanto può essere razzista.';
			if (simpsonref.toLowerCase().includes('@matteounitn'))  trigger += '\nSembra che tu abbia menzionato @matteounitn, bravo, fallo perchè si vede che qualcosa non va.';
			if (simpsonref.toLowerCase().includes('snitch'))  trigger += '\nL\'unione sovietica non riconosce le spie, ma solo i collaboratori della giustizia.';
			if (simpsonref.toLowerCase().includes('unitin'))  trigger += '\nNon nominare quei bastardi che ci rubano i voti.';
			if (simpsonref.toLowerCase().includes(' udu'))  trigger += '\nSiamo contenti di essere sempre nei vostri cuori ☀️.';
			let nms = marxify(msg);
			if (nms.localeCompare(msg) != 0)
				ctx.reply(nms + '*' + trigger, Extra.inReplyTo(ctx.message.message_id)); // Inviamo la NOSTRA correzzione
			else if (trigger != '')
				ctx.replyWithMarkdown(trigger, Extra.inReplyTo(ctx.message.message_id))
		} catch (e) { console.log(e) }
	}
});

bot.launch();
