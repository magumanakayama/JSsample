import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';

import { http } from 'msw';
import { setupServer } from 'msw/node';
import Users from './Users';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
beforeEach(() => {
  server.use(
    http.get('/api/users', (req, res, ctx) => {
      return res(ctx.json({ users: [{ name: 'maguma' }, { name: 'nakayama' }, { name: 'makise' }] }));
    })
  );
});

describe('Users', () => {
  it('renders Users component', async () => {

    // const response = await fetch('/api/users');
    // console.log('before------------')
    // console.log('response:', response);
    // const body = await response.json();
    // console.log('body:', body);
    // console.log('getUsers response:', body);

    render(<Users />);
    // console.log('ここからDOM');
    // screen.debug(); // ここでDOMの状態を確認
    
    expect(('hoge')).toBe('hoge');

    await waitFor(() => {
      return expect(screen.getByText('')).toBeInTheDocument();
    });
    // await waitFor(() => {
    //   return expect(screen.getByText('nakayama')).toBeInTheDocument();
    // });
    // await waitFor(() => {
    //   return expect(screen.getByText('makise')).toBeInTheDocument();
    // });
  });
});