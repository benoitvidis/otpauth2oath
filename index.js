const fs = require('fs');
const path = require('path');
const u = require('url');
const readline = require('readline');
const semver = require('semver');
const { exec } = require('child_process');

if (!semver.satisfies(process.version, '>=12.0.0')) {
  console.log('Sorry, node 12+ only');
  process.exit(1);
}

(async () => {
  const file = process.argv[2] || path.join(__dirname, 'freeotp-backup.txt');
  const data = [];

  let rl = readline.createInterface({
    input: fs.createReadStream(file)
  });

  for await (const line of rl) {
    const url = u.parse(line, true);
    const name = decodeURIComponent(url.pathname.substring(1));
    const { secret, issuer } = url.query;

    data.push({
      name,
      secret,
      issuer
    });
  }
  rl.close();

  let i = 1;
  for (const l of data) {
    console.log(`${`${i++}`.padEnd(4, ' ')}${l.name}\t${l.issuer}`);
  }

  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('? ', i => {
    rl.close();

    const index = Number.parseInt(i.trim(), 10) - 1;
    exec(`oathtool --totp -b ${data[index].secret}`, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        process.exit(err.code);
      }

      console.log(stdout);
      process.exit();
    });
  });


})();