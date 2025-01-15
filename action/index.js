const fs = require('fs');
const core = require('@actions/core');

async function run() {
  try {
    // 获取输入参数
    const file = core.getInput('file');
    const content = core.getInput('content');

    // 将内容写入文件
    fs.writeFileSync(file, content);
    console.log(`Successfully wrote '${content}' to '${file}'`);
  } catch (error) {
    core.setFailed(`Action failed with error ${error}`);
  }
}
