import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import Delete from '../Delete';

describe("Delete component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockItem = {
    "_id": "1",
    "username": "usernameteste",
    "date": "Junho2024",
    "people": "Eu",
    "category": "lazer",
    "value": "R$ 1.000,00",
    "item": "Item 1",
    "card": "Teste 1"
  };

  it('should render Delete modal with correct label and item', () => {
    const setUpdateMock = jest.fn();

    render(
      <Delete 
        item={mockItem}
        setUpdate={setUpdateMock}
      />
    );

    expect(screen.getByText("Deletar o gasto")).toBeInTheDocument();
    expect(screen.getByTestId("message-delete").innerHTML).toEqual("Tem certeza que quer deletar <span>Item 1</span>?");
  });

  it('should call setUpdate function after successfully deleting', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ error: false, message: "Success!" })
    })) as unknown as jest.Mock;

    const setUpdateMock = jest.fn();

    render(
      <Delete 
        item={mockItem}
        setUpdate={setUpdateMock}
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

    const setUpdateMock = jest.fn();

    render(
      <Delete 
        item={mockItem}
        setUpdate={setUpdateMock}
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
