import { derived, get, writable } from 'svelte/store';
import {
  AllowList,
  createUpdateAllowlistInstruction,
  Vault,
  type AllowListEntry
} from '@blockpal/vault-x-sdk';
import { PublicKey, Transaction } from '@solana/web3.js';
import type { Delegation, Program } from '../types';
import storage from './storage';
import { resolveSolDomain } from './sns';
import { connection } from './connection';
import { VAULT_PDA } from './demo';
import { tick } from 'svelte';
import { ipfsClient } from './ipfs';
import universalWallet from './universalWallet';

// Available games
export const availableGames = writable<Program[]>([
  { id: 'g1', name: 'Star Atlas', selected: false },
  { id: 'g2', name: 'Genopets', selected: false },
  { id: 'g3', name: 'Aurory', selected: false },
  { id: 'g4', name: 'Honeyland', selected: false }
]);

// Available programs
export const availablePrograms = writable<Program[]>([
  { id: '1', name: 'Raydium', selected: false },
  { id: '2', name: 'Serum', selected: false },
  { id: '3', name: 'Orca', selected: false },
  { id: '4', name: 'Jupiter', selected: false },
  { id: '5', name: 'Marinade', selected: false },
  { id: '6', name: 'Solend', selected: false },
  { id: '7', name: 'Mango Markets', selected: false },
  { id: '8', name: 'Drift Protocol', selected: false }
]);

// TODO: this is a temporary solution, LLM generated
const programIds: Record<string, string> = {
  g1: 'CRMf3jADKMkaGQ9R57g7Rj2gExcPEFJV51H47MtvWdsn', // Star Atlas (placeholder)
  g2: 'DCHSWCje4Cx5nRj58ySxVGp1S6mDog3cvzv1g4pDKp4E', // Genopets (placeholder)
  g3: 'H4EHJtvCWbMMP5TKqNVuvybzfd4sx7EcnqcbFdasREEi', // Aurory (placeholder)
  g4: 'AXNPucBSmpcY3irKjjgofzMTRMWWhYsybuN8CJbSog7d', // Honeyland (placeholder)
  1: 'CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW', // Raydium (devnet)
  2: 'DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY', // Serum (devnet)
  3: 'whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc', // Orca (Whirlpool devnet)
  4: 'CVeKUtMryw42gvkK4JtiSwG2y2CUVJbSCTbkYMV6gibi', // Jupiter (placeholder)
  5: 'MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD', // Marinade (devnet)
  6: 'ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx', // Solend (devnet)
  7: 'GenugLtqVzCcG7haJQrri8LZvagfkGwjgrQ4E2nqh4T2', // Mango Markets (placeholder)
  8: 'dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH' // Drift Protocol (devnet)
};

export const delegations = writable<Delegation[]>([]);

export const localAllowListData = derived(
  [delegations],
  ([$delegations], set) => {
    (async () => {
      const allowList = new AllowList();
      for (const d of $delegations) {
        let address: string | PublicKey = d.address;
        // Handle SNS domains and x.com handles
        if (address.endsWith('.sol') || address.startsWith('@')) {
          try {
            const resolved = await resolveSolDomain(address);
            if (!resolved) {
              throw new Error('Failed to resolve sol domain');
            }
            address = resolved;
          } catch (e) {
            throw new Error('Failed to resolve sol domain');
          }
        }

        if (d.permission === 'full') {
          try {
            allowList.add(address, []);
          } catch (e) {
            console.log('Delegation', d);
            console.log('Address', typeof address === 'string' ? address : address.toBase58());
            console.error('Error adding full permission', e);
            throw new Error('Failed to add full permission');
          }
        } else if (d.permission === 'custom') {
          if (!d.customContract) {
            throw new Error('Custom contract is required for custom permission');
          }

          try {
            allowList.add(address, d.customContract);
          } catch (e) {
            console.log('Delegation', d);
            console.log('Address', typeof address === 'string' ? address : address.toBase58());
            console.log('Custom contract', d.customContract);
            console.error('Error adding custom contract', e);
            throw new Error('Failed to add custom contract');
          }
        } else {
          const allowedPrograms = d.programs.map((p) => programIds[p.id]);
          try {
            allowList.add(address, allowedPrograms);
          } catch (e) {
            console.log('Delegation', d);
            console.log('Address', typeof address === 'string' ? address : address.toBase58());
            console.log('Allowed programs', allowedPrograms);
            console.error('Error adding allowed programs', e);
            throw new Error('Failed to add allowed programs');
          }
        }
      }
      set(JSON.parse(allowList.toString()) as AllowListEntry[]);
    })();
  },
  [] as AllowListEntry[] // initial value
);

export const vaultAllowListData = writable<AllowListEntry[]>([]);

export const allowListSynced = derived(
  [localAllowListData, vaultAllowListData],
  ([local, vault]) => JSON.stringify(local) === JSON.stringify(vault)
);

// Helper Functions

const getVault = async () => {
  return await Vault.fromAccountAddress(connection, VAULT_PDA);
};

function getDelegationsStorageKey(vaultPda: PublicKey) {
  return `delegations_${vaultPda.toBase58()}`;
}

async function persistDelegationsToStorage(delegationsArr: Delegation[]) {
  await storage.set(getDelegationsStorageKey(VAULT_PDA), delegationsArr);
}

async function getDelegationsFromStorage() {
  return await storage.get<Delegation[]>(getDelegationsStorageKey(VAULT_PDA));
}

export const addDelegation = async (delegation: Omit<Delegation, 'id' | 'createdAt'>) => {
  delegations.update((current) => {
    const updated = [
      ...current,
      {
        ...delegation,
        id: crypto.randomUUID(),
        createdAt: new Date()
      }
    ];
    persistDelegationsToStorage(updated);
    return updated;
  });
};

export const updateDelegation = (id: string, delegation: Omit<Delegation, 'id' | 'createdAt'>) => {
  delegations.update((current) => {
    const updated = current.map((d) =>
      d.id === id ? { ...delegation, id, createdAt: d.createdAt } : d
    );
    persistDelegationsToStorage(updated);
    return updated;
  });
};

export const deleteDelegation = async (id: string) => {
  delegations.update((current) => {
    const updated = current.filter((d) => d.id !== id);
    persistDelegationsToStorage(updated);
    return updated;
  });
};

export const loadDelegationsFromStorage = async () => {
  const stored = await getDelegationsFromStorage();
  delegations.set(stored ?? []);
};

export const getAllowListFromVault = async (vault?: Vault) => {
  if (!vault) vault = await getVault();
  const content = await ipfsClient
    .getContent(vault.contentHash)
    // if error, return empty array
    .catch(() => '[]');
  // go through AllowList class to make sure it's in the correct order
  const allowList = new AllowList(JSON.parse(content));
  vaultAllowListData.set(JSON.parse(allowList.toString()));
};

export const commitAllowList = async () => {
  const vault = await getVault();
  console.dir({ vault }, { depth: null });
  await getAllowListFromVault(vault);
  // probably needed to make sure the store is updated before checking if it's synced
  await tick();
  // check store if equal, abort if so
  const synced = get(allowListSynced);
  if (synced) {
    console.log('No changes to allowlist');
    return;
  }

  const oldContentHash = vault.contentHash;

  const allowList = new AllowList(get(localAllowListData));

  // upload new allowlist
  let contentHash: number[];
  let { root } = allowList.getUpdateArgs();
  // TODO fix this in SDK => empty root should be Array(32).fill(0)
  if (root[0] === undefined) {
    root = Array(32).fill(0);
    contentHash = root;
  } else {
    // TODO: we shouldn't really expose the IpfsClient at in the SDK
    contentHash = await ipfsClient.uploadContent(allowList.toString());
  }

  const updateAllowlistIx = createUpdateAllowlistInstruction(
    {
      founder: universalWallet.publicKey,
      vault: VAULT_PDA
    },
    {
      args: {
        merkleRoot: root,
        contentHash: contentHash
      }
    }
  );
  try {
    const transaction = new Transaction().add(updateAllowlistIx);
    await universalWallet.signAndSendTransaction(transaction, connection);
    console.log('Allowlist updated');
    await ipfsClient
      .deleteCid(oldContentHash)
      .then(() => console.log('Old allowlist deleted'))
      .catch(() => console.error('Error deleting old allowlist from ipfs'));
  } catch (error) {
    console.error('Error updating allowlist', error);
    throw error;
  }
};

// TODO we dont save "seen" delegations to storage so this won't ever work well
export const loadDelegationsFromVault = async () => {
  // Ensure vault is synced
  await getAllowListFromVault();
  await tick();
  // Get the current vault allowlist
  const vaultEntries = get(vaultAllowListData) as AllowListEntry[];
  // Get local delegations from storage
  const localDelegations = (await getDelegationsFromStorage()) ?? [];

  // Helper: reverse lookup for program and game ids
  const programIdToMeta = Object.entries(programIds).reduce(
    (acc, [id, address]) => {
      acc[address] = id;
      return acc;
    },
    {} as Record<string, string>
  );

  // Get available programs/games (for name mapping)
  let programsList: Program[] = [];
  let gamesList: Program[] = [];
  availablePrograms.subscribe((p) => (programsList = p))();
  availableGames.subscribe((g) => (gamesList = g))();

  // Helper to map allowedList to permission/programs/games/customContract
  function mapAllowedList(allowedList: string[]): {
    permission: string;
    programs: Program[];
    games: Program[];
    customContract?: string;
  } {
    if (!allowedList || allowedList.length === 0) {
      return { permission: 'full', programs: [], games: [] };
    }
    // Check if all are known program addresses
    const allPrograms = allowedList.every(
      (addr) => programIdToMeta[addr] && programIdToMeta[addr].match(/^\d+$/)
    );
    if (allPrograms) {
      const selectedPrograms = programsList.map((p) => ({
        ...p,
        selected: allowedList.includes(programIds[p.id])
      }));
      return { permission: 'limited', programs: selectedPrograms, games: [] };
    }
    // Check if all are known game addresses
    const allGames = allowedList.every(
      (addr) => programIdToMeta[addr] && programIdToMeta[addr].startsWith('g')
    );
    if (allGames) {
      const selectedGames = gamesList.map((g) => ({
        ...g,
        selected: allowedList.includes(programIds[g.id])
      }));
      return { permission: 'games', programs: [], games: selectedGames };
    }
    // If single entry and not a known program/game, treat as custom contract
    if (allowedList.length === 1 && !programIdToMeta[allowedList[0]]) {
      return { permission: 'custom', programs: [], games: [], customContract: allowedList[0] };
    }
    // Fallback: treat as limited, mark what we can
    const selectedPrograms = programsList.map((p) => ({
      ...p,
      selected: allowedList.includes(programIds[p.id])
    }));
    return { permission: 'limited', programs: selectedPrograms, games: [] };
  }

  // Build new delegations array
  const newDelegations = vaultEntries.map(([address, allowedList]) => {
    // Try to find a matching local delegation (by address and allowedList)
    const local = localDelegations.find(
      (d) =>
        d.address === address &&
        ((d.permission === 'full' && (!allowedList || allowedList.length === 0)) ||
          (d.permission === 'custom' && d.customContract === allowedList[0]) ||
          (d.permission === 'limited' &&
            d.programs
              .filter((p) => p.selected)
              .map((p) => programIds[p.id])
              .sort()
              .join(',') === [...allowedList].sort().join(',')))
    );
    const { permission, programs, games, customContract } = mapAllowedList(allowedList as string[]);
    return {
      id: local?.id || crypto.randomUUID(),
      address: address.toString(),
      nickname: local?.nickname,
      delegateNickname: local?.delegateNickname,
      permission: permission as any,
      programs,
      games,
      customContract,
      additionalDelegates: local?.additionalDelegates,
      createdAt: local?.createdAt ? new Date(local.createdAt) : new Date()
    };
  });

  delegations.set(newDelegations);
  // Persist to storage
  persistDelegationsToStorage(newDelegations);
};

// Debug: Log all stores and derived stores whenever they change
delegations.subscribe((value) => {
  console.log('[store] delegations changed:', value);
});
localAllowListData.subscribe((value) => {
  console.log('[derived] localAllowListData changed:', value);
});
vaultAllowListData.subscribe((value) => {
  console.log('[store] vaultAllowListData changed:', value);
});
allowListSynced.subscribe((value) => {
  console.log('[derived] allowListSynced changed:', value);
});
