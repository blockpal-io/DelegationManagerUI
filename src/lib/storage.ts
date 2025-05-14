class UniversalStorage {
  private useSync: boolean;
  private isChromeExtension: boolean;

  constructor(useSync: boolean = false) {
    this.useSync = useSync;
    this.isChromeExtension =
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      !!(chrome.storage.local || chrome.storage.sync);
  }

  get storageArea(): chrome.storage.StorageArea | null {
    if (!this.isChromeExtension) return null;
    return this.useSync ? chrome.storage.sync : chrome.storage.local;
  }

  set(key: string, value: any): Promise<void> {
    if (this.isChromeExtension) {
      return new Promise<void>((resolve) => {
        this.storageArea!.set({ [key]: value }, () => resolve());
      });
    } else {
      localStorage.setItem(key, JSON.stringify(value));
      return Promise.resolve();
    }
  }

  get<T>(key: string): Promise<T | null> {
    if (this.isChromeExtension) {
      return new Promise<T | null>((resolve) => {
        this.storageArea!.get([key], (result: { [key: string]: T }) => {
          resolve(result[key]);
        });
      });
    } else {
      const item = localStorage.getItem(key);
      return Promise.resolve(item ? JSON.parse(item) : null);
    }
  }

  remove(key: string): Promise<void> {
    if (this.isChromeExtension) {
      return new Promise<void>((resolve) => {
        this.storageArea!.remove(key, () => resolve());
      });
    } else {
      localStorage.removeItem(key);
      return Promise.resolve();
    }
  }
}

export default new UniversalStorage();
