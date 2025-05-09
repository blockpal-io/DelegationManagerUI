import { Connection, Keypair, PublicKey } from '@solana/web3.js';

// TODO: this is completely unsafe and temporary, remove this
// NOTE: you can generate a new keypair with `pnpm run dev:keypair`
export const FOUNDER_KEYPAIR = Keypair.fromSecretKey(
  new Uint8Array([
    52, 20, 222, 228, 238, 155, 50, 217, 225, 127, 210, 170, 26, 13, 28, 88, 243, 232, 105, 97, 78,
    251, 248, 34, 221, 232, 150, 106, 75, 206, 198, 92, 58, 52, 117, 71, 210, 51, 58, 111, 76, 167,
    46, 166, 212, 110, 56, 45, 231, 193, 201, 248, 253, 40, 125, 59, 191, 181, 110, 149, 97, 56, 82,
    76
  ])
);
// NOTE: you can create a new vault with `pnpm run dev:vault`
export const VAULT_PDA = new PublicKey('3Lo83MPkZi6cwBwBW6ysBfb2sv3Mz4Rv8rtfjWQeVkjx');

// TODO: this should also be handled by the wallet, here just for demo purposes
export const SOLANA_RPC_URL = 'https://api.devnet.solana.com';
export const connection = new Connection(SOLANA_RPC_URL);
