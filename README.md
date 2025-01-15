# github-action-Sample
github action开发例子

#

GPT 4o

Copilot Chat
Creating a GitHub Action to write to a file

jobs:
  build:
    runs-on: ubuntu-22.04

    steps:
    - uses: actions/checkout@v4
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    - name: Build
      uses: myname/movie
      with:
        file: ok.txt
        context: mv
        
myname/movie创建这个github action，实现文件ok.txt写入内容mv

To create a GitHub Action that writes content to a file ok.txt and uses Docker to build the action, you can follow these steps:

Create a new GitHub repository (or use an existing one).
Add a workflow file in the .github/workflows directory, for example, build.yml.
Create a custom GitHub Action that writes to ok.txt and sets up the Docker build.
Here is an example setup:

Workflow File: .github/workflows/build.yml

```yaml
name: Build and Write to File

on: [push]

jobs:
  build:
    runs-on: ubuntu-22.04

    steps:
    - uses: actions/checkout@v4
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    - name: Build and Write to File
      uses: myname/movie@v1
      with:
        file: ok.txt
        context: mv
```

        
Custom GitHub Action: action.yml
Create an action.yml file in the root of your repository.

```yaml
name: 'Movie Action'
description: 'Writes content to a file using Docker'
inputs:
  file:
    description: 'The file to write to'
    required: true
  context:
    description: 'The content to write to the file'
    required: true
runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
    - ${{ inputs.file }}
    - ${{ inputs.context }}
```


Create a Dockerfile in the root of your repository.
Dockerfile

```dockerfile
FROM ubuntu:22.04

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
```


Entrypoint Script: entrypoint.sh
Create an entrypoint.sh script in the root of your repository.

```bash
#!/bin/sh -l

FILE=$1
CONTENT=$2

echo "$CONTENT" > "$FILE"
echo "Successfully wrote '$CONTENT' to '$FILE'"
Directory Structure
Your repository should look like this:

```code
.
├── .github
│   └── workflows
│       └── build.yml
├── action.yml
├── Dockerfile
└── entrypoint.sh
```

Explanation:
Workflow File (build.yml): This defines the GitHub Actions workflow, specifying the steps to check out the repository code, set up Docker Buildx, and run the custom action.
Custom GitHub Action (action.yml): This defines the action's metadata, inputs, and how it runs using Docker.
Dockerfile: This sets up the Docker environment for the action.
Entrypoint Script (entrypoint.sh): This is the script that runs inside the Docker container, which writes the specified content to the specified file.
This setup will create a custom GitHub Action that writes the content mv to the file ok.txt and builds it using Docker.


# 我不需要docker 我需要的是给我这个github action 项目的源代码 以js形式

好的，我明白了。以下是使用 JavaScript 编写的 GitHub Action 项目的源代码，该代码将创建一个名为 ok.txt 的文件，并将内容 mv 写入其中。

1. 创建 GitHub Action 工作流文件
首先，在你的仓库中创建一个工作流文件 .github/workflows/build.yml：

```yaml
name: Build and Write to File

on: [push]

jobs:
  build:
    runs-on: ubuntu-22.04

    steps:
    - uses: actions/checkout@v4
    - name: Write to File
      uses: ./  # 使用当前仓库中的自定义 Action
      with:
        file: ok.txt
        content: mv
```
        
2. 创建自定义 GitHub Action
在你的仓库根目录下，创建一个目录比如 action，然后在该目录下创建以下文件。
action.yml

```
name: 'Movie Action'
description: 'Writes content to a file'
inputs:
  file:
    description: 'The file to write to'
    required: true
  content:
    description: 'The content to write to the file'
    required: true
runs:
  using: 'node12'
  main: 'index.js'
```


index.js

```JavaScript
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

run();
```


package.json
```JSON
{
  "name": "movie-action",
  "version": "1.0.0",
  "description": "A GitHub Action to write content to a file",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "@actions/core": "^1.10.0"
  }
}


3. 安装依赖
在创建 package.json 文件后，运行 npm install 来安装依赖：

npm install

目录结构
你的仓库目录结构应如下所示：

```
.
├── .github
│   └── workflows
│       └── build.yml
├── action
│   ├── action.yml
│   ├── index.js
│   └── package.json
├── ok.txt
