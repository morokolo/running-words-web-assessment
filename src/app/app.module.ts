import { BrowserModule } from "@angular/platform-browser";
import { InjectionToken, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./ngrx-store/reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { WordsEffects } from "./ngrx-store/effects/words.effects";
import * as fromRoot from "./ngrx-store/reducers";
import { HttpClientModule } from "@angular/common/http";
import { AppStoreFeature } from "./constants/constants";
import { WordListComponent } from "./components/word-list/word-list.component";
import { HomeComponent } from "./components/home/home.component";

import { SentencesEffects } from "./ngrx-store/effects/sentences.effects";
import { SentencesComponent } from "./components/sentences/sentences.component";
import { WordFilterPipePipe } from "./pipes/word-filter-pipe.pipe";

export const REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<fromRoot.State>
>("root reducer");

@NgModule({
  declarations: [
    AppComponent,
    WordListComponent,
    HomeComponent,
    WordFilterPipePipe,
    SentencesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(AppStoreFeature, REDUCER_TOKEN),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([WordsEffects, SentencesEffects]),
  ],
  providers: [{ provide: REDUCER_TOKEN, useValue: fromRoot.reducers }],
  bootstrap: [AppComponent],
})
export class AppModule {}
