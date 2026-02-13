# 配置部分 - 请修改为你自己的服务器信息
$ServerUser = "root"
$ServerIP = "your_server_ip"
$ProjectDir = "/var/www/tool-platform" # 服务器上项目存放的路径

# 1. 提交本地代码变更到 Git
Write-Host "正在提交本地代码..." -ForegroundColor Green
git add .
git commit -m "Auto deploy from local script"
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git push 失败，请检查网络或冲突" -ForegroundColor Red
    exit
}

# 2. 远程连接服务器并执行部署脚本
Write-Host "正在连接服务器进行部署..." -ForegroundColor Green
ssh $ServerUser@$ServerIP "cd $ProjectDir && bash deploy.sh"

if ($LASTEXITCODE -eq 0) {
    Write-Host "部署成功！" -ForegroundColor Green
} else {
    Write-Host "部署过程中出现错误" -ForegroundColor Red
}
