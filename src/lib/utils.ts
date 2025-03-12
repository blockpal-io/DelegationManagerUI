// Validate Solana address
export const validateSolanaAddress = (address: string): boolean => {
  // Simple validation for Solana address (44 characters) or .sol name
  return (
    address.endsWith('.sol') || (address.length === 44 && /^[A-HJ-NP-Za-km-z1-9]+$/.test(address))
  );
};

// Format address for display
export const formatAddress = (address: string): string => {
  if (address.endsWith('.sol')) return address;
  if (address.length > 8) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }
  return address;
};
