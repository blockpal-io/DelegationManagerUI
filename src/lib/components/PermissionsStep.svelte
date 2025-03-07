<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ArrowLeft, Plus, AlertTriangle } from 'lucide-svelte';
  import { availablePrograms, availableGames } from '../stores';
  import type { Permission, Program } from '../../types';
  
  export let address = '';
  export let nickname = '';
  export let permission: Permission = 'games';
  export let customContract = '';
  
  const dispatch = createEventDispatcher();
  
  function handleBack() {
    dispatch('back');
  }
  
  function handleNext() {
    dispatch('next');
  }
  
  function toggleProgram(id: string) {
    $availablePrograms = $availablePrograms.map(program => 
      program.id === id ? { ...program, selected: !program.selected } : program
    );
  }

  function toggleGame(id: string) {
    $availableGames = $availableGames.map(game => 
      game.id === id ? { ...game, selected: !game.selected } : game
    );
  }
</script>

<div class="space-y-4">
  <h2 class="text-xl font-semibold">Set Permissions</h2>
  <p class="text-gray-600">Choose what this delegate can access.</p>
  
  <div class="p-3 bg-gray-100 rounded-md">
    <p class="text-sm font-medium">Delegate Address</p>
    <p class="text-gray-700 break-all">{address}</p>
    {#if nickname}
      <p class="text-sm font-medium mt-2">Nickname</p>
      <p class="text-gray-700">{nickname}</p>
    {/if}
  </div>
  
  <div class="space-y-4">
    <div class="flex items-start">
      <input
        type="radio"
        id="games"
        name="permission"
        class="mt-1"
        bind:group={permission}
        value="games"
      />
      <label for="games" class="ml-2 block">
        <span class="font-medium">Limit to Specific Games</span>
        <p class="text-sm text-gray-600">Delegate can only interact with games you select</p>
      </label>
    </div>
    
    {#if permission === 'games'}
      <div class="ml-6 space-y-2">
        {#each $availableGames as game (game.id)}
          <div class="flex items-center">
            <input
              type="checkbox"
              id={`game-${game.id}`}
              checked={game.selected}
              on:change={() => toggleGame(game.id)}
              class="rounded text-solana-purple focus:ring-solana-purple"
            />
            <label for={`game-${game.id}`} class="ml-2 text-gray-700">
              {game.name}
            </label>
          </div>
        {/each}
      </div>
    {/if}

    <div class="flex items-start">
      <input
        type="radio"
        id="limited"
        name="permission"
        class="mt-1"
        bind:group={permission}
        value="limited"
      />
      <label for="limited" class="ml-2 block">
        <span class="font-medium">Limit to Specific Programs</span>
        <p class="text-sm text-gray-600">Delegate can only interact with programs you select</p>
      </label>
    </div>
    
    {#if permission === 'limited'}
      <div class="ml-6 space-y-2">
        {#each $availablePrograms as program (program.id)}
          <div class="flex items-center">
            <input
              type="checkbox"
              id={`program-${program.id}`}
              checked={program.selected}
              on:change={() => toggleProgram(program.id)}
              class="rounded text-solana-purple focus:ring-solana-purple"
            />
            <label for={`program-${program.id}`} class="ml-2 text-gray-700">
              {program.name}
            </label>
          </div>
        {/each}
        <button class="flex items-center text-solana-purple hover:text-purple-800">
          <Plus class="w-4 h-4 mr-1" /> Add More
        </button>
      </div>
    {/if}
    
    <div class="flex items-start">
      <input
        type="radio"
        id="custom"
        name="permission"
        class="mt-1"
        bind:group={permission}
        value="custom"
      />
      <label for="custom" class="ml-2 block">
        <span class="font-medium">Custom Contract</span>
        <p class="text-sm text-gray-600">Delegate can only interact with a specific contract</p>
      </label>
    </div>
    
    {#if permission === 'custom'}
      <div class="ml-6">
        <input
          type="text"
          placeholder="Enter contract ID"
          class="input"
          bind:value={customContract}
        />
      </div>
    {/if}
    
    <div class="flex items-start">
      <input
        type="radio"
        id="full"
        name="permission"
        class="mt-1"
        bind:group={permission}
        value="full"
      />
      <label for="full" class="ml-2 block">
        <span class="font-medium">Full Access</span>
        <p class="text-sm text-gray-600">Delegate can interact with any program (not recommended)</p>
      </label>
    </div>
    
    {#if permission === 'full'}
      <div class="p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
        <AlertTriangle class="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
        <p class="text-sm text-yellow-700">
          Warning: Full access gives this delegate complete control over your wallet for all applications.
          Only use this for trusted delegates.
        </p>
      </div>
    {/if}
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
      on:click={handleNext}
    >
      Next
    </button>
  </div>
</div>