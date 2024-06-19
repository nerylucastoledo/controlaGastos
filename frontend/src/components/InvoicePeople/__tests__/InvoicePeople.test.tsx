import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { InvoicePeople } from '../InvoicePeople'

const mockPeoples = ["People 1"]
const mockPeoples2 = ["People 1", "People 2", "People 3"]

describe("InvoicePeople component", () => {
  it('should display 2 names on the screen', () => {
    render(<InvoicePeople peoples={mockPeoples} peopleSelected='People 1' setPeopleSelected={() => {}} />)

    expect(screen.getByText("Eu")).toBeInTheDocument()
    expect(screen.getByText("People 1")).toBeInTheDocument()
  })

  it('should display 4 names on the screen', () => {
    render(<InvoicePeople peoples={mockPeoples2} peopleSelected='People 1' setPeopleSelected={() => {}} />)

    expect(screen.getByText("Eu")).toBeInTheDocument()
    expect(screen.getByText("People 1")).toBeInTheDocument()
    expect(screen.getByText("People 2")).toBeInTheDocument()
    expect(screen.getByText("People 3")).toBeInTheDocument()
  })

  it('should display 1 person if the "peoples" parameter is empty', () => {
    render(<InvoicePeople peoples={[]} peopleSelected='People 1' setPeopleSelected={() => {}} />)

    expect(screen.getByText("Eu")).toBeInTheDocument()
    expect(screen.queryByTestId('people')).toBeNull();
  })

  it('should call the setPeopleSelected function if another person is selected', () => {
    const mockSetPeopleSelected = jest.fn();

    render(<InvoicePeople peoples={mockPeoples2} peopleSelected='People 1' setPeopleSelected={mockSetPeopleSelected} />)

    const people2 = screen.getByText('People 2');
    fireEvent.click(people2)

    expect(mockSetPeopleSelected).toHaveBeenCalledWith('People 2');
  })
})