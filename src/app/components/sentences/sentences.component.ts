import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { loadSentences } from "src/app/ngrx-store/actions/sentences.actions";
import {
  listOfSentencesError,
  listOfSentencesLoader,
  listOfSentencesResponse,
} from "src/app/ngrx-store/selectors/sentences.selectors";

@Component({
  selector: "app-sentences",
  templateUrl: "./sentences.component.html",
  styleUrls: ["./sentences.component.css"],
})
export class SentencesComponent implements OnInit, OnDestroy {
  listOfSentences$: Observable<any> = this.store.select(
    listOfSentencesResponse
  );
  isLoading$: Observable<boolean> = this.store.select(listOfSentencesLoader);
  isError$: Observable<boolean> = this.store.select(listOfSentencesError);
  private cancelationSubscription = new Subscription();

  constructor(public store: Store) {}

  ngOnInit(): void {
    this.cancelationSubscription.add(this.store.dispatch(loadSentences()));
  }

  ngOnDestroy() {
    this.cancelationSubscription.unsubscribe();
  }
}
