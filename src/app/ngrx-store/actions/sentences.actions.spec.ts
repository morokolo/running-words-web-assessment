import * as fromSentences from './sentences.actions';

describe('loadSentencess', () => {
  it('should return an action', () => {
    expect(fromSentences.loadSentencess().type).toBe('[Sentences] Load Sentencess');
  });
});
