import {
  getHashedNameSync,
  getNameAccountKeySync,
  NameRegistryState
} from '@bonfida/spl-name-service';
import { connection } from './connection';
import { PublicKey } from '@solana/web3.js';

export async function resolveSolDomain(domain: string): Promise<PublicKey | null> {
  const hashedName = getHashedNameSync(domain.replace('.sol', '').replace('@', ''));
  const nameAccountKey = getNameAccountKeySync(hashedName, undefined, undefined);

  try {
    const { registry } = await NameRegistryState.retrieve(connection, nameAccountKey);
    // Resolves the address behind the domain input string
    console.log(`resolved ${domain} to ${registry.owner.toBase58()}`);
    return registry.owner;
  } catch (e) {
    console.error('Name not found or error:', e);
    return null;
  }
}
