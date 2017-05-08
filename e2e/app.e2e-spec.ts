import { ChatTestPage } from './app.po';

describe('chat-test App', () => {
  let page: ChatTestPage;

  beforeEach(() => {
    page = new ChatTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
