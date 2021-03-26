#!/bin/bash
echo "Execution de ESLint"
npx eslint server.js
echo "Execution de Prettier"
npx prettier server.js | diff server.js -
echo "Execution de Typescript"
npx tsc

