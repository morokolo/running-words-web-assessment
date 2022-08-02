import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { sentenceRequest } from "src/app/interfaces/Requests/sentenceRequest";
import { Word } from "src/app/interfaces/Responses/wordResponse";
import {
  createSentences,
  loadSentences,
} from "src/app/ngrx-store/actions/sentences.actions";
import { loadWords } from "src/app/ngrx-store/actions/words.actions";
import {
  listOfWordsError,
  listOfWordsLoader,
  listOfWordsResponse,
} from "src/app/ngrx-store/selectors/words.selectors";

@Component({
  selector: "app-word-list",
  templateUrl: "./word-list.component.html",
  styleUrls: ["./word-list.component.css"],
})
export class WordListComponent implements OnInit, OnDestroy {
  listOfWords$: Observable<any> = this.store.select(listOfWordsResponse);
  isLoadingWords$: Observable<boolean> = this.store.select(listOfWordsLoader);
  isError$: Observable<boolean> = this.store.select(listOfWordsError);
  public groupedWordTypes = [];
  private cancelationSubscription = new Subscription();
  filterStatus = "";
  wordListData;
  sentence = "";
  constructor(public store: Store) {}

  ngOnInit(): void {
    this.cancelationSubscription.add(this.store.dispatch(loadWords()));
    // const wordsTypes = this.groupOfWordTypes();
    // console.log("wordsTypes", wordsTypes);
    // const uniqueWordTypes = [...new Set(wordsTypes.map((item) => item.type))];
    // console.log("uniqueWordTypes", uniqueWordTypes);
    // this.groupedWordTypes = uniqueWordTypes;
    // console.log("groupedWordTypes", this.groupedWordTypes);
    // //[...new Set(data.map((item) => item.group))];

    this.cancelationSubscription.add(
      this.listOfWords$.subscribe((response) => {
        if (response) {
          // this.groupedWordTypes = [
          //   ...new Set(response.data.map((item) => item.type)),
          // ];
          this.wordListData = response.data;
          console.log("this.wordListData ", this.wordListData);
          this.groupedWordTypes = [
            ...new Map(
              response.data.map((item) => [item["type"], item])
            ).values(),
          ];
        }
      })
    );
  }

  filterWordsBy(filter) {
    this.filterStatus = filter.type;
  }

  constructSentence(wordItem) {
    this.sentence += wordItem.word_name + " ";
  }
  sendMessage(currentSentence) {
    const sentenceRequest: sentenceRequest = {
      sentence: currentSentence,
    };
    this.cancelationSubscription.add(
      this.store.dispatch(createSentences({ sentenceRequest }))
    );
  }

  ngOnDestroy() {
    this.cancelationSubscription.unsubscribe();
  }
}
