export type Permission = 'full' | 'limited' | 'custom' | 'games';

export interface Program {
  id: string;
  name: string;
  selected: boolean;
}

export interface Game {
  id: string;
  name: string;
  selected: boolean;
}

export interface Delegation {
  id: string;
  address: string;
  nickname?: string;
  delegateNickname?: string;
  permission: Permission;
  programs: Program[];
  games: Game[];
  customContract?: string;
  additionalDelegates?: { address: string; nickname: string; }[];
  createdAt: Date;
}