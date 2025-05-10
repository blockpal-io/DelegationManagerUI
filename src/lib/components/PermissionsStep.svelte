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
    $availablePrograms = $availablePrograms.map((program) =>
      program.id === id ? { ...program, selected: !program.selected } : program
    );
  }

  function toggleGame(id: string) {
    $availableGames = $availableGames.map((game) =>
      game.id === id ? { ...game, selected: !game.selected } : game
    );
  }
</script>

<div class="space-y-4">
  <h2 class="text-xl font-semibold text-white">Set Permissions</h2>
  <p class="text-gray-300">Choose what this delegate can access.</p>

  <div class="p-3 bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl">
    <p class="text-sm font-medium text-gray-300">Delegate Address</p>
    <p class="text-white break-all">{address}</p>
    {#if nickname}
      <p class="text-sm font-medium mt-2 text-gray-300">Nickname</p>
      <p class="text-white">{nickname}</p>
    {/if}
  </div>

  <div class="space-y-4">
    <div class="flex items-start">
      <input
        type="radio"
        id="games"
        name="permission"
        class="mt-1 accent-cyan"
        bind:group={permission}
        value="games"
      />
      <label for="games" class="ml-2 block">
        <span class="font-medium text-white">Limit to Specific Games</span>
        <p class="text-sm text-gray-300">Delegate can only interact with games you select</p>
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
              class="rounded accent-cyan focus:ring-cyan/50"
            />
            <label for={`game-${game.id}`} class="ml-2 text-gray-300">
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
        class="mt-1 accent-cyan"
        bind:group={permission}
        value="limited"
      />
      <label for="limited" class="ml-2 block">
        <span class="font-medium text-white">Limit to Specific Programs</span>
        <p class="text-sm text-gray-300">Delegate can only interact with programs you select</p>
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
              class="rounded accent-cyan focus:ring-cyan/50"
            />
            <label for={`program-${program.id}`} class="ml-2 text-gray-300">
              {program.name}
            </label>
          </div>
        {/each}
        <button
          class="flex items-center text-cyan hover:text-cyan/80 transition-colors duration-300"
        >
          <Plus class="w-4 h-4 mr-1" /> Add More
        </button>
      </div>
    {/if}

    <div class="flex items-start">
      <input
        type="radio"
        id="custom"
        name="permission"
        class="mt-1 accent-cyan"
        bind:group={permission}
        value="custom"
      />
      <label for="custom" class="ml-2 block">
        <span class="font-medium text-white">Custom Contract</span>
        <p class="text-sm text-gray-300">Delegate can only interact with a specific contract</p>
      </label>
    </div>

    {#if permission === 'custom'}
      <div class="ml-6">
        <input
          type="text"
          placeholder="Enter contract ID"
          class="w-full bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan/50 transition-all duration-300"
          bind:value={customContract}
        />
      </div>
    {/if}

    <div class="flex items-start">
      <input
        type="radio"
        id="full"
        name="permission"
        class="mt-1 accent-cyan"
        bind:group={permission}
        value="full"
      />
      <label for="full" class="ml-2 block">
        <span class="font-medium text-white">Full Access</span>
        <p class="text-sm text-gray-300">
          Delegate can interact with any program (not recommended)
        </p>
      </label>
    </div>

    {#if permission === 'full'}
      <div
        class="p-3 bg-yellow-900/30 border border-yellow-800/30 rounded-xl flex items-start backdrop-blur-sm"
      >
        <AlertTriangle class="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
        <p class="text-sm text-yellow-200">
          Warning: Full access gives this delegate complete control over your wallet for all
          applications. Only use this for trusted delegates.
        </p>
      </div>
    {/if}
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
      on:click={handleNext}
    >
      Next
    </button>
  </div>
</div>
