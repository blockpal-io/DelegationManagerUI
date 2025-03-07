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
  <h2 class="text-xl font-semibold">Delegate Address</h2>
  <p class="text-gray-600">Enter the Solana address or .sol name you want to delegate permissions to.</p>
  
  <div class="space-y-4">
    <!-- Primary delegate -->
    <div class="space-y-2">
      <label for="address" class="block text-sm font-medium text-gray-700">
        Primary Delegate Address
      </label>
      <input
        type="text"
        id="address"
        class="input {addressError ? 'border-red-500' : ''}"
        placeholder="Enter Solana address or .sol name"
        bind:value={address}
      />
      {#if addressError}
        <p class="text-red-500 text-sm">{addressError}</p>
      {/if}
    </div>

    <div class="space-y-2">
      <label for="delegateNickname" class="block text-sm font-medium text-gray-700">
        Delegate Nickname (Optional)
      </label>
      <input
        type="text"
        id="delegateNickname"
        class="input"
        placeholder="E.g., John's Wallet, Trading Account"
        bind:value={delegateNickname}
      />
    </div>

    <!-- Additional delegates -->
    {#if additionalDelegates.length > 0}
      <div class="mt-6 space-y-4">
        <h3 class="text-sm font-medium text-gray-700">Additional Delegates</h3>
        {#each additionalDelegates as delegate, i}
          <div class="p-4 bg-gray-50 rounded-lg space-y-2 relative">
            <button
              class="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-white"
              on:click={() => removeDelegate(i)}
              title="Remove delegate"
            >
              <X class="w-4 h-4" />
            </button>
            
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Delegate Address
              </label>
              <input
                type="text"
                class="input"
                placeholder="Enter Solana address or .sol name"
                bind:value={delegate.address}
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Delegate Nickname (Optional)
              </label>
              <input
                type="text"
                class="input"
                placeholder="E.g., John's Wallet, Trading Account"
                bind:value={delegate.nickname}
              />
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <button
      class="flex items-center text-solana-purple hover:text-purple-800 text-sm font-medium"
      on:click={addDelegate}
    >
      <Plus class="w-4 h-4 mr-1" />
      Add Another Delegate
    </button>
  </div>
  
  <div class="flex justify-between">
    <button
      class="btn btn-secondary flex items-center"
      on:click={() => dispatch('back')}
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