cd packages/confeta/
npm i && npm run build && npm publish
cd ../..
cd packages/confeta-env/
npm i && npm run build && npm publish
cd ../..
cd packages/onfeta-argv/
npm i && npm run build && npm publish
cd ../..
cd packages/confeta-text/
npm i && npm run build && npm publish
cd ../..
cd packages/confeta-file/
npm i && npm run build && npm publish
cd ../..
cd packages/confeta-etcd/
npm i && npm run build && npm publish
cd ../..

#lerna publish || rm ./packages/confeta/README.md && cp ./packages/confeta/README.md.old ./packages/confeta/README.md && rm ./packages/confeta/README.md.old
