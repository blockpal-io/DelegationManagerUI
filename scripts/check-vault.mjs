import { AllowList, Vault, IpfsClient } from '@blockpal/vault-x-sdk';
import { PublicKey, Connection } from '@solana/web3.js';

const SOLANA_RPC_URL = 'https://api.devnet.solana.com';
// Update this with your actual vault PDA as in src/lib/stores.ts
const VAULT_PDA = new PublicKey('3Lo83MPkZi6cwBwBW6ysBfb2sv3Mz4Rv8rtfjWQeVkjx');

const ipfsClient = new IpfsClient({
  apiKey: 'D8fVcXcRuWlnfg8x7X1xXAIIysuoYGLX'
});

async function main() {
  const connection = new Connection(SOLANA_RPC_URL, 'confirmed');
  // Load the vault from the blockchain
  const vault = await Vault.fromAccountAddress(connection, VAULT_PDA);

  console.dir({ vault }, { depth: null });

  if (JSON.stringify(vault.contentHash) === JSON.stringify(Array(32).fill(0))) {
    console.log('Vault has no content hash');
    return;
  }

  // Fetch the allowlist content from IPFS
  const content = await ipfsClient.getContent(vault.contentHash).catch(() => '[]');
  // Parse and pretty-print the allowlist
  const allowList = new AllowList(JSON.parse(content));
  console.log('AllowList from Vault:');
  console.log(JSON.stringify(JSON.parse(allowList.toString()), null, 2));
}

main().catch(console.error);
