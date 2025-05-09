#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Keypair } from '@solana/web3.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.resolve(__dirname, '../demo-keypair.json');

if (fs.existsSync(outputPath)) {
  console.warn('⚠️  demo-keypair.json already exists. Exiting without overwriting.');
  process.exit(1);
}

// Generate a new keypair
const keypair = Keypair.generate();
const keypairArray = Array.from(keypair.secretKey);

fs.writeFileSync(outputPath, JSON.stringify(keypairArray));

console.log('✅ New Solana keypair generated and saved to demo-keypair.json');
console.log('\nTo fund your new wallet, visit:');
console.log('  https://faucet.solana.com/');
console.log(`\nPublic Key: ${keypair.publicKey.toBase58()}`);
console.log('\nPaste your public key into the faucet to receive devnet SOL.');

console.log('Update and FOUNDER_KEY in src/lib/chain.ts to use your new keypair.');
console.log(
  `const FOUNDER_KEYPAIR = Keypair.fromSecretKey(new Uint8Array([${keypair.secretKey.join(',')}]));`
);
