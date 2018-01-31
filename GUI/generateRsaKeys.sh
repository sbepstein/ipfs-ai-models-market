mkdir -p ./keys
openssl genrsa -out ./keys/privkey.pem 2048
openssl rsa -in ./keys/privkey.pem -pubout -out ./keys/pubkey.pem
