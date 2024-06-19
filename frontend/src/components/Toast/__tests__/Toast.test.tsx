import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Toast } from '../Toast'

describe("Toast component", () => {
  it('deveria mostrar a mensagem de "test error" na tela com a cor vermelha caso o erro seja true', () => {
    render(<Toast message='test error' error={true} hideToast={() => {}} />)

    const toastElement = screen.getByRole('alert');
    const styles = window.getComputedStyle(toastElement);

    expect(screen.getByText("test error")).toBeInTheDocument()
    expect(styles.backgroundColor).toEqual("rgb(178, 34, 34)");
  })

  it('deveria mostrar a mensagem de "test success" na tela com a cor verde caso o erro seja false', () => {
    render(<Toast message='test success' error={false} hideToast={() => {}} />)

    const toastElement = screen.getByRole('alert');
    const styles = window.getComputedStyle(toastElement);

    expect(screen.getByText("test success")).toBeInTheDocument()
    expect(styles.backgroundColor).toEqual("rgb(0, 100, 0)");
  })
})