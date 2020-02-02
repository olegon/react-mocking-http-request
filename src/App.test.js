import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import nock from 'nock';
import App from './App';

describe('Mocking request', () => {
  afterEach(() => {
    cleanup();
    nock.cleanAll();
  })

  it('It should render a message com Chuck Norris Pubic API', async () => {
    nock('https://api.icndb.com')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' }) // avoids CORS errors
      .get('/jokes/random')
      .delay(500)
      .reply(200, {
        "type": "success",
        "value": {
          "id": 323,
          "joke": "Chuck Norris' programs never exit, they terminate.",
          "categories": []
        }
      })

    const { getByText } = render(<App />);

    const [ staticMessageElement ] = await waitForElement(() => [
      getByText('This is a static message')
    ]); // It can wait for multiple elements

    expect(staticMessageElement).toBeVisible();

    const [ messageElement ] = await waitForElement(() => [
      getByText("Chuck Norris' programs never exit, they terminate.")
    ], {
      timeout: 1000 // You can configure the timeout
    });
    
    expect(messageElement).toBeVisible();
  });
})
