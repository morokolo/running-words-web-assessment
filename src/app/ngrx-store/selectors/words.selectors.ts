import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStoreFeature } from "src/app/constants/constants";
import { Word } from "src/app/interfaces/Responses/wordResponse";
import { wordsFeatureKey } from "../reducers/words.reducer";

export interface WordsState {
  data: Word;
  error: boolean;
  message: string;
  loading: boolean;
}

export interface featureState {
  [AppStoreFeature]: {
    [wordsFeatureKey]: WordsState;
  };
}

export const selectWordFeature = (state: featureState) =>
  state[AppStoreFeature][wordsFeatureKey];

export const listOfWordsResponse = createSelector(
  selectWordFeature,
  (state: WordsState) => state.data
);

export const listOfWordsLoader = createSelector(
  selectWordFeature,
  (state: WordsState) => state.loading
);

export const listOfWordsError = createSelector(
  selectWordFeature,
  (state: WordsState) => state.error
);
