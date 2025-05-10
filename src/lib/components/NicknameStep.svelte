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
  <h2 class="text-xl font-semibold text-white">Nickname (Optional)</h2>
  <p class="text-gray-300">Add a nickname to help remember what this wallet will be used for.</p>

  <div class="space-y-2">
    <label for="nickname" class="block text-sm font-medium text-gray-300">
      Nickname (Optional)
    </label>
    <input
      type="text"
      id="nickname"
      class="w-full bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan/50 transition-all duration-300"
      placeholder="E.g., Trading Bot, Mobile Wallet"
      bind:value={nickname}
    />
  </div>

  <div class="flex justify-between">
    <button
      class="bg-black/10 text-white px-6 py-2 rounded-xl hover:bg-black/20 transition-all duration-300 backdrop-blur-sm border border-white/10 flex items-center"
      on:click={handleCancel}
    >
      Cancel
    </button>
    <button
      class="bg-orange text-white px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:bg-orange/90"
      on:click={handleNext}
    >
      Next
    </button>
  </div>
</div>
