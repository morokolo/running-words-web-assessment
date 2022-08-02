import { Action, createReducer, on } from "@ngrx/store";
import { All } from "@ngrx/store-devtools/src/actions";
import { Word } from "src/app/interfaces/Responses/wordResponse";
import * as wordActions from "../actions/words.actions";

export const wordsFeatureKey = "words";

export interface State {
  data: Word;
  error: boolean;
  message: string;
  loading: boolean;
}

export const initialState: State = {
  data: null,
  error: false,
  message: null,
  loading: false,
};

export const WordReducer = createReducer(
  initialState,
  on(wordActions.loadWords, (state) => ({ ...state, loading: true })),
  on(wordActions.loadWordsSuccess, (state, { wordResponse }) => ({
    ...state,
    data: wordResponse,
    error: false,
    loading: false,
  })),
  on(wordActions.loadWordsFailure, (state, { error }) => ({
    ...state,
    message: error.message,
    loading: false,
    error: true,
  }))
);

export function reducer(state: State | undefined, action: All) {
  return WordReducer(state, action);
}
