<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Check } from 'lucide-svelte';

  export let isEditing = false;

  const dispatch = createEventDispatcher();

  function handleDone() {
    dispatch('done');
  }

  function handleAddAnother() {
    dispatch('addAnother');
  }
</script>

<div class="space-y-6 text-center">
  <div class="flex justify-center">
    <div class="bg-green-900/30 p-3 rounded-full backdrop-blur-sm border border-green-800/30">
      <Check class="w-8 h-8 text-green-400" />
    </div>
  </div>

  <div>
    <h2 class="text-xl font-semibold text-white">Delegation Active!</h2>
    <p class="text-gray-300 mt-2">
      {isEditing
        ? 'Your delegation has been updated successfully.'
        : 'Your delegation has been created successfully.'}
    </p>
  </div>

  <div class="flex flex-col space-y-3">
    <button
      class="bg-orange text-white px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:bg-orange/90"
      on:click={handleDone}
    >
      View All Delegations
    </button>

    {#if !isEditing}
      <button
        class="bg-black/10 text-white px-6 py-2 rounded-xl hover:bg-black/20 transition-all duration-300 backdrop-blur-sm border border-white/10"
        on:click={handleAddAnother}
      >
        Add Another Delegation
      </button>
    {/if}
  </div>
</div>
