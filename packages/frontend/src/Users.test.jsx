import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import Users from './Users';


// const server = setupServer();

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());


// submitとinputをグローバルで定義
const submit = vi.fn();
const input = vi.fn();

vi.mock('./useUsers', () => ({
  useUsers: () => ({
    submit,
    input,
    inputText: '',
    users: ['maguma', 'nakayama', 'makise'],
  }),
}));

describe('Usersコンポーネントのテスト', () => {
  it('初期描画のテスト', async () => {

    // server.use(
    //   http.get('/api/users', (req, res, ctx) => {
    //     return HttpResponse.json({ users: [
    //       { id: 1, name: "maguma" },
    //       { id: 2, name: "Nakayama" },
    //       { id: 3, name: "Okabe" }
    //     ] });
    //   })
    // );

    render(<Users />);

    await waitFor(() => {
      return expect(screen.getByText('maguma')).toBeInTheDocument();
    });
    await waitFor(() => {
      return expect(screen.getByText('nakayama')).toBeInTheDocument();
    });
    await waitFor(() => {
      return expect(screen.getByText('makise')).toBeInTheDocument();
    });
  });

  it('追加ボタン押下でsubmitが呼ばれる', async () => {
    render(<Users />);
    fireEvent.submit(screen.getByRole('button', { name: '追加' }));
    expect(submit).toHaveBeenCalledTimes(1);
  });
});