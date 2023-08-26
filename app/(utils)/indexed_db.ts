import { MutableRefObject, RefObject } from "react";

namespace IndexedDBUtils {
  const DB_NAME = "MY_OOSOOM_DB";
  const LINK_STORE_NAME = "LINKS_STORE";
  const LINK_STORE_ID_INDEX = "LINKS_STORE_ID";

  const READ_WRITE = "readwrite";

  const getIndexedDB = () => {
    const myWindow = window as any;
    return (
      myWindow.indexedDB ||
      myWindow.mozIndexedDB ||
      myWindow.webkitIndexedDB ||
      myWindow.msIndexedDB ||
      myWindow.shimIndexedDB
    );
  };

  export const clearDatabase = (dbRef: MutableRefObject<any>) => {
    if (dbRef.current) {
      console.log("Clearing our database");
      dbRef.current.clear();
    }
  };

  export const closeDatabase = (dbRef: MutableRefObject<any>) => {
    if (dbRef.current) {
      console.log("Closing our database connection");
      dbRef.current.close();
    }
  };

  export const setupDatabase = (dbRef: MutableRefObject<any>) => {
    const indexedDB = getIndexedDB();
    if (!indexedDB) {
      console.log("IndexedDB could not be found in this browser.");
      return;
    }

    console.log("Setting up database ...");

    const newDB = indexedDB.open(DB_NAME, 1);
    newDB.onerror = (event: Event) => {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };

    newDB.onupgradeneeded = () => {
      console.log("Updating database");
      const db = newDB.result;
      if (!db.objectStoreNames.contains(LINK_STORE_NAME)) {
        const store = db.createObjectStore(LINK_STORE_NAME, { keyPath: "id" });
        store.createIndex(LINK_STORE_ID_INDEX, ["id"], { unique: true });
      }
    };

    newDB.onsuccess = () => {
      console.log("Database opened successfully");
      dbRef.current = newDB.result;
    };
  };

  export const getAllStoredLinkMetaData = async (dbRef: RefObject<any>) => {
    return new Promise((resolve, reject) => {
      if (dbRef.current) {
        let transaction = dbRef.current
          .transaction([LINK_STORE_NAME], READ_WRITE)
          .objectStore(LINK_STORE_NAME)
          .getAll();

        transaction.onsuccess = (event: any) => {
          console.log("Success getting links from the database");
          let result = event.target.result;
          result ? resolve(result) : reject();
        };

        transaction.onerror = (event: any) => {
          console.error("An error occurred getting links from the database");
          console.error(event);
          reject();
        };
      } else {
        reject();
      }
    });
  };

  export const getStoredLinkMetaData = async (
    dbRef: RefObject<any>,
    id: number
  ) => {
    return new Promise((resolve, reject) => {
      if (dbRef.current) {
        let transaction = dbRef.current
          .transaction([LINK_STORE_NAME], READ_WRITE)
          .objectStore(LINK_STORE_NAME)
          .get(id);

        transaction.onsuccess = (event: any) => {
          console.log("Success getting link from the database");
          let result = event.target.result;
          console.log(result);
          result ? resolve(result) : reject();
        };

        transaction.onerror = (event: any) => {
          console.error("An error occurred getting link from the database");
          console.error(event);
          reject();
        };
      } else {
        reject();
      }
    });
  };

  export const addLinkMetaData = async (dbRef: RefObject<any>, value: any) => {
    return new Promise((resolve, reject) => {
      if (dbRef.current) {
        let transaction = dbRef.current
          .transaction([LINK_STORE_NAME], READ_WRITE)
          .objectStore(LINK_STORE_NAME)
          .add(value);

        transaction.onsuccess = (event: any) => {
          console.log("Success adding to the database");
          let result = event.target.result;
          result ? resolve(result) : reject();
        };

        transaction.onerror = (event: any) => {
          console.error("An error occurred adding to the database");
          console.error(event);
          reject();
        };
      } else {
        reject();
      }
    });
  };

  export const updateLinkMetaData = async (
    dbRef: RefObject<any>,
    value: any
  ) => {
    return new Promise((resolve, reject) => {
      if (dbRef.current) {
        let transaction = dbRef.current
          .transaction([LINK_STORE_NAME], READ_WRITE)
          .objectStore(LINK_STORE_NAME)
          .put(value);

        transaction.onsuccess = (event: any) => {
          console.log("Successfully updated the database");
          let result = event.target.result;
          result ? resolve(result) : reject();
        };

        transaction.onerror = (event: any) => {
          console.error("An error occurred updating the database");
          console.error(event);
          reject();
        };
      } else {
        reject();
      }
    });
  };

  export const removeLinkMetaData = async (
    dbRef: RefObject<any>,
    id: number
  ) => {
    return new Promise((resolve, reject) => {
      if (dbRef.current) {
        let transaction = dbRef.current
          .transaction([LINK_STORE_NAME], READ_WRITE)
          .objectStore(LINK_STORE_NAME)
          .delete(id);

        transaction.onsuccess = (event: any) => {
          console.log("Successfully removed from the database");
          let result = event.target.result;
          result ? resolve(result) : reject();
        };

        transaction.onerror = (event: any) => {
          console.error("An error occurred removing from the database");
          console.error(event);
          reject();
        };
      } else {
        reject();
      }
    });
  };
}

export default IndexedDBUtils;
