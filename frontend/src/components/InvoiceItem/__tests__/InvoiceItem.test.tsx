import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { InvoiceItem } from '../InvoiceItem'

import { mockWithDataToInvoiceItem } from '../../../utils/mockTest'

describe("InvoiceItem component", () => {
  it('should display 2 items of the invoice for the person "Eu"', () => {
    render(
      <InvoiceItem 
        data={mockWithDataToInvoiceItem} 
        peopleSelected='Eu' 
        setEditItem={() => {}} 
        setDeleteItem={() => {}} 
      />
    )
    
    expect(screen.getByText("Item teste 1")).toBeInTheDocument();
    expect(screen.getByText("R$ 100,00")).toBeInTheDocument();
    expect(screen.getByText("Item teste 2")).toBeInTheDocument();
    expect(screen.getByText("R$ 200,00")).toBeInTheDocument();
  })

  it('should display the total value of R$ 300.00 for the person "Eu"', () => {
    render(
      <InvoiceItem 
        data={mockWithDataToInvoiceItem} 
        peopleSelected='Eu' 
        setEditItem={() => {}} 
        setDeleteItem={() => {}} 
      />
    )
    
    expect(screen.getByTestId("total").innerHTML.replace(/\s|&nbsp;/g, '')).toEqual("R$300,00");
  })

  it('should display 1 item of the invoice for the person "People 1"', () => {
    render(
      <InvoiceItem 
        data={mockWithDataToInvoiceItem} 
        peopleSelected='People 1' 
        setEditItem={() => {}} 
        setDeleteItem={() => {}} 
      />
    )
    
    expect(screen.getByText("Item teste 3")).toBeInTheDocument();
    expect(screen.getAllByText("R$ 61,90")[0]).toBeInTheDocument();
  })

  it('should display the total value of R$ 61.90 for the person "People 1"', () => {
    render(
      <InvoiceItem 
        data={mockWithDataToInvoiceItem} 
        peopleSelected='People 1' 
        setEditItem={() => {}} 
        setDeleteItem={() => {}} 
      />
    )
    
    expect(screen.getByTestId("total").innerHTML.replace(/\s|&nbsp;/g, '')).toEqual("R$61,90");
  })

  it('should call the delete item modal when the delete icon is clicked', () => {
    const mockSetDelete = jest.fn();

    render(
      <InvoiceItem 
        data={mockWithDataToInvoiceItem} 
        peopleSelected='Eu' 
        setEditItem={() => {}} 
        setDeleteItem={mockSetDelete} 
      />
    )
    
    const deleteItem = screen.getAllByTestId('modalDelete')[0];
    fireEvent.click(deleteItem)

    expect(mockSetDelete).toHaveBeenCalled();
  })

  it('should call the edit item modal when the edit icon is clicked', () => {
    const mockSetEdit = jest.fn();

    render(
      <InvoiceItem 
        data={mockWithDataToInvoiceItem} 
        peopleSelected='Eu' 
        setEditItem={mockSetEdit} 
        setDeleteItem={() => {}} 
      />
    )

    const deleteItem = screen.getAllByTestId('modalUpdate')[0];
    fireEvent.click(deleteItem)

    expect(mockSetEdit).toHaveBeenCalled();
  })

  it('should display the text "fatura vazia" if nothing is registered for the person', () => {
    render(
      <InvoiceItem 
        data={[]} 
        peopleSelected='Eu' 
        setEditItem={() => {}} 
        setDeleteItem={() => {}} 
      />
    )
    
    expect(screen.getByText("fatura vazia")).toBeInTheDocument();
  })
})