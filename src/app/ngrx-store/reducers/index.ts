import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../../environments/environment";

import * as wordReducer from "../reducers/words.reducer";
import * as fromSentences from './sentences.reducer';

export interface State {
  [wordReducer.wordsFeatureKey]: wordReducer.State;
  [fromSentences.sentencesFeatureKey]: fromSentences.State;
}

export const reducers: ActionReducerMap<State> = {
  [wordReducer.wordsFeatureKey]: wordReducer.reducer,
  [fromSentences.sentencesFeatureKey]: fromSentences.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
