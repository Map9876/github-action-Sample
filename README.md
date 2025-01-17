# github-action-Sample
github action开发例子

#
https://github.com/copilot/c/2617fe48-d39e-46a5-b2f8-0ee4abff6826

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


#

#### 我不需要docker 我需要的是给我这个github action 项目的源代码 以js形式

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

这个uses，可以使用别的`- uses: actions/checkout@v4`库，如果使用自己仓库，类似于`uses: ./` ，他会去找主目录下
`Error: Can't find 'action.yml', 'action.yaml' or 'Dockerfile' under '/home/runner/work/github-action-Sample/github-action-Sample'. Did you forget to run actions/checkout before running your local action?` 这几个文件 ，比如`action.yml` ，都是action仓库的标准。
https://blog.csdn.net/daddykei/article/details/135456076 。

创建github action 项目

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

```

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
```

# 流程
使用某个github action项目

https://github.com/buiawpkgew1/minecraft-plugin-runtime-test-Guizhan/blob/main/package.json

会去使用他的仓库的action.yml

以下是action.yml的最后一部分

```
    - name: 在 Paper-${{ inputs.server-version }} 上运行测试
      shell: bash
      env: 
        SERVER_VERSION: ${{ inputs.server-version }} 
      run: npm start
```

这里运行的是在他仓库里运行npm start，

运行之后会找package.json，下面是package.json

```
{
  "name": "minecraft-plugin-runtime-test",
  "version": "1.0.0",
  "description": "A github action for testing minecraft plugins on combination of server version",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "FN-FAL113",
  "license": "GPL-3.0-or-later"
}
```
scripts里有start ，所以再运行node index.js，然后去找他仓库主目录里的index.js



Copilot Chat
Using composite runs in GitHub Actions
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
  main: 'index.js' 这个怎么使用runs:
  using: 'composite'
  steps:

    - name: 在 Paper-${{ inputs.server-version }} 上运行测试
      shell: bash
      run: npm install .  这种run: npm install .  的方法https://github.com/buiawpkgew1/minecraft-plugin-runtime-test-Guizhan/blob/main/action.yml
      
      shell:
      bash
      run: npm install .  我是说这个怎么同时使用 runs:
  using: 'node12'
  main: 'index.js'


# action本体 action.yml

```yaml
# action本体 action.yml

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

上面修改为：

```yaml
# action本体 action.yml
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
  using: 'composite'
  steps:
    - name: Install dependencies
      run: |
         cd action
         npm install
      shell: bash

    - name: Run main script
      run: node action/index.js
      shell: bash
      env:
        FILE: ${{ inputs.file }}
        CONTENT: ${{ inputs.content }}
```

Prepare all required actions
2
Run ./action/
6
Run cd action
10
npm notice created a lockfile as package-lock.json. You should commit this file.
11
npm WARN notsup Unsupported engine for undici@5.28.5: wanted: {"node":">=14.0"} (current: {"node":"12.22.12","npm":"6.14.16"})
12
npm WARN notsup Not compatible with your version of node/npm: undici@5.28.5
13
npm WARN notsup Unsupported engine for @fastify/busboy@2.1.1: wanted: {"node":">=14"} (current: {"node":"12.22.12","npm":"6.14.16"})
14
npm WARN notsup Not compatible with your version of node/npm: @fastify/busboy@2.1.1
15
npm WARN movie-action@1.0.0 No repository field.
16
npm WARN movie-action@1.0.0 No license field.
17

18
added 7 packages from 11 contributors and audited 7 packages in 0.827s
19
found 0 vulnerabilities
20

21
Run node action/index.js
27
/home/runner/work/github-action-Sample/github-action-Sample/action/node_modules/undici/lib/handler/RetryHandler.js:29
28
    } = retryOptions ?? {}
29
                      ^
30

31
SyntaxError: Unexpected token '?'
32
    at wrapSafe (internal/modules/cjs/loader.js:915:16)
33
    at Module._compile (internal/modules/cjs/loader.js:963:27)
34
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
35
    at Module.load (internal/modules/cjs/loader.js:863:32)
36
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
37
    at Module.require (internal/modules/cjs/loader.js:887:19)
38
    at require (internal/modules/cjs/helpers.js:74:18)
39
    at Object.<anonymous> (/home/runner/work/github-action-Sample/github-action-Sample/action/node_modules/undici/index.js:18:22)
40
    at Module._compile (internal/modules/cjs/loader.js:999:30)
41
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
42
Error: Process completed with exit code 1.
This step has been truncated due to its large size. Download the full logs from the  menu once the workflow run has completed.
Post Set up Node.js

使用action.yml的run.yml需要node20
