import { createAction, props } from "@ngrx/store";
import { sentenceRequest } from "src/app/interfaces/Requests/sentenceRequest";
import { SentenceList } from "src/app/interfaces/Responses/sentenceResponse";

export const loadSentences = createAction("[Sentences] Load Sentences");

export const loadSentencesSuccess = createAction(
  "[Sentences] Load Sentences Success",
  props<{ sentenceResponse: SentenceList }>()
);

export const loadSentencesFailure = createAction(
  "[Sentences] Load Sentences Failure",
  props<{ error: any }>()
);

export const createSentences = createAction(
  "[Sentences] Create Sentences",
  props<{ sentenceRequest: sentenceRequest }>()
);

export const createSentencesSuccess = createAction(
  "[Sentences] Create Sentences Success",
  props<{ data: any }>()
);

export const createSentencesFailure = createAction(
  "[Sentences] Create Sentences Failure",
  props<{ error: any }>()
);
