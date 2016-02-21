cd ./packages/confeta/
npm run build && npm run test
cd ./packages/confeta-env/
npm run build && npm run test
cd ./packages/confeta-argv/
npm run build && npm run test
cd ./packages/confeta-file/
npm run build && npm run test

cd ../../
cp ./packages/confeta/README.md ./packages/confeta/README.md.old
cp README.md ./packages/confeta/

lerna publish || rm ./packages/confeta/README.md && cp ./packages/confeta/README.md.old ./packages/confeta/README.md && rm ./packages/confeta/README.md.old
