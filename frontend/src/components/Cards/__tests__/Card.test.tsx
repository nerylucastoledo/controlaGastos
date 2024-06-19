import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Cards } from '../Cards';
import { mockBillToCardsComponent, mockCardsToCardsComponent } from '../../../utils/mockTest';

const navigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

describe("Cards component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Cards component with correct number of cards', () => {
    render(
      <Cards 
        cards={mockCardsToCardsComponent}
        bill={mockBillToCardsComponent}
      />
    );

    const cards = screen.getAllByRole("button");
    expect(cards.length).toBe(2);
  });

  it('should render Cards component with correct card names', () => {
    render(
      <Cards 
        cards={mockCardsToCardsComponent}
        bill={mockBillToCardsComponent}
      />
    );

    expect(screen.getByText("card1")).toBeInTheDocument();
    expect(screen.getByText("card2")).toBeInTheDocument();
  });

  it('should render no cards message when there are no cards', () => {
    render(
      <Cards 
        cards={[]}
        bill={[]}
      />
    );
    
    expect(screen.getByText("cartões"))
    expect(screen.queryByTestId("card")).toBeNull();
  });
});
