enum Access {
  Read = "readonly",
  Write = "readwrite",
}

export default class MediaDB {
  private dbName: string;
  private objectStoreName: string;
  private dbVersion: number;

  constructor(dbName = "media-db", objectStoreName = "media", dbVersion = 1) {
    this.dbName = dbName;
    this.objectStoreName = objectStoreName;
    this.dbVersion = dbVersion;
  }

  private async openDB(): Promise<IDBDatabase> {
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

  private async getObjectStore(access: Access) {
    const db = await this.openDB();
    const transaction = db.transaction(this.objectStoreName, access);
    return transaction.objectStore(this.objectStoreName);
  }

  async save(blob: Blob): Promise<any> {
    const objectStore = await this.getObjectStore(Access.Write);
    const request = objectStore.add(blob);

    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        const { result } = request;
        const url = URL.createObjectURL(blob);

        resolve({ url, key: result, type: blob.type });
      };
    });
  }

  async delete(key: number): Promise<void> {
    const objectStore = await this.getObjectStore(Access.Write);
    objectStore.delete(key);
  }

  async getAll(): Promise<any> {
    const objectStore = await this.getObjectStore(Access.Read);

    const keys = objectStore.getAllKeys();
    const media = objectStore.getAll();

    return new Promise((resolve, reject) => {
      media.onerror = () => {
        reject(media.error);
      };

      media.onsuccess = () => {
        const collection = Object.values(media.result);
        const data = collection.map((item, index) => {
          const url = URL.createObjectURL(item);
          const key = keys.result[index];

          console.warn(item);

          return { url, key, type: item.type };
        });

        resolve(data);
      };
    });
  }
}
