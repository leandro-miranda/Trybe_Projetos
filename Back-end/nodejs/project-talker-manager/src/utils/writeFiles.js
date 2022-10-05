const { writeFile } = require('fs').promises;

const writeFiles = async (talker) => {
  await writeFile('./src/talker.json', JSON.stringify(talker));
};

module.exports = writeFiles;
