import { Connection } from '@solana/web3.js';

export const SOLANA_RPC_URL = 'https://api.devnet.solana.com';
export const connection = new Connection(SOLANA_RPC_URL);
