import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SentencesEffects } from './sentences.effects';

describe('SentencesEffects', () => {
  let actions$: Observable<any>;
  let effects: SentencesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SentencesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SentencesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
