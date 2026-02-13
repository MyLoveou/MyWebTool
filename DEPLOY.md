# 部署指南

本指南将帮助你将项目部署到 Linux 服务器，并实现一键同步更新。

## 前置准备

### 1. 服务器环境准备
登录你的服务器（如阿里云、腾讯云等），执行以下命令安装必要软件：

```bash
# 更新系统
sudo apt-get update

# 安装 Docker
curl -fsSL https://get.docker.com | bash

# 安装 Docker Compose
sudo apt-get install -y docker-compose

# 安装 Git
sudo apt-get install -y git
```

### 2. 代码仓库准备
你需要一个远程 Git 仓库（如 GitHub、Gitee 或 GitLab）。
1. 在代码托管平台上创建一个新仓库。
2. 在本地项目根目录下运行：
   ```bash
   git remote add origin <你的仓库地址>
   # 如果已有 origin，可以使用 git remote set-url origin <你的仓库地址>
   ```

## 首次部署流程

### 1. 将代码推送到远程仓库
在本地 Windows 终端运行：
```bash
git add .
git commit -m "Initial commit for deployment"
git push -u origin main
```

### 2. 在服务器上拉取代码
登录服务器，进入你想要存放项目的目录（例如 `/var/www/`）：
```bash
cd /var/www/
git clone <你的仓库地址> tool-platform
cd tool-platform
```

### 3. 给部署脚本执行权限
在服务器上的项目目录中：
```bash
chmod +x deploy.sh
```

### 4. 首次启动
```bash
./deploy.sh
```
此时 Docker 会开始构建镜像并启动服务。完成后，你可以通过浏览器访问 `http://<服务器IP>:8080` 查看网站。

## 日常一键更新

为了方便后续更新，我为你准备了一个 `local_deploy.ps1` 脚本。

### 1. 配置脚本
打开本地项目中的 `local_deploy.ps1` 文件，修改以下几行：
```powershell
$ServerUser = "root"              # 你的服务器用户名
$ServerIP = "1.2.3.4"             # 你的服务器公网 IP
$ProjectDir = "/var/www/tool-platform" # 你在服务器上 clone 项目的路径
```

### 2. 执行更新
以后每次你修改了代码，只需要在 VS Code 或 PowerShell 中运行：
```powershell
./local_deploy.ps1
```
脚本会自动完成以下工作：
1.  自动提交并推送本地代码到远程仓库。
2.  自动连接服务器。
3.  自动在服务器上拉取最新代码。
4.  自动重新构建并重启服务。

## 注意事项
- **SSH 免密登录**：为了让脚本顺畅运行，建议配置 SSH 免密登录（将本地的 `id_rsa.pub` 内容添加到服务器的 `~/.ssh/authorized_keys` 中），否则每次运行脚本都需要输入服务器密码。
- **数据库持久化**：`docker-compose.yml` 中已经配置了 `db.sqlite3` 的挂载，所以重启服务不会丢失数据。
