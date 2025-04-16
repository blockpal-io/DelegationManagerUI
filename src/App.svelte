<script lang="ts">
<<<<<<< Updated upstream
  import { onMount } from "svelte";
  import {
    availablePrograms,
    availableGames,
    delegations,
    addDelegation,
    updateDelegation,
  } from "./lib/stores";
  import AddressStep from "./lib/components/AddressStep.svelte";
  import NicknameStep from "./lib/components/NicknameStep.svelte";
  import PermissionsStep from "./lib/components/PermissionsStep.svelte";
  import ConfirmStep from "./lib/components/ConfirmStep.svelte";
  import SuccessStep from "./lib/components/SuccessStep.svelte";
  import DelegationList from "./lib/components/DelegationList.svelte";
  import type { Delegation, Permission } from "./types";

  // View state
  let view: "list" | "form" = "list";
  let step = 1;

  // Form data
  let address = "";
  let nickname = "";
  let delegateNickname = "";
  let permission: Permission = "games";
  let customContract = "";
  let additionalDelegates: { address: string; nickname: string }[] = [];

  // Editing state
  let isEditing = false;
  let editingId: string | null = null;

  // Reset form
  function resetForm() {
    address = "";
    nickname = "";
    delegateNickname = "";
    permission = "games";
    customContract = "";
    additionalDelegates = [];
    $availablePrograms = $availablePrograms.map((p) => ({
      ...p,
      selected: false,
    }));
    $availableGames = $availableGames.map((g) => ({ ...g, selected: false }));
    isEditing = false;
    editingId = null;
    step = 1;
  }

  // Start adding new delegation
  function handleAddNew() {
    resetForm();
    view = "form";
  }

  // Edit existing delegation
  function handleEdit(event: CustomEvent) {
    const delegation: Delegation = event.detail.delegation;

    address = delegation.address;
    nickname = delegation.nickname || "";
    delegateNickname = delegation.delegateNickname || "";
    permission = delegation.permission;
    customContract = delegation.customContract || "";
    additionalDelegates = delegation.additionalDelegates || [];

    // Reset programs and set selected ones
    $availablePrograms = $availablePrograms.map((p) => ({
      ...p,
      selected: delegation.programs.some((dp) => dp.id === p.id && dp.selected),
    }));

    // Reset games and set selected ones
    $availableGames = $availableGames.map((g) => ({
      ...g,
      selected:
        delegation.games?.some((dg) => dg.id === g.id && dg.selected) || false,
    }));

    isEditing = true;
    editingId = delegation.id;
    view = "form";
    step = 1;
  }

  // Handle form submission
  function handleConfirm() {
    const selectedPrograms = $availablePrograms.map((p) => ({
      id: p.id,
      name: p.name,
      selected: p.selected,
    }));

    const selectedGames = $availableGames.map((g) => ({
      id: g.id,
      name: g.name,
      selected: g.selected,
    }));

    const delegationData = {
      address,
      nickname: nickname || undefined,
      delegateNickname: delegateNickname || undefined,
      permission,
      programs: selectedPrograms,
      games: selectedGames,
      customContract: permission === "custom" ? customContract : undefined,
      additionalDelegates:
        additionalDelegates.length > 0 ? additionalDelegates : undefined,
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
    view = "list";
    resetForm();
  }

  // Mock data for development
  onMount(() => {
    // Add some sample delegations for demonstration
    if ($delegations.length === 0) {
      addDelegation({
        address: "GgPpTKg78vmzgDtP1DNn7KNNHhQvDTJYxdcxRDQzqwjy",
        nickname: "Trading Bot",
        permission: "limited",
        programs: [
          { id: "1", name: "Raydium", selected: true },
          { id: "2", name: "Serum", selected: true },
          { id: "3", name: "Orca", selected: false },
          { id: "4", name: "Jupiter", selected: true },
          { id: "5", name: "Marinade", selected: false },
          { id: "6", name: "Solend", selected: false },
          { id: "7", name: "Mango Markets", selected: false },
          { id: "8", name: "Drift Protocol", selected: false },
        ],
        games: $availableGames.map((g) => ({ ...g, selected: false })),
      });

      addDelegation({
        address: "wallet.sol",
        nickname: "Mobile Wallet",
        permission: "full",
        programs: $availablePrograms.map((p) => ({ ...p, selected: false })),
        games: $availableGames.map((g) => ({ ...g, selected: false })),
      });
    }
  });
</script>

<main class="max-w-2xl mx-auto p-4 sm:p-6">
  <header class="mb-8 flex flex-col items-center space-y-4">
    <img
      alt="Blockpal Logo"
      class="h-24 w-auto"
      src="./images/blockpal-logo.png"
    />
    <h1 class="text-xl font-medium text-[#00153D]">
      Wallet Delegation Manager
    </h1>
  </header>

  {#if view === "list"}
    <DelegationList on:add={handleAddNew} on:edit={handleEdit} />
  {:else}
    <div class="bg-white border border-gray-200 rounded-lg p-6">
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
=======
  import LandingPage from './lib/components/LandingPage.svelte';
  import DelegationManager from './lib/components/DelegationManager.svelte';
  
  let currentPath = window.location.pathname;

  window.addEventListener('popstate', () => {
    currentPath = window.location.pathname;
  });
</script>

{#if currentPath === '/'}
  <LandingPage />
{:else if currentPath === '/app'}
  <DelegationManager />
{/if}
>>>>>>> Stashed changes
