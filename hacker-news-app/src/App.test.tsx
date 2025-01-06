import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

import axios from 'axios';

jest.mock('axios');

test('renders top stories', async () => {
  // Mock axios responses
  (axios.get as jest.Mock)
    .mockResolvedValueOnce({ data: [1, 2] }) // top stories
    .mockResolvedValueOnce({ data: { id: 1, title: 'Test Story 1', url: 'http://example.com/1', score: 100 } })
    .mockResolvedValueOnce({ data: { id: 2, title: 'Test Story 2', url: 'http://example.com/2', score: 200 } });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Verify loading state appears
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  // Wait for loading to complete
  await waitFor(() => expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument());

  // Verify stories are rendered
  expect(screen.getByText(/Test Story 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Story 2/i)).toBeInTheDocument();
});
