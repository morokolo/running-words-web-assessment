import { createAction, props } from "@ngrx/store";
import { Word } from "src/app/interfaces/Responses/wordResponse";

export const loadWords = createAction("[Words] Load Words");

export const loadWordsSuccess = createAction(
  "[Words] Load Words Success",
  props<{ wordResponse: Word }>()
);

export const loadWordsFailure = createAction(
  "[Words] Load Words Failure",
  props<{ error: any }>()
);
