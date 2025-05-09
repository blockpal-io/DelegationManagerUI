import {
  getVaultConfigPda,
  VaultConfig,
  createCreateVaultInstruction,
  PROGRAM_ID,
  getVaultPda
} from '@blockpal/vault-x-sdk';
import { Keypair, Connection, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import fs from 'fs';

const SOLANA_RPC_URL = 'https://api.devnet.solana.com';

async function main() {
  const connection = new Connection(SOLANA_RPC_URL, 'confirmed');
  const secret = JSON.parse(fs.readFileSync('demo-keypair.json'));
  const creator = Keypair.fromSecretKey(Uint8Array.from(secret));

  const [vaultConfigPda] = getVaultConfigPda({ programId: PROGRAM_ID });
  const vaultConfig = await VaultConfig.fromAccountAddress(connection, vaultConfigPda);
  const programTreasury = vaultConfig.treasury;

  const createKey = Keypair.generate();
  const [vaultPda] = getVaultPda({
    createKey: createKey.publicKey,
    programId: PROGRAM_ID
  });

  const createVaultIx = createCreateVaultInstruction(
    {
      administrator: creator.publicKey,
      createKey: createKey.publicKey,
      vault: vaultPda,
      vaultConfig: vaultConfigPda,
      treasury: programTreasury
    },
    {
      args: {
        founderThreshold: 1,
        initialFounders: [creator.publicKey]
      }
    }
  );

  const transaction = new Transaction().add(createVaultIx);
  await sendAndConfirmTransaction(connection, transaction, [creator, createKey]);

  console.log('Vault PDA:', vaultPda.toBase58());
  console.log('update src/lib/chain.ts with the new vault PDA:');
  console.log(`const VAULT_PDA = new PublicKey('${vaultPda.toBase58()}');`);
}

main().catch(console.error);
