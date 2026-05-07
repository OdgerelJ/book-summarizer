import {COPY_RESET_DELAY_MS, FILTER_TABS, STORAGE_KEYS} from './constants';

describe('STORAGE_KEYS', () => {
  it('has a key for saved books', () => {
    expect(STORAGE_KEYS.SAVED_BOOKS).toBe('savedBooks');
  });

  it('has a key for read books', () => {
    expect(STORAGE_KEYS.READ_BOOKS).toBe('readBooks');
  });

  it('has a key for book notes', () => {
    expect(STORAGE_KEYS.BOOK_NOTES).toBe('bookNotes');
  });

  it('has a prefix for summary cache entries', () => {
    expect(STORAGE_KEYS.SUMMARY_PREFIX).toBe('summary_');
  });
});

describe('FILTER_TABS', () => {
  it('has an All tab', () => {
    expect(FILTER_TABS.ALL).toBe('All');
  });

  it('has a Saved tab', () => {
    expect(FILTER_TABS.SAVED).toBe('Saved');
  });

  it('has a Read tab', () => {
    expect(FILTER_TABS.READ).toBe('Read');
  });
});

describe('COPY_RESET_DELAY_MS', () => {
  it('is a positive number', () => {
    expect(COPY_RESET_DELAY_MS).toBeGreaterThan(0);
  });
});
