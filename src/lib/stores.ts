import { writable } from 'svelte/store';
import type { Delegation, Program } from '../types';

// Available games
export const availableGames = writable<Program[]>([
  { id: 'g1', name: 'Star Atlas', selected: false },
  { id: 'g2', name: 'Genopets', selected: false },
  { id: 'g3', name: 'Aurory', selected: false },
  { id: 'g4', name: 'Honeyland', selected: false },
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
  { id: '8', name: 'Drift Protocol', selected: false },
]);

// Delegations store
export const delegations = writable<Delegation[]>([]);

// Helper functions
export const addDelegation = (delegation: Omit<Delegation, 'id' | 'createdAt'>) => {
  delegations.update(current => [
    ...current,
    {
      ...delegation,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
  ]);
};

export const updateDelegation = (id: string, delegation: Omit<Delegation, 'id' | 'createdAt'>) => {
  delegations.update(current => 
    current.map(d => d.id === id ? { ...delegation, id, createdAt: d.createdAt } : d)
  );
};

export const deleteDelegation = (id: string) => {
  delegations.update(current => current.filter(d => d.id !== id));
};