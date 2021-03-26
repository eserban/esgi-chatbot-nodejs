#!/bin/bash
echo "Execution de ESLint"
npx eslint *.js
echo "Execution de Prettier"
npx prettier --check server.js
echo "Execution de Typescript"
npx tsc

