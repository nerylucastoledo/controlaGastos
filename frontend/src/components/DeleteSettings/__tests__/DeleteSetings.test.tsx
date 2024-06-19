import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DeleteSettings } from '../DeleteSetings';

describe("DeleteSettings component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockItem = {
    "_id": "1",
    "name": "Teste 1",
    "username": "Lucas19dca8efedf01"
  };

  it('should render DeleteSettings modal with correct label for person', () => {
    const mockOption = "pessoa";
    const setUpdateMock = jest.fn();

    render(
      <DeleteSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
      />
    );

    expect(screen.getByText("Deletar a pessoa")).toBeInTheDocument();
    expect(screen.getByTestId("message-delete").innerHTML).toEqual("Tem certeza que quer deletar o(a) <span>Teste 1</span>?");
  });

  it('should render DeleteSettings modal with correct label for category', () => {
    const mockOption = "categoria";
    const setUpdateMock = jest.fn();

    render(
      <DeleteSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
      />
    );

    expect(screen.getByText("Deletar a categoria")).toBeInTheDocument();
    expect(screen.getByTestId("message-delete").innerHTML).toEqual("Tem certeza que quer deletar o(a) <span>Teste 1</span>?");
  });

  it('should render DeleteSettings modal with correct label for card', () => {
    const mockOption = "cartao";
    const setUpdateMock = jest.fn();

    render(
      <DeleteSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
      />
    );

    expect(screen.getByText("Deletar o cartão")).toBeInTheDocument();
    expect(screen.getByTestId("message-delete").innerHTML).toEqual("Tem certeza que quer deletar o(a) <span>Teste 1</span>?");
    expect(screen.getByText("Todas as faturas desse cartão será deletada")).toBeInTheDocument();
  });

  it('should call setUpdate function after successfully deleting', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ error: false, message: "Success!" })
    })) as unknown as jest.Mock;

    const mockOption = "pessoa";
    const setUpdateMock = jest.fn();

    render(
      <DeleteSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
      />
    );

    const submitButton = screen.getByText("Deletar");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(setUpdateMock).toHaveBeenCalled();
    });
  });

  it('should display toast with error message on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.reject({ error: true, message: "Failed" })
    })) as unknown as jest.Mock;

    const mockOption = "pessoa";
    const setUpdateMock = jest.fn();

    render(
      <DeleteSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
      />
    );

    const submitButton = screen.getByText("Deletar");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });
  });
});
