<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Plus, Pencil, Trash2, ChevronRight } from 'lucide-svelte';
  import { delegations, deleteDelegation } from '../stores';
  import { formatAddress } from '../utils';
  import type { Delegation } from '../../types';
  
  const dispatch = createEventDispatcher();
  
  function handleAdd() {
    dispatch('add');
  }
  
  function handleEdit(delegation: Delegation) {
    dispatch('edit', { delegation });
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
    <h2 class="text-xl font-semibold">Your Delegations</h2>
    <button
      class="btn btn-primary flex items-center"
      on:click={handleAdd}
    >
      <Plus class="w-4 h-4 mr-2" />
      Add New
    </button>
  </div>
  
  {#if $delegations.length === 0}
    <div class="bg-white border border-gray-200 rounded-lg p-6 text-center">
      <p class="text-gray-500">You don't have any delegations yet.</p>
      <button
        class="btn btn-primary mt-4"
        on:click={handleAdd}
      >
        Add Your First Delegation
      </button>
    </div>
  {:else}
    <div class="space-y-3">
      {#each $delegations as delegation (delegation.id)}
        <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start">
            <div class="space-y-4 flex-grow">
              <div class="flex items-center">
                <h3 class="font-medium">
                  {delegation.nickname || formatAddress(delegation.address)}
                </h3>
                <span class="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                  {getPermissionLabel(delegation.permission)}
                </span>
              </div>

              <div class="space-y-1">
                <p class="text-sm text-gray-500">Delegated to:</p>
                <div class="space-y-1">
                  <p class="text-sm text-gray-700 break-all">
                    {#if delegation.delegateNickname}
                      {delegation.delegateNickname} ({delegation.address})
                    {:else}
                      {delegation.address}
                    {/if}
                  </p>
                  {#each delegation.additionalDelegates || [] as delegate}
                    <p class="text-sm text-gray-700 break-all">
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
                  <p class="text-xs text-gray-500">Allowed Programs:</p>
                  <div class="flex flex-wrap gap-1">
                    {#each delegation.programs.filter(p => p.selected) as program}
                      <span class="program-bubble">
                        {program.name}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}
              
              {#if delegation.permission === 'games' && delegation.games?.filter(g => g.selected).length > 0}
                <div class="space-y-1">
                  <p class="text-xs text-gray-500">Allowed Games:</p>
                  <div class="flex flex-wrap gap-1">
                    {#each delegation.games.filter(g => g.selected) as game}
                      <span class="program-bubble">
                        {game.name}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}
              
              {#if delegation.permission === 'custom' && delegation.customContract}
                <div class="space-y-1">
                  <p class="text-xs text-gray-500">Contract:</p>
                  <p class="text-sm text-gray-700 break-all">{delegation.customContract}</p>
                </div>
              {/if}
            </div>
            
            <div class="flex space-x-2 ml-4">
              <button
                class="p-1.5 text-gray-500 hover:text-solana-purple rounded-md hover:bg-gray-100"
                on:click={() => handleEdit(delegation)}
                title="Edit"
              >
                <Pencil class="w-4 h-4" />
              </button>
              <button
                class="p-1.5 text-gray-500 hover:text-red-600 rounded-md hover:bg-gray-100"
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