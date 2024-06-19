import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Wallet } from '../Wallet'

import { mockWith3Data } from '../../../utils/mockTest'
import useLocalStorage from '../../../hooks/useLocalStorage'

jest.mock('../../../hooks/useLocalStorage', () => ({
  __esModule: true,
  default: jest.fn((_, initial) => [initial, jest.fn()]),
}));

describe("Wallet component", () => {
  beforeEach(() => {
    (useLocalStorage as jest.Mock).mockClear();
  });

  it('should render title', () => {
    render(<Wallet bill={mockWith3Data} />)

    expect(screen.getByText("carteira")).toBeInTheDocument()
  })

  it('should display the balance of +R$638.10 if the salary is R$1.000,00', () => {
    const salary = 'R$ 1.000,00';

    (useLocalStorage as jest.Mock).mockReturnValue([salary, jest.fn()]);

    render(<Wallet bill={mockWith3Data} />)

    const balance = screen.getByTestId('balance');

    expect(screen.getByText("Saldo")).toBeInTheDocument();
    expect(balance.innerHTML.replace(/\s|&nbsp;/g, '')).toEqual("+R$638,10");
  })

  it('should display the balance of -R$161,90 if the salary is R$ 200,00', () => {
    const salary = 'R$ 200,00';

    (useLocalStorage as jest.Mock).mockReturnValue([salary, jest.fn()]);

    render(<Wallet bill={mockWith3Data} />)

    const balance = screen.getByTestId('balance');

    expect(balance.innerHTML.replace(/\s|&nbsp;/g, '')).toEqual("-R$161,90");
  })

  it('should display the salary of R$1.000,00', () => {
    const salary = 'R$ 1.000,00';

    (useLocalStorage as jest.Mock).mockReturnValue([salary, jest.fn()]);

    render(<Wallet bill={mockWith3Data} />)

    expect(screen.getByText("Salário")).toBeInTheDocument();
    expect(screen.getByText(salary)).toBeInTheDocument();
  })

  it('should display the salary of R$ 200,00', () => {
    const salary = 'R$ 200,00';

    (useLocalStorage as jest.Mock).mockReturnValue([salary, jest.fn()]);

    render(<Wallet bill={mockWith3Data} />)

    expect(screen.queryByText("R$ 1.000,00")).not.toBeInTheDocument();
    expect(screen.getByText(salary)).toBeInTheDocument();
  })

  it('should display the bills in the amount of R$ 361,90', () => {
    const salary = 'R$ 200,00';

    (useLocalStorage as jest.Mock).mockReturnValue([salary, jest.fn()]);

    render(<Wallet bill={mockWith3Data} />)

    const payable = screen.getByTestId('payable');

    expect(screen.queryByText("R$ 1.000,00")).not.toBeInTheDocument();
    expect(payable.innerHTML.replace(/\s|&nbsp;/g, '')).toEqual("R$361,90");
  })
})