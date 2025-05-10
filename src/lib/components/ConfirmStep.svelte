<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ArrowLeft } from 'lucide-svelte';
  import { availablePrograms, availableGames } from '../stores';
  import type { Permission } from '../../types';

  export let address = '';
  export let nickname = '';
  export let delegateNickname = '';
  export let permission: Permission = 'limited';
  export let customContract = '';
  export let additionalDelegates: { address: string; nickname: string }[] = [];

  const dispatch = createEventDispatcher();

  function handleBack() {
    dispatch('back');
  }

  function handleConfirm() {
    dispatch('confirm');
  }

  $: selectedPrograms = $availablePrograms.filter((p) => p.selected).map((p) => p.name);
  $: selectedGames = $availableGames.filter((g) => g.selected).map((g) => g.name);
</script>

<div class="space-y-4">
  <h2 class="text-xl font-semibold text-white">Confirm Delegation</h2>
  <p class="text-gray-300">Review the delegation details before confirming.</p>

  <div class="space-y-4 p-4 bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl">
    <div>
      <p class="text-sm font-medium text-gray-300">Wallet Nickname</p>
      <p class="text-white">{nickname}</p>
    </div>

    <!-- Primary Delegate -->
    <div>
      <p class="text-sm font-medium text-gray-300">Primary Delegate</p>
      <p class="text-white">
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
        <p class="text-sm font-medium text-gray-300">Additional Delegates</p>
        <div class="mt-1 space-y-2">
          {#each additionalDelegates as delegate}
            <p class="text-white">
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
      <p class="text-sm font-medium text-gray-300">Permissions</p>
      {#if permission === 'full'}
        <p class="text-white">Full Access</p>
      {:else if permission === 'limited'}
        <p class="text-white">Limited to Programs:</p>
        <ul class="list-disc ml-5 text-white">
          {#each selectedPrograms as program}
            <li>{program}</li>
          {/each}
        </ul>
      {:else if permission === 'games'}
        <p class="text-white">Limited to Games:</p>
        <ul class="list-disc ml-5 text-white">
          {#each selectedGames as game}
            <li>{game}</li>
          {/each}
        </ul>
      {:else if permission === 'custom'}
        <p class="text-white">Custom Contract:</p>
        <p class="text-white break-all">{customContract}</p>
      {/if}
    </div>
  </div>

  <div class="flex justify-between">
    <button
      class="bg-black/10 text-white px-6 py-2 rounded-xl hover:bg-black/20 transition-all duration-300 backdrop-blur-sm border border-white/10 flex items-center"
      on:click={handleBack}
    >
      <ArrowLeft class="w-4 h-4 mr-2" />
      Back
    </button>
    <button
      class="bg-orange text-white px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:bg-orange/90"
      on:click={handleConfirm}
    >
      Confirm
    </button>
  </div>
</div>
