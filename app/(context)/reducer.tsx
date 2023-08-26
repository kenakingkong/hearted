"use client";

import { useReducer } from "react";
import ICollection from "../../types/collection";
import IEntry from "../../types/entry";

export interface IAppReducerState {
  collections: ICollection[];
  entries: IEntry[];
}

type IAppReducerAction =
  | { type: "CREATE_COLLECTION"; collection: any }
  | { type: "UPDATE_COLLECTION"; collection: any }
  | { type: "DESTROY_COLLECTION"; collection: any }
  | { type: "CREATE_ENTRY"; entry: any }
  | { type: "UPDATE_ENTRY"; entry: any }
  | { type: "DESTROY_ENTRY"; entry: any };

const AppReducer = (state: IAppReducerState, action: IAppReducerAction) => {
  switch (action.type) {
    case "CREATE_COLLECTION":
      return {
        ...state,
        collections: [...state.collections, action.collection],
      };
    case "CREATE_ENTRY":
      return {
        ...state,
        entries: [action.entry, ...state.entries],
      };
    default:
      return state;
  }
};

const tempCollections = [
  {
    id: 1,
    title: "Clothes",
  },
  {
    id: 2,
    title: "Bikinis",
  },
];

const tempEntries = [
  {
    id: 1,
    link: "https://nakedwolfe.com/products/angel-white-leather",
    collectionId: 1,
  },
  {
    id: 2,
    link: "https://www.camper.com/en_US/women/shoes/kobarah/camper-kobarah-K200155-028",
    collectionId: 1,
  },
  {
    id: 3,
    link: "https://nakedwolfe.com/products/sinner-beige",
    collectionId: 1,
  },
  {
    id: 4,
    link: "https://miaou.com/products/mara-corset-lilac?variant=42278578290867",
    collectionId: 2,
  },
  {
    id: 5,
    link: "https://alythuh.com/products/valentine-stun-gun",
    collectionId: 2,
  },
];

export const defaultAppReducerState: IAppReducerState = {
  collections: tempCollections,
  entries: tempEntries,
};

export const useAppReducer = () =>
  useReducer(AppReducer, defaultAppReducerState);
