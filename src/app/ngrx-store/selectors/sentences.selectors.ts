import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStoreFeature } from "src/app/constants/constants";
import {
  Sentence,
  SentenceList,
} from "src/app/interfaces/Responses/sentenceResponse";
import { sentencesFeatureKey } from "../reducers/sentences.reducer";

export interface SentenceState {
  data: SentenceList;
  error: boolean;
  message: string;
  loading: boolean;
}

export interface featureState {
  [AppStoreFeature]: {
    [sentencesFeatureKey]: SentenceState;
  };
}

export const selectSentenceFeature = (state: featureState) =>
  state[AppStoreFeature][sentencesFeatureKey];

export const listOfSentencesResponse = createSelector(
  selectSentenceFeature,
  (state: SentenceState) => state.data
);

export const listOfSentencesLoader = createSelector(
  selectSentenceFeature,
  (state: SentenceState) => state.loading
);

export const listOfSentencesError = createSelector(
  selectSentenceFeature,
  (state: SentenceState) => state.error
);
