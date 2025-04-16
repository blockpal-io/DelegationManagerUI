<script lang="ts">
  import { onMount } from 'svelte';
  import { availablePrograms, availableGames, delegations, addDelegation, updateDelegation } from '../stores';
  import AddressStep from './AddressStep.svelte';
  import NicknameStep from './NicknameStep.svelte';
  import PermissionsStep from './PermissionsStep.svelte';
  import ConfirmStep from './ConfirmStep.svelte';
  import SuccessStep from './SuccessStep.svelte';
  import DelegationList from './DelegationList.svelte';
  import type { Delegation, Permission } from '../../types';
  
  // View state
  let view: 'list' | 'form' = 'list';
  let step = 1;
  
  // Form data
  let address = '';
  let nickname = '';
  let delegateNickname = '';
  let permission: Permission = 'games';
  let customContract = '';
  let additionalDelegates: { address: string; nickname: string; }[] = [];
  
  // Editing state
  let isEditing = false;
  let editingId: string | null = null;
  
  // Reset form
  function resetForm() {
    address = '';
    nickname = '';
    delegateNickname = '';
    permission = 'games';
    customContract = '';
    additionalDelegates = [];
    $availablePrograms = $availablePrograms.map(p => ({ ...p, selected: false }));
    $availableGames = $availableGames.map(g => ({ ...g, selected: false }));
    isEditing = false;
    editingId = null;
    step = 1;
  }
  
  // Start adding new delegation
  function handleAddNew() {
    resetForm();
    view = 'form';
  }
  
  // Edit existing delegation
  function handleEdit(event: CustomEvent) {
    const delegation: Delegation = event.detail.delegation;
    
    address = delegation.address;
    nickname = delegation.nickname || '';
    delegateNickname = delegation.delegateNickname || '';
    permission = delegation.permission;
    customContract = delegation.customContract || '';
    additionalDelegates = delegation.additionalDelegates || [];
    
    // Reset programs and set selected ones
    $availablePrograms = $availablePrograms.map(p => ({
      ...p,
      selected: delegation.programs.some(dp => dp.id === p.id && dp.selected)
    }));

    // Reset games and set selected ones
    $availableGames = $availableGames.map(g => ({
      ...g,
      selected: delegation.games?.some(dg => dg.id === g.id && dg.selected) || false
    }));
    
    isEditing = true;
    editingId = delegation.id;
    view = 'form';
    step = 1;
  }
  
  // Handle form submission
  function handleConfirm() {
    const selectedPrograms = $availablePrograms.map(p => ({
      id: p.id,
      name: p.name,
      selected: p.selected
    }));

    const selectedGames = $availableGames.map(g => ({
      id: g.id,
      name: g.name,
      selected: g.selected
    }));
    
    const delegationData = {
      address,
      nickname: nickname || undefined,
      delegateNickname: delegateNickname || undefined,
      permission,
      programs: selectedPrograms,
      games: selectedGames,
      customContract: permission === 'custom' ? customContract : undefined,
      additionalDelegates: additionalDelegates.length > 0 ? additionalDelegates : undefined,
    };
    
    if (isEditing && editingId) {
      updateDelegation(editingId, delegationData);
    } else {
      addDelegation(delegationData);
    }
    
    step = 5; // Go to success step
  }
  
  // Navigation functions
  function goToStep(newStep: number) {
    step = newStep;
  }
  
  function goToList() {
    view = 'list';
    resetForm();
  }
  
  // Mock data for development
  onMount(() => {
    // Add some sample delegations for demonstration
    if ($delegations.length === 0) {
      addDelegation({
        address: 'GgPpTKg78vmzgDtP1DNn7KNNHhQvDTJYxdcxRDQzqwjy',
        nickname: 'Trading Bot',
        permission: 'limited',
        programs: [
          { id: '1', name: 'Raydium', selected: true },
          { id: '2', name: 'Serum', selected: true },
          { id: '3', name: 'Orca', selected: false },
          { id: '4', name: 'Jupiter', selected: true },
          { id: '5', name: 'Marinade', selected: false },
          { id: '6', name: 'Solend', selected: false },
          { id: '7', name: 'Mango Markets', selected: false },
          { id: '8', name: 'Drift Protocol', selected: false },
        ],
        games: $availableGames.map(g => ({ ...g, selected: false }))
      });
      
      addDelegation({
        address: 'wallet.sol',
        nickname: 'Mobile Wallet',
        permission: 'full',
        programs: $availablePrograms.map(p => ({ ...p, selected: false })),
        games: $availableGames.map(g => ({ ...g, selected: false }))
      });
    }
  });
</script>

<div class="min-h-screen bg-deep-blue text-white relative overflow-hidden">
  <!-- Static Background -->
  <div class="fixed inset-0 bg-deep-blue"></div>
  
  <!-- Modern Hex Grid Overlay with Energy Pulses -->
  <div class="fixed inset-0 pointer-events-none hex-grid">
    {#each Array(15) as _, i}
      <div 
        class="hex-cell"
        style="
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          animation: pulse {2 + Math.random() * 3}s infinite;
          animation-delay: -{Math.random() * 2}s;
          border: 2px solid rgba(0, 156, 221, 0.2);
        "
      >
        <div class="absolute inset-0 bg-cyan/10"></div>
      </div>
    {/each}
  </div>

  <!-- Animated Particles -->
  <div class="fixed inset-0 pointer-events-none" style="z-index: 3;">
    {#each Array(20) as _, i}
      <div 
        class="absolute w-1 h-1 bg-cyan/20 rounded-full animate-float"
        style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {i * 0.5}s;"
      ></div>
    {/each}
  </div>

  <main class="max-w-2xl mx-auto p-4 sm:p-6 relative z-10">
    <header class="mb-8 flex flex-col items-center space-y-4">
      <a href="/" class="group">
        <img
          alt="Blockpal Logo"
          class="h-72 w-auto drop-shadow-[0_0_4px_rgba(0,255,255,0.1)] animate-logo-glow transition-transform duration-300 group-hover:scale-105"
          src="/images/blockpal-logo-new.png"
        />
      </a>
      <h1 class="font-inter font-bold text-5xl text-center text-shadow-lg">Wallet Delegation Manager</h1>
    </header>
    
    {#if view === 'list'}
      <div class="bg-black/10 backdrop-blur-md rounded-xl border border-white/5 p-6">
        <DelegationList 
          on:add={handleAddNew}
          on:edit={handleEdit}
        />
      </div>
    {:else}
      <div class="bg-black/10 backdrop-blur-md rounded-xl border border-white/5 p-6">
        {#if step === 1}
          <NicknameStep 
            bind:nickname
            on:next={() => goToStep(2)}
            on:cancel={goToList}
          />
        {:else if step === 2}
          <AddressStep 
            bind:address
            bind:delegateNickname
            bind:additionalDelegates
            on:back={() => goToStep(1)}
            on:next={() => goToStep(3)}
          />
        {:else if step === 3}
          <PermissionsStep 
            {address}
            {delegateNickname}
            {nickname}
            bind:permission
            bind:customContract
            on:back={() => goToStep(2)}
            on:next={() => goToStep(4)}
          />
        {:else if step === 4}
          <ConfirmStep 
            {address}
            {delegateNickname}
            {nickname}
            {permission}
            {additionalDelegates}
            programs={$availablePrograms}
            {customContract}
            on:back={() => goToStep(3)}
            on:confirm={handleConfirm}
          />
        {:else if step === 5}
          <SuccessStep 
            {isEditing}
            on:done={goToList}
            on:addAnother={() => {
              resetForm();
              goToStep(1);
            }}
          />
        {/if}
      </div>
    {/if}
  </main>
</div>

<style>
  /* Logo glow animation */
  @keyframes logo-glow {
    0%, 100% {
      filter: drop-shadow(0 0 4px rgba(0, 255, 255, 0.1));
    }
    50% {
      filter: drop-shadow(0 0 6px rgba(0, 255, 255, 0.15));
    }
  }

  .animate-logo-glow {
    animation: logo-glow 3s ease-in-out infinite;
  }

  /* Remove the gradient animation */
  .animate-gradient {
    animation: none;
  }

  /* Floating animation for particles */
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(-10px) translateX(5px);
    }
    50% {
      transform: translateY(0) translateX(10px);
    }
    75% {
      transform: translateY(10px) translateX(5px);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  /* Text shadows */
  .text-shadow-lg {
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }

  .hex-cell {
    position: absolute;
    width: 120px;
    height: 120px;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMGwxNy4zMjEgMTB2MjBMMjAgNDBMMi42NzkgMzBWMTBMMjAgMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwOWNkZCIgc3Ryb2tlLXdpZHRoPSIzIi8+PC9zdmc+');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0;
    transform: scale(1);
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0;
      filter: drop-shadow(0 0 0 rgba(0, 156, 221, 0));
      transform: scale(1);
    }
    10%, 25% {
      opacity: 0.7;
      filter: drop-shadow(0 0 30px rgba(0, 156, 221, 0.8));
      transform: scale(1.3);
    }
    35% {
      opacity: 0;
      filter: drop-shadow(0 0 0 rgba(0, 156, 221, 0));
      transform: scale(1);
    }
  }
</style>