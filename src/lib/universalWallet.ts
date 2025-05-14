import { PublicKey, Transaction, Connection } from '@solana/web3.js';
import { FOUNDER_KEYPAIR } from './demo';

class UniversalWallet {
  private isChromeExtension: boolean;
  private wallet: any = null;

  constructor() {
    this.isChromeExtension =
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      !!(chrome.storage.local || chrome.storage.sync);

    if (this.isChromeExtension) {
      // Listen for new wallets
      window.addEventListener('wallet-standard:register-wallet', (event: Event) => {
        const wallet = (event as CustomEvent).detail;
        if (!this.wallet) {
          this.wallet = wallet; // Pick the first wallet for now
        }
      });

      // Get already-registered wallets
      const wallets = (window.navigator as any).wallets?.get() ?? [];
      if (wallets.length > 0) {
        this.wallet = wallets[0];
      }
    }
  }

  get publicKey(): PublicKey {
    if (this.isChromeExtension && this.wallet) {
      return new PublicKey(this.wallet.accounts[0].address);
    }
    return FOUNDER_KEYPAIR.publicKey;
  }

  async signAndSendTransaction(transaction: Transaction, connection: Connection): Promise<string> {
    if (this.isChromeExtension && this.wallet) {
      const { signAndSendTransaction } = this.wallet.features['solana:signAndSendTransaction'];
      const result = await signAndSendTransaction({
        transaction,
        account: this.wallet.accounts[0],
        chain: 'solana:devnet' // or mainnet-beta
      });
      return result.signature;
    } else {
      // Legacy fallback
      return await connection.sendTransaction(transaction, [FOUNDER_KEYPAIR]);
    }
  }
}

export default new UniversalWallet();
