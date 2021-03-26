#!/bin/bash
echo "Execution de ESLint\n"
npx eslint server.js
echo "Execution de Prettier\n"
npx prettier server.js | diff server.js -
echo "Execution de Typescript\n"
npx tsc

