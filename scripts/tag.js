const childProcess = require('child_process');
const fs = require('fs');
const readline = require('readline');


function main() {
	const rl = readline.createInterface({
		input: fs.createReadStream('package.json'),
		crlfDelay: Infinity
	});

	const data = fs.readFileSync('VERSION', 'utf-8').trim();

	rl.on('line', (line) => {
		if (line.startsWith('\t"version": ')) {
			const data2 = fs.readFileSync('package.json', 'utf-8').replace(line, line.slice(0, 13) + data + '",');
			fs.writeFileSync('package.json', data2);
			childProcess.execSync('git add --all');
			childProcess.execSync('git commit -m "fix: update tag v' + data + '"');
			childProcess.execSync('git tag v' + data);
			childProcess.execSync('git push --set-upstream --tag origin');
			childProcess.execSync('git push --all --set-upstream origin');
			console.log('\x1b[32mAll has been done.\x1b[0m');
		}
	});
}

main()
