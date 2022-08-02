import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { EndPoints } from "src/app/constants/endpoints";
import { HttpRequestService } from "src/app/services/http-request.service";
import * as WordActions from "../actions/words.actions";

@Injectable()
export class WordsEffects {
  GetWords$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WordActions.loadWords),
      switchMap((payload: any) => {
        return this.apiService.getRequest(EndPoints.WORDS).pipe(
          map((wordResponse) =>
            WordActions.loadWordsSuccess({
              wordResponse: wordResponse,
            })
          ),
          catchError((error) =>
            of(
              WordActions.loadWordsFailure({
                error: error.error,
              })
            )
          )
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private apiService: HttpRequestService
  ) {}
}
