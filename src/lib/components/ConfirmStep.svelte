<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ArrowLeft } from 'lucide-svelte';
  import { availablePrograms, availableGames } from '../stores';
  import type { Permission, Program } from '../../types';
  
  export let address = '';
  export let nickname = '';
  export let delegateNickname = '';
  export let permission: Permission = 'limited';
  export let programs: Program[] = [];
  export let customContract = '';
  export let additionalDelegates: { address: string; nickname: string; }[] = [];
  
  const dispatch = createEventDispatcher();
  
  function handleBack() {
    dispatch('back');
  }
  
  function handleConfirm() {
    dispatch('confirm');
  }
  
  $: selectedPrograms = $availablePrograms.filter(p => p.selected).map(p => p.name);
  $: selectedGames = $availableGames.filter(g => g.selected).map(g => g.name);
</script>

<div class="space-y-4">
  <h2 class="text-xl font-semibold">Confirm Delegation</h2>
  <p class="text-gray-600">Review the delegation details before confirming.</p>
  
  <div class="space-y-4 p-4 bg-gray-100 rounded-md">
    <div>
      <p class="text-sm font-medium">Wallet Nickname</p>
      <p class="text-gray-700">{nickname}</p>
    </div>

    <!-- Primary Delegate -->
    <div>
      <p class="text-sm font-medium">Primary Delegate</p>
      <p class="text-gray-700">
        {#if delegateNickname}
          {delegateNickname} ({address})
        {:else}
          {address}
        {/if}
      </p>
    </div>
    
    <!-- Additional Delegates -->
    {#if additionalDelegates.length > 0}
      <div>
        <p class="text-sm font-medium">Additional Delegates</p>
        <div class="mt-1 space-y-2">
          {#each additionalDelegates as delegate}
            <p class="text-gray-700">
              {#if delegate.nickname}
                {delegate.nickname} ({delegate.address})
              {:else}
                {delegate.address}
              {/if}
            </p>
          {/each}
        </div>
      </div>
    {/if}
    
    <div>
      <p class="text-sm font-medium">Permissions</p>
      {#if permission === 'full'}
        <p class="text-gray-700">Full Access</p>
      {:else if permission === 'limited'}
        <p class="text-gray-700">Limited to Programs:</p>
        <ul class="list-disc ml-5 text-gray-700">
          {#each selectedPrograms as program}
            <li>{program}</li>
          {/each}
        </ul>
      {:else if permission === 'games'}
        <p class="text-gray-700">Limited to Games:</p>
        <ul class="list-disc ml-5 text-gray-700">
          {#each selectedGames as game}
            <li>{game}</li>
          {/each}
        </ul>
      {:else if permission === 'custom'}
        <p class="text-gray-700">Custom Contract:</p>
        <p class="text-gray-700 break-all">{customContract}</p>
      {/if}
    </div>
  </div>
  
  <div class="flex justify-between">
    <button
      class="btn btn-secondary flex items-center"
      on:click={handleBack}
    >
      <ArrowLeft class="w-4 h-4 mr-2" />
      Back
    </button>
    <button
      class="btn btn-primary"
      on:click={handleConfirm}
    >
      Confirm
    </button>
  </div>
</div>