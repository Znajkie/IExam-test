import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Confirmation from '../../views/Confirmation';
import App from '../../App';

describe('Confirmation Component', () => {
  it('renders no booking message when no confirmation details are available', () => {
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText('Inga bokning gjord!')).toBeInTheDocument();
  });

  it('renders confirmation details when they are available', () => {
    sessionStorage.setItem(
      'confirmation',
      JSON.stringify({
        when: '2023-10-10T18:00',
        people: 5,
        lanes: 2,
        price: 500,
        id: '9999',
      })
    );

    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText('See you soon!')).toBeInTheDocument();
    expect(screen.getByLabelText('When').value).toBe('2023-10-10 18:00');
    expect(screen.getByLabelText('Who').value).toBe('5');
    expect(screen.getByLabelText('Lanes').value).toBe('2');
    expect(screen.getByLabelText('Booking number').value).toBe(
      '9999'
    );
    expect(screen.findByText(`500 SEK`)).toBeDefined();
  });

  it('should render confirmation details after booking is done', async () => {
    render(<App />);

    const dateInput = screen.getByLabelText('Date');
    const timeInput = screen.getByLabelText('Time');
    const peopleInput = screen.getByLabelText('Number of awesome bowlers');
    const lanesInput = screen.getByLabelText('Number of lanes');
    const addShoeButton = screen.getByText('+');
    const bookButton = screen.getByText('strIIIIIike!');

    fireEvent.change(dateInput, { target: { value: '2023-10-10' } });
    fireEvent.change(timeInput, { target: { value: '18:00' } });
    fireEvent.change(peopleInput, { target: { value:'4' } });
    fireEvent.change(lanesInput, { target: { value: '1' } });

    for (let i = 0; i < 4; i++) {
      fireEvent.click(addShoeButton);
    }
    const shoeInputs = screen.getAllByLabelText(/Shoe size \/ person/);
    shoeInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: '42' } });
    });

    await waitFor(() => {
      fireEvent.click(bookButton);
    });

    const price = JSON.parse(sessionStorage.getItem('confirmation')).price;

    expect(screen.getByText('See you soon!')).toBeInTheDocument();
    expect(screen.getByLabelText('When').value).toBe('2023-10-10 18:00');
    expect(screen.getByLabelText('Who').value).toBe('4');
    expect(screen.getByLabelText('Lanes').value).toBe('1');
    expect(screen.getByLabelText('Booking number').value).toBe(
      '9999'
    );
    expect(screen.findByText(`${price} SEK`)).toBeDefined();
  });
});
