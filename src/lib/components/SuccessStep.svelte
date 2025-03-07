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
    <div class="bg-green-100 p-3 rounded-full">
      <Check class="w-8 h-8 text-solana-green" />
    </div>
  </div>
  
  <div>
    <h2 class="text-xl font-semibold">Delegation Active!</h2>
    <p class="text-gray-600 mt-2">
      {isEditing ? 'Your delegation has been updated successfully.' : 'Your delegation has been created successfully.'}
    </p>
  </div>
  
  <div class="flex flex-col space-y-3">
    <button
      class="btn btn-primary"
      on:click={handleDone}
    >
      View All Delegations
    </button>
    
    {#if !isEditing}
      <button
        class="btn btn-secondary"
        on:click={handleAddAnother}
      >
        Add Another Delegation
      </button>
    {/if}
  </div>
</div>