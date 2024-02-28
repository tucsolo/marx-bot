const my = /(?<!\w)(my|mine|their|hers|his|your)(?=\s|$|[^\w]|_)/gi;
const mio = /(?<!\w)(mio|tuo|suo|vostro)(?=\s|$|[^\w]|_)/gi;
const mia = /(?<!\w)(mia|tua|sua|vostra)(?=\s|$|[^\w]|_)/gi;
const miei = /(?<!\w)(miei|tuoi|suoi|vostri)(?=\s|$|[^\w]|_)/gi;
const mie = /(?<!\w)(mie|tue|sue|vostre)(?=\s|$|[^\w]|_)/gi;
const nasz = /(?<!\w)(mój|moj|twój|twoj|jej|jego|wasz)(?=\s|$|[^\w]|_)/gi;
const nuestro = /(?<!\w)(vuestro)(?=\s|$|[^\w]|_)/gi;
const nuestros = /(?<!\w)(mis|tus|vuestros)(?=\s|$|[^\w]|_)/gi;
const nuestra = /(?<!\w)(vuestra)(?=\s|$|[^\w]|_)/gi;
const nuestras = /(?<!\w)(vuestras)(?=\s|$|[^\w]|_)/gi;
const unser = /(?<!\w)(mein|dein|sein|ihr|euer)(?=\s|$|[^\w]|_)/gi;
const unsere = /(?<!\w)(meine|deine|seine|ihre|eure|euere)(?=\s|$|[^\w]|_)/gi;
const notre = /(?<!\w)(mon|ton|ta|votre|leur)(?=\s|$|[^\w]|_)/gi;
const nos = /(?<!\w)(mes|tes|ses|vos|leurs)(?=\s|$|[^\w]|_)/gi;

module.exports = {
	marxify: (msg) => {
		// English part
		let nms = msg.replace(my, 'OUR');
		// Italian part
		nms = nms.replace(mio, 'NOSTRO');
		nms = nms.replace(mia, 'NOSTRA');
		nms = nms.replace(miei, 'NOSTRI');
		nms = nms.replace(mie, 'NOSTRE');
		// Polish part
		nms = nms.replace(nasz, 'NASZ');
		//Spanish part
		nms = nms.replace(nuestro, 'NUESTRO');
		nms = nms.replace(nuestros, 'NUESTROS');
		nms = nms.replace(nuestra, 'NUESTRA');
		nms = nms.replace(nuestras, 'NUESTRAS');
		// German part
		nms = nms.replace(unser, 'UNSER');
		nms = nms.replace(unsere, 'UNSERE');
		// French part
		nms = nms.replace(notre, 'NOTRE');
		nms = nms.replace(nos, 'NOS');
		return nms;
	}
}