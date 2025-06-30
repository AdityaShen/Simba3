#!/bin/bash

clear


echo -e "\033[1;32mStarting Simba...\033[0m"
echo

echo -e "\033[1;33mInstalling dependencies with npm install...\033[0m"
npm install
if [ $? -ne 0 ]; then
    echo -e "\033[1;31mError: npm install failed!\033[0m"
    read -p "Press Enter to exit..."
    exit $?
else
    echo -e "\033[1;32mSuccess: npm install completed!\033[0m"
fi
echo

echo -e "\033[1;33mCleaning previous build artifacts...\033[0m"
npm run clean
if [ $? -ne 0 ]; then
    echo -e "\033[1;31mWarning: npm run clean failed, proceeding anyway...\033[0m"
else
    echo -e "\033[1;32mSuccess: Clean completed!\033[0m"
fi
echo

echo -e "\033[1;33mBuilding project with npm run build...\033[0m"
npm run build
if [ $? -ne 0 ]; then
    echo -e "\033[1;31mError: npm run build failed!\033[0m"
    read -p "Press Enter to exit..."
    exit $?
else
    echo -e "\033[1;32mSuccess: npm run build completed!\033[0m"
fi
echo

echo -e "\033[1;33mRunning npm start...\033[0m"
npm start
if [ $? -ne 0 ]; then
    echo -e "\033[1;31mError: npm start failed!\033[0m"
    read -p "Press Enter to exit..."
    exit $?
else
    echo -e "\033[1;32mSuccess: npm start completed!\033[0m"
fi

echo
echo -e "\033[1;32mAll commands executed successfully!\033[0m"
echo -e "\033[1;33mSimba is now running.\033[0m"
read -p "Press Enter to continue..."
exit 0