#!/bin/bash

tar czf tic-tac-react.tar.gz public src package.json package-lock.json server.js 
scp tic-tac-react.tar.gz andre@pega:~
rm tic-tac-react.tar.gz

ssh pega << 'ENDSSH'
mkdir tic-tac-react
tar xf tic-tac-react.tar.gz -C tic-tac-react
rm tic-tac-react.tar.gz
cd tic-tac-react
npm install
npm run build
ENDSSH