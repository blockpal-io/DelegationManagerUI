<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ArrowLeft } from 'lucide-svelte';
  
  export let nickname = '';
  
  const dispatch = createEventDispatcher();
  
  function handleCancel() {
    dispatch('cancel');
  }
  
  function handleNext() {
    dispatch('next');
  }
</script>

<div class="space-y-4">
  <h2 class="text-xl font-semibold">Nickname (Optional)</h2>
  <p class="text-gray-600">Add a nickname to help remember what this wallet will be used for.</p>
  
  <div class="space-y-2">
    <label for="nickname" class="block text-sm font-medium text-gray-700">
      Nickname (Optional)
    </label>
    <input
      type="text"
      id="nickname"
      class="input"
      placeholder="E.g., Trading Bot, Mobile Wallet"
      bind:value={nickname}
    />
  </div>
  
  <div class="flex justify-between">
    <button
      class="btn btn-secondary flex items-center"
      on:click={handleCancel}
    >
      Cancel
    </button>
    <button
      class="btn btn-primary"
      on:click={handleNext}
    >
      Next
    </button>
  </div>
</div>