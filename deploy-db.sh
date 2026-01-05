#!/bin/bash
# Supabase Database Deployment Script

echo "Starting Supabase database deployment..."

# 设置数据库连接参数
PROJECT_URL="postgresql://postgres.rfnrosyfeivcbkimjlwo:GDragon19888.@aws-1-eu-central-1.pooler.supabase.com:6543/postgres"

# 检查是否安装了 psql
if ! command -v psql &> /dev/null; then
    echo "psql is not installed. Please install PostgreSQL client tools."
    exit 1
fi

# 连接到数据库并执行 schema.sql
echo "Deploying database schema..."

# 使用 heredoc 方式传递 SQL 文件内容到 psql
psql "$PROJECT_URL" -f ./supabase/sql/schema.sql

if [ $? -eq 0 ]; then
    echo "Database schema deployed successfully!"
else
    echo "Error deploying database schema."
    exit 1
fi

echo "Deployment completed."