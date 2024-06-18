import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import Edit from '../Edit'
import { Bill } from '../../../types';
import { act } from 'react';

describe("Edit component", () => {
  const mockItem = {
    _id: "1",
    item: "Alessa",
    value: "R$ 100,00"
  } as Bill;
  
  const setUpdateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Edit modal with correct labels and input fields', () => {
    render(
      <Edit 
        item={mockItem}
        setUpdate={setUpdateMock}
      />
    );

    expect(screen.getByText("Editar o gasto")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nome do item")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Valor do item")).toBeInTheDocument();
  });

  it('should display error message when name input is empty', async () => {
    render(
      <Edit 
        item={mockItem}
        setUpdate={setUpdateMock}
      />
    );

    const nameInput = screen.getByTestId("testitem");
    fireEvent.change(nameInput, { target: { value: '' } });

    const submitButton = screen.getByText("Atualizar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("Item não pode ser vazio!");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display error message when value input is empty', async () => {
    render(
      <Edit 
        item={mockItem}
        setUpdate={setUpdateMock}
      />
    );

    const valueInput = screen.getByTestId("testvalueItem");
    fireEvent.change(valueInput, { target: { value: '' } });

    const submitButton = screen.getByText("Atualizar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("Valor não pode ser vazio!");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should call setUpdate function after successfully updating', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ error: false, message: "Success!" })
    })) as jest.Mock;

    render(
      <Edit 
        item={mockItem}
        setUpdate={setUpdateMock}
      />
    );

    const submitButton = screen.getByText("Atualizar");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(setUpdateMock).toHaveBeenCalled();
    });
  });

  it('should display toast with error message on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Failed"))) as jest.Mock;

    render(
      <Edit 
        item={mockItem}
        setUpdate={setUpdateMock}
      />
    );

    const submitButton = screen.getByText("Atualizar");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });
  });
});
