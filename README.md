# Blockpal Wallet Delegation Manager UI

A modern web interface for managing Solana wallet delegations, built with Svelte and TypeScript. This is a mock up project for the web components that will become part of the [Blockpal browser extension](https://github.com/blockpal-io/vault-wallet).

## Overview

The Wallet Delegation Manager provides a user-friendly interface for managing crypto wallet delegations. It allows users to create, edit, and manage permissions that delegate wallet access to other addresses with fine-grained control.

### Key Features

- **Delegation Management**: Create and manage wallet delegations with custom permissions
- **Permission Types**: Supports multiple permission levels (full, limited, custom, or games-only)
- **Program Selection**: Choose specific programs/protocols that delegates can interact with
- **Game Integration**: Specify games that delegates can access
- **Multiple Delegates**: Support for adding multiple delegate addresses to a single delegation
- **Modern UI**: Beautiful, responsive interface with animations and visual feedback

## Technical Stack

- **Framework**: Svelte
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm

### Installation

```sh
# Install dependencies
pnpm install

# Create a keypair for development
pnpm run dev:keypair
# NOTE: be sure to fund it before proceeding

# Create a vault for development
pnpm run dev:vault

# Start development server
pnpm dev

# Check whats in the vault
pnpm run dev:check
```

#### Building for production

```sh
# Build for production
pnpm build
```

### Development

The application is structured around a main DelegationManager component that handles the workflow for creating and managing delegations. The interface provides a step-by-step process for adding new delegations:

1. **Nickname Step**: Set a nickname for the delegation
2. **Address Step**: Enter the delegate address and optional additional delegates
3. **Permissions Step**: Configure access levels (full, limited, custom, or games)
4. **Confirm Step**: Review and confirm the delegation settings
5. **Success Step**: Confirmation of successful delegation creation

## Architecture

- **Components**: Modular Svelte components in `src/lib/components/`
- **State Management**: Svelte stores for managing application state
- **Types**: TypeScript interfaces for type safety
