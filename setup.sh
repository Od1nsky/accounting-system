#!/bin/bash

# accounting-system - Setup Script
# Script for project installation and setup

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

check_node() {
    print_header "Checking Node.js installation"

    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        print_success "Node.js is installed: $NODE_VERSION"

        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | tr -d 'v')
        if [ "$MAJOR_VERSION" -lt 18 ]; then
            print_warning "Node.js v18 or higher is recommended. You have $NODE_VERSION"
        fi
    else
        print_error "Node.js is not installed!"
        echo "Please install Node.js from https://nodejs.org/ (v18 or higher recommended)"
        exit 1
    fi

    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm -v)
        print_success "npm is installed: v$NPM_VERSION"
    else
        print_error "npm is not installed!"
        exit 1
    fi
}

install_backend() {
    print_header "Installing Backend Dependencies"

    cd backend

    if [ -d "node_modules" ]; then
        print_warning "node_modules already exists. Reinstalling..."
        rm -rf node_modules
    fi

    npm install

    if [ $? -eq 0 ]; then
        print_success "Backend dependencies installed successfully"
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi

    cd ..
}

install_frontend() {
    print_header "Installing Frontend Dependencies"

    cd frontend

    if [ -d "node_modules" ]; then
        print_warning "node_modules already exists. Reinstalling..."
        rm -rf node_modules
    fi

    npm install

    if [ $? -eq 0 ]; then
        print_success "Frontend dependencies installed successfully"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi

    cd ..
}

setup_env() {
    print_header "Setting up Environment Files"

    if [ ! -f "backend/.env" ]; then
        cp backend/.env.example backend/.env
        print_success "Created backend/.env"
    else
        print_warning "backend/.env already exists, skipping..."
    fi

    if [ ! -f "frontend/.env" ]; then
        cp frontend/.env.example frontend/.env
        print_success "Created frontend/.env"
    else
        print_warning "frontend/.env already exists, skipping..."
    fi
}

setup_directories() {
    print_header "Setting up Directories"

    if [ ! -d "backend/data" ]; then
        mkdir -p backend/data
        print_success "Created backend/data directory"
    else
        print_warning "backend/data directory already exists"
    fi
}

build_project() {
    print_header "Building Project"

    echo "Building backend..."
    cd backend
    npm run build
    cd ..
    print_success "Backend built successfully"
}

run_tests() {
    print_header "Running Tests"

    echo "Running backend tests..."
    cd backend
    npm test || print_warning "Some backend tests failed"
    cd ..
}

show_instructions() {
    print_header "Setup Complete!"

    echo -e "To start the development servers:\n"
    echo -e "${YELLOW}Backend:${NC}"
    echo "  cd backend && npm run dev"
    echo ""
    echo -e "${YELLOW}Frontend:${NC}"
    echo "  cd frontend && npm run dev"
    echo ""
    echo -e "${YELLOW}Or run both in separate terminals:${NC}"
    echo "  Terminal 1: cd backend && npm run dev"
    echo "  Terminal 2: cd frontend && npm run dev"
    echo ""
    echo -e "${BLUE}Backend will run on:${NC} http://localhost:4000"
    echo -e "${BLUE}Frontend will run on:${NC} http://localhost:4001"
    echo ""
}

main() {
    print_header "accounting-system - Setup"

    echo "This script will set up the project for development."
    echo ""

    SKIP_TESTS=false
    SKIP_BUILD=false

    while [[ "$#" -gt 0 ]]; do
        case $1 in
            --skip-tests) SKIP_TESTS=true ;;
            --skip-build) SKIP_BUILD=true ;;
            --help)
                echo "Usage: ./setup.sh [options]"
                echo ""
                echo "Options:"
                echo "  --skip-tests  Skip running tests"
                echo "  --skip-build  Skip building the project"
                echo "  --help        Show this help message"
                exit 0
                ;;
            *) print_warning "Unknown parameter: $1" ;;
        esac
        shift
    done

    check_node
    setup_directories
    setup_env
    install_backend
    install_frontend

    if [ "$SKIP_BUILD" = false ]; then
        build_project
    fi

    if [ "$SKIP_TESTS" = false ]; then
        run_tests
    fi

    show_instructions
}

main "$@"
