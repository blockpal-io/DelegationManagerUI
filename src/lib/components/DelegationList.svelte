<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Plus, Pencil, Trash2 } from 'lucide-svelte';
  import { allowListSynced, delegations, deleteDelegation, commitAllowList } from '../stores';
  import { formatAddress } from '../utils';
  import type { Delegation } from '../../types';
  
  const dispatch = createEventDispatcher();
  
  function handleAdd() {
    dispatch('add');
  }
  
  function handleEdit(delegation: Delegation) {
    dispatch('edit', { delegation });
  }

  function handleAddSampleDelegations() {
    dispatch('addSampleDelegations');
  }
  
  function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this delegation?')) {
      deleteDelegation(id);
    }
  }
  
  function getPermissionLabel(permission: string): string {
    switch (permission) {
      case 'limited': return 'Limited Program Access';
      case 'games': return 'Limited Games Access';
      case 'custom': return 'Custom Contract';
      case 'full': return 'Full Access';
      default: return permission;
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-semibold text-orange">Your Delegations</h2>
    <div class="flex items-center gap-2">
    {#if !$allowListSynced}
    <button
      class="bg-orange text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:bg-orange/90 flex items-center"
      on:click={() => commitAllowList()}
    >
      <Plus class="w-4 h-4 mr-2" />
      Sync Allowlist to Vault
    </button>
    {/if}
    <button
      class="bg-orange text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:bg-orange/90 flex items-center"
      on:click={handleAdd}
    >
      <Plus class="w-4 h-4 mr-2" />
      Add New
    </button>
    </div>
  </div>
  
  {#if $delegations.length === 0}
    <div class="bg-black/30 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
      <p class="text-white">You don't have any delegations yet.</p>
      <button
        class="bg-orange text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:bg-orange/90 mt-4"
        on:click={handleAdd}
      >
        Add Your First Delegation
      </button>
      <button
        class="bg-orange text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:bg-orange/90 mt-4"
        on:click={handleAddSampleDelegations}
      >
        Add Sample Delegations
      </button>
    </div>
  {:else}
    <div class="space-y-3">
      {#each $delegations as delegation (delegation.id)}
        <div class="bg-black/30 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-black/40 transition-all duration-300">
          <div class="flex justify-between items-start">
            <div class="space-y-4 flex-grow">
              <div class="flex items-center">
                <h3 class="font-medium text-white">
                  {delegation.nickname || formatAddress(delegation.address)}
                </h3>
                <span class="ml-2 px-2 py-0.5 text-xs rounded-full bg-bright-blue/40 text-white border border-bright-blue/70">
                  {getPermissionLabel(delegation.permission)}
                </span>
              </div>

              <div class="space-y-1">
                <p class="text-sm text-white">Delegated to:</p>
                <div class="space-y-1">
                  <p class="text-sm text-white break-all">
                    {#if delegation.delegateNickname}
                      {delegation.delegateNickname} ({delegation.address})
                    {:else}
                      {delegation.address}
                    {/if}
                  </p>
                  {#each delegation.additionalDelegates || [] as delegate}
                    <p class="text-sm text-white break-all">
                      {#if delegate.nickname}
                        {delegate.nickname} ({delegate.address})
                      {:else}
                        {delegate.address}
                      {/if}
                    </p>
                  {/each}
                </div>
              </div>
              
              {#if delegation.permission === 'limited' && delegation.programs.filter(p => p.selected).length > 0}
                <div class="space-y-1">
                  <p class="text-xs text-white">Allowed Programs:</p>
                  <div class="flex flex-wrap gap-1">
                    {#each delegation.programs.filter(p => p.selected) as program}
                      <span class="bg-bright-blue/40 text-white px-2 py-1 rounded-lg text-xs border border-bright-blue/70">
                        {program.name}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}
              
              {#if delegation.permission === 'games' && delegation.games?.filter(g => g.selected).length > 0}
                <div class="space-y-1">
                  <p class="text-xs text-white">Allowed Games:</p>
                  <div class="flex flex-wrap gap-1">
                    {#each delegation.games.filter(g => g.selected) as game}
                      <span class="bg-bright-blue/40 text-white px-2 py-1 rounded-lg text-xs border border-bright-blue/70">
                        {game.name}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}
              
              {#if delegation.permission === 'custom' && delegation.customContract}
                <div class="space-y-1">
                  <p class="text-xs text-white">Contract:</p>
                  <p class="text-sm text-white break-all">{delegation.customContract}</p>
                </div>
              {/if}
            </div>
            
            <div class="flex space-x-2 ml-4">
              <button
                class="p-1.5 text-white hover:text-orange rounded-md hover:bg-orange/30 transition-colors duration-300"
                on:click={() => handleEdit(delegation)}
                title="Edit"
              >
                <Pencil class="w-4 h-4" />
              </button>
              <button
                class="p-1.5 text-white hover:text-red-400 rounded-md hover:bg-red-400/30 transition-colors duration-300"
                on:click={() => handleDelete(delegation.id)}
                title="Delete"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>