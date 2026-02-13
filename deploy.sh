#!/bin/bash

# 停止旧容器
echo "Stopping old containers..."
docker-compose down

# 拉取最新代码
echo "Pulling latest code..."
git pull origin main

# 重新构建并启动容器
echo "Building and starting new containers..."
docker-compose up -d --build

# 清理未使用的镜像（可选，防止磁盘占满）
echo "Cleaning up unused images..."
docker image prune -f

echo "Deployment finished successfully!"
