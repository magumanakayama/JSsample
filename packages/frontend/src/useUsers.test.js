import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import useUsers from './useUsers';


const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Usersコンポーネントのテスト', () => {
  it('初期描画のテスト', async () => {
    server.use(
      http.get('/api/users', (req, res, ctx) => {
        return HttpResponse.json({ users: [
          { id: 1, name: "maguma" },
          { id: 2, name: "nakayama" },
          { id: 3, name: "makise" }
        ] });
      })
    );

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      return expect(result.current.users).toContain('maguma');
    });
    await waitFor(() => {
      return expect(result.current.users).toContain('nakayama');
    });
    await waitFor(() => {
      return expect(result.current.users).toContain('makise');
    });
  });
});