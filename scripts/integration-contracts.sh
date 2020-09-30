account_key=0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7

# Deploy document store to 0x63A223E025256790E88778a01f480eBA77731D04
./node_modules/@govtechsg/open-attestation-cli/dist/cjs/index.js deploy document-store "My Document Store" -n local -k $account_key

# Deploy token registry to 0x9Eb613a88534E2939518f4ffBFE65F5969b491FF
./node_modules/@govtechsg/open-attestation-cli/dist/cjs/index.js deploy token-registry "My Token Registry" MTR -n local -k $account_key

# Deploy title escrow creator to 0x4Bf7E4777a8D1b6EdD5F2d9b8582e2817F0B0953
./node_modules/@govtechsg/open-attestation-cli/dist/cjs/index.js deploy title-escrow-creator "test" -n local -k $account_key

# Deploy title escrow to 0xfE442b75786c67E1e7a7146DAeD8943F0f2c23d2 (for transfer holder)
./node_modules/@govtechsg/open-attestation-cli/dist/cjs/index.js deploy title-escrow -b 0xe0A71284EF59483795053266CB796B65E48B5124 -h 0xe0A71284EF59483795053266CB796B65E48B5124 -r 0x9Eb613a88534E2939518f4ffBFE65F5969b491FF -c 0x4Bf7E4777a8D1b6EdD5F2d9b8582e2817F0B0953 -n local -k $account_key

# Issue document  (for transfer holder)
./node_modules/@govtechsg/open-attestation-cli/dist/cjs/index.js token-registry issue -a 0x9Eb613a88534E2939518f4ffBFE65F5969b491FF --tokenId 0x3c4b6dada4856e82f9c1e931079f261311c72ef6092c51a4ab1dc1085c46b380 --to 0xfE442b75786c67E1e7a7146DAeD8943F0f2c23d2 -n local -k $account_key

# Deploy title escrow to 0x547Ca63C8fB3Ccb856DEb7040D327dBfe4e7d20F (for surrender)
./node_modules/@govtechsg/open-attestation-cli/dist/cjs/index.js deploy title-escrow -b 0xe0A71284EF59483795053266CB796B65E48B5124 -h 0xe0A71284EF59483795053266CB796B65E48B5124 -r 0x9Eb613a88534E2939518f4ffBFE65F5969b491FF -c 0x4Bf7E4777a8D1b6EdD5F2d9b8582e2817F0B0953 -n local -k $account_key

# Issue document (for surrender)
./node_modules/@govtechsg/open-attestation-cli/dist/cjs/index.js token-registry issue -a 0x9Eb613a88534E2939518f4ffBFE65F5969b491FF --tokenId 0x877a638bdd8d09f415efc2ce1fc1adc41e979e50739145939f0be2a478a340b9 --to 0x547Ca63C8fB3Ccb856DEb7040D327dBfe4e7d20F -n local -k $account_key
