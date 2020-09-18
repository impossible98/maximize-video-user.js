const fs = require('fs');
const readline = require('readline');


class Dist {
	constructor() {
		this.data = fs.readFileSync('VERSION', 'utf-8').trim();
	}

	copyFile() {
		if (!fs.existsSync('dist')) {
			fs.mkdirSync('dist');
		}

		fs.copyFileSync('src/main.user.js', 'dist/main.user.js');
	}

	rl() {
		return readline.createInterface({
			input: fs.createReadStream('dist/main.user.js'),
			crlfDelay: Infinity
		});
	}

	main() {
		this.rl().on('line', (line) => {
			if (line.startsWith('// @version     ')) {
				const data2 = fs.readFileSync('dist/main.user.js', 'utf-8').replace(line, line.slice(0, 17) + this.data);
				fs.writeFileSync('dist/main.user.js', data2);
				console.log('\x1b[32mAll has been done.\x1b[0m');
			}
		});
	}
}

function main() {
	const dist = new Dist();
	dist.copyFile();
	dist.main();
}

main()
