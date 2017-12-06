import { AnytimeLibraryPage } from './app.po';

describe('anytime-library App', () => {
  let page: AnytimeLibraryPage;

  beforeEach(() => {
    page = new AnytimeLibraryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
