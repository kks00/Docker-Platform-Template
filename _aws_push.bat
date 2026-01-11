@echo off
setlocal

REM Ensure AWS_ACCOUNT_ID and AWS_REGION are set
if "%AWS_ACCOUNT_ID%"=="" (
    echo Error: AWS_ACCOUNT_ID is not set.
    exit /b 1
)
if "%AWS_REGION%"=="" (
    echo Error: AWS_REGION is not set.
    exit /b 1
)

echo Logging into AWS ECR...
aws ecr get-login-password --region %AWS_REGION% | docker login --username AWS --password-stdin %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com

echo Building images for production...
docker compose -f docker-compose.yml -f docker-compose.aws.yml build

echo Pushing images to ECR...
docker compose -f docker-compose.yml -f docker-compose.aws.yml push

echo Done!
endlocal
