enum Access {
  Read = "readonly",
  Write = "readwrite",
}

export default class ScreenshotDB {
  private dbName: string;
  private objectStoreName: string;
  private dbVersion: number;

  constructor() {
    this.dbName = "screenshot-db";
    this.objectStoreName = "screenshots";
    this.dbVersion = 1;
  }

  async openDB(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore(this.objectStoreName, { autoIncrement: true });
      };
    });
  }

  async saveScreenshot(image: Blob): Promise<any> {
    const db = await this.openDB();
    const transaction = db.transaction(this.objectStoreName, Access.Write);
    const objectStore = transaction.objectStore(this.objectStoreName);

    const request = objectStore.add(image);

    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        const { result } = request;
        const img = URL.createObjectURL(image);

        resolve({ img, key: result });
      };
    });
  }

  async deleteScreenshot(key: number): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction(this.objectStoreName, Access.Write);
    const objectStore = transaction.objectStore(this.objectStoreName);
    objectStore.delete(key);
  }

  async getScreenshots(): Promise<any> {
    const db = await this.openDB();
    const transaction = db.transaction(this.objectStoreName, Access.Read);
    const objectStore = transaction.objectStore(this.objectStoreName);

    const keys = objectStore.getAllKeys();
    const screenshots = objectStore.getAll();

    return new Promise((resolve, reject) => {
      screenshots.onerror = () => {
        reject(screenshots.error);
      };

      screenshots.onsuccess = () => {
        const collection = Object.values(screenshots.result);
        const data = collection.map((screenshot, index) => {
          const img = URL.createObjectURL(screenshot);
          const key = keys.result[index];

          return { img, key };
        });

        resolve(data);
      };
    });
  }
}
