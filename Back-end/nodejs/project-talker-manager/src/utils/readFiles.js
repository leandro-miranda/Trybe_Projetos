const { readFile } = require('fs').promises;

const readFiles = async () => {
  const talker = await readFile('./src/talker.json', 'utf8');
  return JSON.parse(talker);
};

module.exports = readFiles;