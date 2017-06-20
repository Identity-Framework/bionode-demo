import { BionodeDemoPage } from './app.po';

describe('bionode-demo App', () => {
  let page: BionodeDemoPage;

  beforeEach(() => {
    page = new BionodeDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
