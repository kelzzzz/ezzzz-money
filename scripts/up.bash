#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$SCRIPT_DIR/../ezzzzmoney-spring-backend"
FRONTEND_DIR="$SCRIPT_DIR/../ezzzzmoney-frontend"

# ====================== Cleanup Function ======================
cleanup() {
    echo -e "\n\033[31m🛑 Stopping all services...\033[0m"
    [ -n "$BACKEND_PID" ] && kill $BACKEND_PID 2>/dev/null
    [ -n "$FRONTEND_PID" ] && { kill $FRONTEND_PID 2>/dev/null; pkill -P $FRONTEND_PID 2>/dev/null; }
    echo -e "\033[32m✅ All services have been stopped.\033[0m"
    exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# ====================== Start Backend ======================
echo -e "\033[32m🚀 Starting Spring Boot backend...\033[0m"
cd "$BACKEND_DIR" || { echo "❌ Backend directory not found!"; exit 1; }

if [ -f ./mvnw ]; then
    ./mvnw spring-boot:run &
else
    mvn spring-boot:run &
fi
BACKEND_PID=$!

# ====================== Start Frontend ======================
echo -e "\033[34m🚀 Starting React frontend...\033[0m"
cd "$FRONTEND_DIR" || { echo "❌ Frontend directory not found!"; exit 1; }

# Automatically check and install dependencies if needed
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.bin/react-scripts" ]; then
    echo "   ⚠️  node_modules not found. Installing dependencies..."
    npm install
    echo "   ✅ Dependencies installed successfully."
fi

npm start &
FRONTEND_PID=$!

# ====================== Final Message ======================
echo -e "\033[33m========================================"
echo "✅ Services started successfully!"
echo "   Frontend → http://localhost:3000"
echo "   Backend  → http://localhost:8080"
echo ""
echo "   Press Ctrl + C to stop all services"
echo "========================================\033[0m"

wait