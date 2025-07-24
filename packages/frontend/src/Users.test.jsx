import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Users from './Users';
import { it } from 'vitest';


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

const listExpecter = async (assertList) => {
  for (const item of assertList) {
    await waitFor(() => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  }
};

describe('Usersコンポーネントのテスト', () => {
  it('初期描画のテスト', async () => {
    render(<Users />);
    await listExpecter(['maguma', 'nakayama', 'makise']);
  });

  it('追加ボタン押下でsubmitが呼ばれる', async () => {
    render(<Users />);
    fireEvent.submit(screen.getByRole('button', { name: '追加' }));
    expect(submit).toHaveBeenCalledTimes(1);
  });

  it('入力値が更新される', async () => {
    render(<Users />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '新しいユーザー' } });
    expect(input).toHaveBeenCalledWith('新しいユーザー');
  });

  it('Usersのスナップショットテスト', async () => {
    const { container } = render(<Users />);
    expect(container).toMatchSnapshot();
  });
});