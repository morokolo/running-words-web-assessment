import { Action, createReducer, on } from "@ngrx/store";
import { All } from "@ngrx/store-devtools/src/actions";
import * as SentenceActions from "../actions/sentences.actions";
import {
  Sentence,
  SentenceList,
} from "src/app/interfaces/Responses/sentenceResponse";

export const sentencesFeatureKey = "sentences";

export interface State {
  data: SentenceList;
  createSentenceResponse: any;
  error: boolean;
  message: string;
  loading: boolean;
  isSentenceCreateError: boolean;
  isSentenceCreateLoading: boolean;
}

export const initialState: State = {
  data: null,
  createSentenceResponse: null,
  message: null,
  error: false,
  loading: false,
  isSentenceCreateError: false,
  isSentenceCreateLoading: false,
};

export const sentenceReducer = createReducer(
  initialState,
  on(SentenceActions.loadSentences, (state) => ({ ...state, loading: true })),
  on(SentenceActions.loadSentencesSuccess, (state, { sentenceResponse }) => ({
    ...state,
    data: sentenceResponse,
    error: false,
    loading: false,
  })),
  on(SentenceActions.loadSentencesFailure, (state, { error }) => ({
    ...state,
    message: error.message,
    loading: false,
    error: true,
  })),
  on(SentenceActions.createSentences, (state) => ({
    ...state,
    isSentenceCreateLoading: true,
  })),
  on(SentenceActions.createSentencesSuccess, (state, { data }) => ({
    ...state,
    createSentenceResponse: data,
    isSentenceCreateError: false,
    isSentenceCreateLoading: false,
  })),
  on(SentenceActions.createSentencesFailure, (state, { error }) => ({
    ...state,
    message: error.message,
    isSentenceCreateLoading: false,
    isSentenceCreateError: true,
  }))
);

export function reducer(state: State | undefined, action: All) {
  return sentenceReducer(state, action);
}
