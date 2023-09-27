"use client";

import {
  MutableRefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  IAppReducerState,
  defaultAppReducerState,
  useAppReducer,
} from "./reducer";
import IndexedDBUtils from "../(utils)/indexed_db";
import MetaDataUtils from "../(utils)/metadata";
import IEntry from "../../types/entry";

interface IAppContextProps {
  state: IAppReducerState;
  databaseRef?: MutableRefObject<any>;
  findOrFetchMetaData: (
    id: number,
    link: string,
    callback: (data: any) => void
  ) => void;
  updateMetaData: (linkData: any) => void;
  generatePhotoFromEntries: (id: number) => Promise<unknown>;
  createEntry: (link: string, collectionId: string) => void;
  createCollection: (title: string) => void;
}

const AppContext = createContext<IAppContextProps>({
  state: defaultAppReducerState,
  databaseRef: undefined,
  updateMetaData: () => {},
  findOrFetchMetaData: () => {},
  generatePhotoFromEntries: () => new Promise((resolve) => resolve(true)),
  createEntry: () => {},
  createCollection: () => {},
});

interface IAppContextProviderProps {
  children?: any;
}

export const AppContextProvider: React.FC<IAppContextProviderProps> = (
  props
) => {
  const [state, dispatch] = useAppReducer();

  const databaseRef = useRef<any>();
  useEffect(() => {
    IndexedDBUtils.setupDatabase(databaseRef);
  }, []);

  /**
   *
   * IndexedDB Actions
   * (storing metadata on the client side)
   *
   */

  const findOrFetchMetaData = async (
    id: number,
    link: string,
    callback: (data: any) => void
  ) => {
    IndexedDBUtils.getStoredLinkMetaData(databaseRef, id)
      .then((data: any) => {
        if (data) {
          callback(data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        MetaDataUtils.fetchMetaData(link)
          .then((data: MetaDataUtils.IMetaValues) => {
            let parsedMetaData = MetaDataUtils.parseMetaDataValues(data);
            callback(parsedMetaData);
            IndexedDBUtils.addLinkMetaData(databaseRef, {
              id: id,
              ...parsedMetaData,
            });
          })
          .catch((err: any) => console.log(err));
      });
  };

  const updateMetaData = (id: string) => {
    // fetch data
    // update entry!
  };

  const generatePhotoFromEntries = async (id: number) => {
    const entries = state.entries.filter(
      (entry: IEntry) => entry.collectionId === id
    );

    if (entries.length === 0) {
      return new Promise((resolve) => resolve([]));
    }

    return await Promise.all(
      entries.map(async (entry: IEntry) => {
        return new Promise((resolve) =>
          findOrFetchMetaData(entry.id, entry.link, (data) =>
            resolve(data.image)
          )
        );
      })
    ).then((value: unknown[]) => {
      return value.filter((v: any) => !!v).slice(0, 4);
    });
  };

  /**
   *
   * State/ConvexDB Actions
   * (storing regular data on the backend)
   *
   */

  const createEntry = async (link: string, collectionId: string) => {
    // api convex call here

    const entry = {
      id: 10,
      link: link,
      collectionId: collectionId,
    };

    dispatch({
      type: "CREATE_ENTRY",
      entry: entry,
    });
  };

  const createCollection = (title: string) => {
    // api convex call here...

    dispatch({
      type: "CREATE_COLLECTION",
      collection: {
        id: 3,
        title: title,
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        databaseRef,

        // indexed db actions
        findOrFetchMetaData,
        updateMetaData,
        generatePhotoFromEntries,

        // db actions
        createEntry,
        createCollection,
      }}
    >
      {props?.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
