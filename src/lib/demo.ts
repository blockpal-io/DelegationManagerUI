import { Keypair, PublicKey } from '@solana/web3.js';

// TODO: this is completely unsafe and temporary, remove this

// NOTE: you can generate a new keypair with `pnpm run dev:keypair`
export const FOUNDER_KEYPAIR = Keypair.fromSecretKey(
  new Uint8Array([
    46, 175, 171, 80, 10, 56, 8, 51, 134, 187, 240, 181, 151, 4, 207, 15, 98, 175, 249, 229, 74, 5,
    27, 62, 218, 176, 163, 237, 42, 63, 33, 171, 15, 63, 91, 128, 145, 65, 170, 44, 228, 21, 149,
    18, 27, 128, 113, 190, 118, 177, 245, 253, 120, 222, 206, 199, 216, 215, 113, 128, 27, 177, 176,
    133
  ])
);
// NOTE: you can create a new vault with `pnpm run dev:vault`
export const VAULT_PDA = new PublicKey('3Lo83MPkZi6cwBwBW6ysBfb2sv3Mz4Rv8rtfjWQeVkjx');
