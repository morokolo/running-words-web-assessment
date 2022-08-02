import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { EndPoints } from "src/app/constants/endpoints";
import { sentenceRequest } from "src/app/interfaces/Requests/sentenceRequest";
import { HttpRequestService } from "src/app/services/http-request.service";
import * as SentenceActions from "../actions/sentences.actions";

@Injectable()
export class SentencesEffects {
  GetSentences$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SentenceActions.loadSentences),
      switchMap((payload: any) => {
        return this.apiService.getRequest(EndPoints.LIST_OF_SENTENCES).pipe(
          map((sentenceResponse) =>
            SentenceActions.loadSentencesSuccess({
              sentenceResponse: sentenceResponse.data,
            })
          ),
          catchError((error) =>
            of(
              SentenceActions.loadSentencesFailure({
                error: error.error,
              })
            )
          )
        );
      })
    )
  );

  CreateASentence$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SentenceActions.createSentences),
      switchMap((payload: any) => {
        const sentenceRequest: sentenceRequest = payload.sentenceRequest;
        console.log("sentenceRequest", sentenceRequest);
        return this.apiService
          .postRequest(EndPoints.SENTENCES, sentenceRequest)
          .pipe(
            map((response) =>
              SentenceActions.createSentencesSuccess({
                data: response.data.data,
              })
            ),
            catchError((error) =>
              of(
                SentenceActions.createSentencesFailure({
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
