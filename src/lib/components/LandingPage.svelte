<script lang="ts">
  import { Gamepad2, Bot, Shield, X as XIcon, Plus } from 'lucide-svelte';
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

  <!-- Hero Section -->
  <section class="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
    <div class="absolute inset-0 bg-gradient-radial from-cyan/20 to-transparent opacity-30"></div>
    <img 
      src="/images/blockpal-logo-new.png" 
      alt="Blockpal Logo" 
      class="h-72 w-auto mb-8 relative z-10 object-contain drop-shadow-[0_0_4px_rgba(0,255,255,0.1)] animate-logo-glow" 
    />
    <h1 class="font-inter font-bold text-5xl mb-4 relative z-10 text-shadow-lg text-white">The Smart Delegation Edge for Web3 Wallets</h1>
    <h2 class="font-inter text-xl text-orange mb-4 relative z-10 text-shadow-md">Powering gaming, agents, and enhanced security</h2>
    <p class="font-inter text-base max-w-[600px] mb-8 relative z-10 text-shadow-sm bg-black/10 backdrop-blur-md p-6 rounded-xl border border-white/5">
      Seamless delegation meets intelligent guardrails. Level up your wallet & empower your users with Blockpals B2B API.
    </p>
    <a 
      href="/app" 
      class="font-inter text-base bg-orange text-white px-8 py-4 rounded-xl w-[200px] hover:scale-105 transition-all duration-300 relative z-10 backdrop-blur-sm border border-white/20 hover:bg-orange/90 animate-cta-pulse"
    >
      Try the Preview
    </a>
  </section>

  <!-- Problem Section -->
  <section class="py-20 bg-black/20 backdrop-blur-sm relative">
    <div class="max-w-[1200px] mx-auto px-4">
      <h2 class="font-inter font-bold text-3xl mb-6 text-center text-shadow-lg">The Delegation Gap in Web3 Wallets</h2>
      <p class="font-inter text-base max-w-[800px] mx-auto mb-12 text-center bg-black/10 backdrop-blur-md p-6 rounded-xl border border-white/5">
        Current wallets lack secure delegation, leaving 500K+ Solana gamers—and millions of Web3 users—unable to safely empower others to act on their behalf, risking assets and efficiency.
      </p>
      <div class="flex justify-center items-center gap-8 flex-wrap">
        <div class="problem-icon backdrop-blur-sm bg-black/10 border-white/10">
          <Gamepad2 class="w-8 h-8" />
          <XIcon class="w-6 h-6 text-red-500 absolute -top-2 -right-2" />
        </div>
        <div class="problem-icon backdrop-blur-sm bg-black/10 border-white/10">
          <Bot class="w-8 h-8" />
          <XIcon class="w-6 h-6 text-red-500 absolute -top-2 -right-2" />
        </div>
        <div class="problem-icon backdrop-blur-sm bg-black/10 border-white/10">
          <Shield class="w-8 h-8" />
          <XIcon class="w-6 h-6 text-red-500 absolute -top-2 -right-2" />
        </div>
      </div>
    </div>
  </section>

  <!-- Solution Section -->
  <section class="py-20 bg-gradient-to-b from-black/20 to-cyan/5 backdrop-blur-sm relative">
    <div class="max-w-[1200px] mx-auto px-4">
      <h2 class="font-inter font-bold text-3xl mb-6 text-center text-shadow-lg">Delegate Smarter with Blockpal</h2>
      <p class="font-inter text-base max-w-[800px] mx-auto mb-12 text-center bg-black/10 backdrop-blur-md p-6 rounded-xl border border-white/5">
        Blockpal integrates intelligent delegation into wallets, enabling users to delegate tasks—whether for gaming, AI automation, or secure operations—with custom permissions ensuring every action aligns with their rules.
      </p>
      <div class="flex justify-center items-center gap-8 flex-wrap">
        <div class="solution-icon backdrop-blur-sm bg-black/10 border-white/10">
          <Gamepad2 class="w-8 h-8" />
          <Plus class="w-6 h-6 text-neon-green absolute -top-2 -right-2" />
        </div>
        <div class="solution-icon backdrop-blur-sm bg-black/10 border-white/10">
          <Bot class="w-8 h-8" />
          <Plus class="w-6 h-6 text-neon-green absolute -top-2 -right-2" />
        </div>
        <div class="solution-icon backdrop-blur-sm bg-black/10 border-white/10">
          <Shield class="w-8 h-8" />
          <Plus class="w-6 h-6 text-neon-green absolute -top-2 -right-2" />
        </div>
      </div>
    </div>
  </section>

  <!-- For Wallet Providers Section -->
  <section class="py-20 bg-black/20 backdrop-blur-sm relative">
    <div class="absolute inset-0 opacity-[0.02]" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMGwxNy4zMjEgMTB2MjBMMjAgNDBMMi42NzkgMzBWMTBMMjAgMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+');">
    </div>
    <div class="max-w-[1200px] mx-auto px-4 relative z-10">
      <h2 class="font-inter font-bold text-3xl mb-6 text-center text-shadow-lg">Elevate Your Wallet's Capabilities</h2>
      <p class="font-inter text-base max-w-[800px] mx-auto mb-8 text-center bg-black/10 backdrop-blur-md p-6 rounded-xl border border-white/5">
        With Blockpal, wallet providers can offer seamless delegation, attracting Solana gamers and agents seeking smarter, safer asset management—all integrated effortlessly into your platform.
      </p>
      <div class="flex justify-center">
        <a href="mailto:blockpalmedia@gmail.com" class="font-inter text-base bg-orange text-white px-8 py-4 rounded-xl w-[200px] hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:bg-orange/90 text-center">
          Contact Us
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-black/20 backdrop-blur-sm py-8 border-t border-white/5">
    <div class="max-w-[1200px] mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="font-inter text-xs">Blockpal © 2025 - Delegate Smarter</p>
        <div class="flex items-center gap-6">
          <a href="mailto:blockpalmedia@gmail.com" class="font-inter text-xs text-cyan hover:text-neon-green transition-colors duration-300">
            Contact Us
          </a>
          <div class="w-px h-4 bg-white/10"></div>
          <a 
            href="https://discord.gg/6rBsfPkaSn" 
            class="flex items-center gap-2 text-cyan hover:text-neon-green transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
            </svg>
            <span class="font-inter text-xs">Discord</span>
          </a>
          <div class="w-px h-4 bg-white/10"></div>
          <a 
            href="https://x.com/BlockpalGaming" 
            class="flex items-center gap-2 text-cyan hover:text-neon-green transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
            <span class="font-inter text-xs">Twitter</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  /* Custom styles */
  .problem-icon, .solution-icon {
    @apply relative w-16 h-16 flex items-center justify-center border rounded-xl transition-all duration-300;
  }

  .solution-icon {
    @apply animate-solution-glow;
  }

  @keyframes solution-glow {
    0%, 100% {
      box-shadow: 0 0 5px theme('colors.neon-green');
    }
    50% {
      box-shadow: 0 0 15px theme('colors.cyan');
    }
  }

  .animate-solution-glow {
    animation: solution-glow 4s ease-in-out infinite;
  }

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

  /* Text shadows */
  .text-shadow-sm {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .text-shadow-md {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  .text-shadow-lg {
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
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

  @keyframes cta-pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(255, 136, 0, 0.4);
    }
    50% {
      box-shadow: 0 0 20px 5px rgba(255, 136, 0, 0.6);
    }
  }

  .animate-cta-pulse {
    animation: cta-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style> 