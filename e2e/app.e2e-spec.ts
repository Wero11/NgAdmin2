import { NgAdmin2Page } from './app.po';

describe('ng-admin2 App', function() {
  let page: NgAdmin2Page;

  beforeEach(() => {
    page = new NgAdmin2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
