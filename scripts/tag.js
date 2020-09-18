const childProcess = require('child_process');
const fs = require('fs');
const readline = require('readline');


class Tag {
	constructor() {
		this.data = fs.readFileSync('VERSION', 'utf-8').trim();
	}

	rl() {
		return readline.createInterface({
			input: fs.createReadStream('package.json'),
			crlfDelay: Infinity
		});
	}

	main() {
		this.rl().on('line', (line) => {
			if (line.startsWith('\t"version": ')) {
				const data2 = fs.readFileSync('package.json', 'utf-8').replace(line, line.slice(0, 13) + this.data + '",');
				fs.writeFileSync('package.json', data2);
				childProcess.execSync('git add --all');
				childProcess.execSync('git commit -m "fix: update tag v' + this.data + '"');
				childProcess.execSync('git tag v' + this.data);
				childProcess.execSync('git push --set-upstream --tag origin');
				childProcess.execSync('git push --all --set-upstream origin');
				console.log('\x1b[32mAll has been done.\x1b[0m');
			}
		});
	}

}

function main() {
	const tag = new Tag();
	tag.main();
}

main()
