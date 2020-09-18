const fs = require('fs');
const readline = require('readline');


function main() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question('\x1b[33mPlease input the tag: (eg: 0.0.1)\n>\x1b[0m ', tag => {
		const tags = tag.split('.');

		for (let x in tags) {
			if (isNaN(Number(tags[x])) || tags.length !== 3) {
				console.log('\x1b[31mPlease input the right tag.\x1b[0m');
				process.exit();
			}
		}

		fs.writeFileSync('VERSION', tag + '\n');
		console.log('\x1b[32mAll has been done.\x1b[0m');
		rl.close();
	});
}

main()
