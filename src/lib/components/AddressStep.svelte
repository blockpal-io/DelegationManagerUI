<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ArrowLeft, Plus, X } from 'lucide-svelte';
  import { validateSolanaAddress } from '../utils';
  
  interface DelegateEntry {
    address: string;
    nickname: string;
  }

  export let address = '';
  export let delegateNickname = '';
  export let additionalDelegates: DelegateEntry[] = [];
  
  const dispatch = createEventDispatcher();
  let addressError = '';
  
  function handleNext() {
    if (validateSolanaAddress(address)) {
      addressError = '';
      dispatch('next');
    } else {
      addressError = 'Please enter a valid Solana address or .sol name';
    }
  }

  function addDelegate() {
    additionalDelegates = [...additionalDelegates, { address: '', nickname: '' }];
  }

  function removeDelegate(index: number) {
    additionalDelegates = additionalDelegates.filter((_, i) => i !== index);
  }
</script>

<div class="space-y-4">
  <h2 class="text-xl font-semibold text-white">Delegate Address</h2>
  <p class="text-gray-300">Enter the Solana address or .sol name you want to delegate permissions to.</p>
  
  <div class="space-y-4">
    <!-- Primary delegate -->
    <div class="space-y-2">
      <label for="address" class="block text-sm font-medium text-gray-300">
        Primary Delegate Address
      </label>
      <input
        type="text"
        id="address"
        class="w-full bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan/50 transition-all duration-300 {addressError ? 'border-red-500' : ''}"
        placeholder="Enter Solana address or .sol name"
        bind:value={address}
      />
      {#if addressError}
        <p class="text-red-400 text-sm">{addressError}</p>
      {/if}
    </div>

    <div class="space-y-2">
      <label for="delegateNickname" class="block text-sm font-medium text-gray-300">
        Delegate Nickname (Optional)
      </label>
      <input
        type="text"
        id="delegateNickname"
        class="w-full bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan/50 transition-all duration-300"
        placeholder="E.g., John's Wallet, Trading Account"
        bind:value={delegateNickname}
      />
    </div>

    <!-- Additional delegates -->
    {#if additionalDelegates.length > 0}
      <div class="mt-6 space-y-4">
        <h3 class="text-sm font-medium text-gray-300">Additional Delegates</h3>
        {#each additionalDelegates as delegate, i}
          <div class="p-4 bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl space-y-2 relative">
            <button
              class="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-400 rounded-full hover:bg-white/10 transition-colors duration-300"
              on:click={() => removeDelegate(i)}
              title="Remove delegate"
            >
              <X class="w-4 h-4" />
            </button>
            
            <div class="space-y-2">
              <label for="delegateAddress" class="block text-sm font-medium text-gray-300">
                Delegate Address
              </label>
              <input
                id="delegateAddress"
                type="text"
                class="w-full bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan/50 transition-all duration-300"
                placeholder="Enter Solana address or .sol name"
                bind:value={delegate.address}
              />
            </div>

            <div class="space-y-2">
              <label for="delegateNickname" class="block text-sm font-medium text-gray-300">
                Delegate Nickname (Optional)
              </label>
              <input
                id="delegateNickname"
                type="text"
                class="w-full bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan/50 transition-all duration-300"
                placeholder="E.g., John's Wallet, Trading Account"
                bind:value={delegate.nickname}
              />
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <button
      class="flex items-center text-cyan hover:text-cyan/80 text-sm font-medium transition-colors duration-300"
      on:click={addDelegate}
    >
      <Plus class="w-4 h-4 mr-1" />
      Add Another Delegate
    </button>
  </div>
  
  <div class="flex justify-between">
    <button
      class="bg-black/10 text-white px-6 py-2 rounded-xl hover:bg-black/20 transition-all duration-300 backdrop-blur-sm border border-white/10 flex items-center"
      on:click={() => dispatch('back')}
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