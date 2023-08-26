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

interface IAppContextProps {
  state: IAppReducerState;
  databaseRef?: MutableRefObject<any>;
  storeEntryMetaData: (linkData: any) => void;
  getEntryMetaData: (id: number) => any;
  updateEntryMetaData: (linkData: any) => void;
  createEntry: (link: string, collectionId: string) => void;
  createCollection: (title: string) => void;
}

const AppContext = createContext<IAppContextProps>({
  state: defaultAppReducerState,
  databaseRef: undefined,
  storeEntryMetaData: () => {},
  getEntryMetaData: () => {},
  updateEntryMetaData: () => {},
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

  const getEntryMetaData = (id: number) =>
    IndexedDBUtils.getStoredLinkMetaData(databaseRef, id);

  const storeEntryMetaData = (data: any) =>
    IndexedDBUtils.addLinkMetaData(databaseRef, data);

  const updateEntryMetaData = (id: string) => {};

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
        storeEntryMetaData,
        getEntryMetaData,
        updateEntryMetaData,

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
