<script lang="ts">
  import LandingPage from './lib/components/LandingPage.svelte';
  import DelegationManager from './lib/components/DelegationManager.svelte';
  import { initIpfsConfig } from '@blockpal/vault-x-sdk';

  let showDelegationManager = false;

  function handleStartApp() {
    showDelegationManager = true;
  }

</script>

{#if !showDelegationManager}
  <LandingPage onStart={handleStartApp} />
{:else}
  <DelegationManager />
{/if}
