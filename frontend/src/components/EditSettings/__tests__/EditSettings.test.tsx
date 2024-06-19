import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { EditSettings } from '../EditSettings'

describe("EditSettings component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render EditSettings modal with correct label and input field to people', () => {
    const mockItem = {
      "_id": "1",
      "name": "Alessa",
      "username": "testeusername"
    };
    const mockOption = "pessoa";
    const setUpdateMock = jest.fn();

    render(
      <EditSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
      />
    );

    const nameLabel = screen.getByText("Nome da pessoa");
    const nameInput = screen.getByPlaceholderText("Nome do item");

    expect(screen.getByText("Editar a pessoa"))
    expect(nameLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  it('should render EditSettings modal with correct label and input field to category', () => {
    const mockItem = {
      "_id": "1",
      "name": "Alessa",
      "username": "testeusername"
    };
    const mockOption = "categoria";
    const setUpdateMock = jest.fn();

    render(
      <EditSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
      />
    );

    const nameLabel = screen.getByText("Nome da categoria");
    const nameInput = screen.getByPlaceholderText("Nome do item");

    expect(screen.getByText("Editar a categoria"))
    expect(nameLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  it('should render EditSettings modal with correct label and input field to card', () => {
    const mockItem = {
      "_id": "1",
      "name": "Alessa",
      "username": "testeusername"
    };
    const mockOption = "cartao";
    const setUpdateMock = jest.fn();

    render(
      <EditSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
      />
    );

    const nameLabel = screen.getByText("Nome do cartão");
    const nameInput = screen.getByPlaceholderText("Nome do item");

    expect(screen.getByText("Editar o cartão"))
    expect(nameLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  it('should display error message when name input is empty to people', async () => {
    const mockItem = {
      "_id": "1",
      "name": "Alessa",
      "username": "testeusername"
    };
    const mockOption = "pessoa";
    const setUpdateMock = jest.fn();

    render(
      <EditSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
      />
    );

    const inputName = screen.getByTestId("testpessoa")
    fireEvent.change(inputName, { target: { value: '' } })

    const submitButton = screen.getByText("Atualizar");
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(`Nome da ${mockOption} não pode ser vazia!`);
    expect(errorMessage).toBeInTheDocument();
  });


  it('should display error message when name input is empty to category', async () => {
    const mockItem = {
      "_id": "1",
      "name": "Alessa",
      "username": "testeusername"
    };
    const mockOption = "categoria";
    const setUpdateMock = jest.fn();

    render(
      <EditSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
      />
    );

    const inputName = screen.getByTestId("testcategoria")
    fireEvent.change(inputName, { target: { value: '' } })

    const submitButton = screen.getByText("Atualizar");
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(`Nome da ${mockOption} não pode ser vazia!`);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display error message when name input is empty to card', async () => {
    const mockItem = {
      "_id": "1",
      "name": "Alessa",
      "username": "testeusername"
    };
    const mockOption = "cartao";
    const setUpdateMock = jest.fn();

    render(
      <EditSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
      />
    );

    const inputName = screen.getByTestId("testcartao")
    fireEvent.change(inputName, { target: { value: '' } })

    const submitButton = screen.getByText("Atualizar");
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText("Nome do cartão não pode ser vazio!");
    expect(errorMessage).toBeInTheDocument();
  });

  it('should call setUpdate function after successfully updating', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ error: false, message: "Success!" })
    })) as unknown as jest.Mock;

    const mockItem = {
      "_id": "1",
      "name": "Alessa",
      "username": "testeusername"
    };
    const mockOption = "pessoa";
    const setUpdateMock = jest.fn();

    render(
      <EditSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
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
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.reject({ error: true, message: "Failed" })
    })) as unknown as jest.Mock;

    const mockItem = {
      "_id": "1",
      "name": "Alessa",
      "username": "testeusername"
    };
    const mockOption = "pessoa";
    const setUpdateMock = jest.fn();

    render(
      <EditSettings 
        item={mockItem}
        setUpdate={setUpdateMock}
        option={mockOption}
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
