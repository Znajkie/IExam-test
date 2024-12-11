import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Booking from '../../views/Booking';
import { describe, it, expect } from 'vitest';

describe('Booking Component', () => {
  it('should update booking details when date and time are selected', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/date/i);
    const timeInput = screen.getByLabelText(/time/i);

    fireEvent.change(dateInput, { target: { value: '2023-10-10' } });
    fireEvent.change(timeInput, { target: { value: '18:00' } });

    expect(dateInput.value).toBe('2023-10-10');
    expect(timeInput.value).toBe('18:00');
  });

  it('should allow the user to enter the number of players', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const playersInput = screen.getByLabelText(/number of awesome bowlers/i);
    fireEvent.change(playersInput, { target: { value: '5' } });

    expect(playersInput.value).toBe('5');
  });

  it('should allow the user to reserve lanes based on the number of players', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const playersInput = screen.getByLabelText(/number of awesome bowlers/i);
    fireEvent.change(playersInput, { target: { value: '10' } });

    const lanesInput = screen.getByLabelText(/number of lanes/i);
    fireEvent.change(lanesInput, { target: { value: '2' } });

    expect(playersInput.value).toBe('10');
    expect(lanesInput.value).toBe('2');
  });

  it('should show an error message if fields are empty', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const submitButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/alla fälten måste vara ifyllda/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show an error message if there are more than 4 players per lane', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

        const dateInput = screen.getByLabelText(/date/i);
        const timeInput = screen.getByLabelText(/time/i);

        fireEvent.change(dateInput, { target: { value: '2023-10-10' } });
        fireEvent.change(timeInput, { target: { value: '18:00' } });

        expect(dateInput.value).toBe('2023-10-10');
        expect(timeInput.value).toBe('18:00');

    const addShoeButton = screen.getByText('+');
    for (let i = 0; i < 5; i++) {
      fireEvent.click(addShoeButton);
    }

    const shoeSizeInputs = screen.getAllByLabelText(/shoe size/i);
    const shoeSizes = ['42', '43', '42', '43', '42'];

    shoeSizes.forEach((size, index) => {
      fireEvent.change(shoeSizeInputs[index], { target: { value: size } });
      expect(shoeSizeInputs[index].value).toBe(size);
    });

    const playersInput = screen.getByLabelText(/number of awesome bowlers/i);
    fireEvent.change(playersInput, { target: { value: '5' } });

    const lanesInput = screen.getByLabelText(/number of lanes/i);
    fireEvent.change(lanesInput, { target: { value: '1' } });

    const submitButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      /det får max vara 4 spelare per bana/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('should allow the user to enter shoe sizes for each player', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const addShoeButton = screen.getByText('+');
    fireEvent.click(addShoeButton);

    const shoeSizeInput = screen.getByLabelText(/shoe size/i);
    fireEvent.change(shoeSizeInput, { target: { value: '42' } });

    expect(shoeSizeInput.value).toBe('42');
  });

  it('should allow the user to change shoe sizes for each player', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const addShoeButton = screen.getByText('+');
    fireEvent.click(addShoeButton);

    const shoeSizeInput = screen.getByLabelText(/shoe size/i);
    fireEvent.change(shoeSizeInput, { target: { value: '42' } });
    fireEvent.change(shoeSizeInput, { target: { value: '43' } });

    expect(shoeSizeInput.value).toBe('43');
  });

  it('should allow the user to select shoe sizes for all players in the booking', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const addShoeButton = screen.getByText('+');
    fireEvent.click(addShoeButton);
    fireEvent.click(addShoeButton);

    const shoeSizeInputs = screen.getAllByLabelText(/shoe size/i);
    fireEvent.change(shoeSizeInputs[0], { target: { value: '42' } });
    fireEvent.change(shoeSizeInputs[1], { target: { value: '43' } });

    expect(shoeSizeInputs[0].value).toBe('42');
    expect(shoeSizeInputs[1].value).toBe('43');
  });

    it('should allow the user to remove a shoe size field', () => {
      render(
        <MemoryRouter>
          <Booking />
        </MemoryRouter>
      );
      const addShoeButton = screen.getByText('+');
      fireEvent.click(addShoeButton);
      fireEvent.click(addShoeButton);

      let shoeSizeInputs = screen.getAllByLabelText(/shoe size/i);
      expect(shoeSizeInputs.length).toBe(2);

      const removeShoeButton = screen.getAllByText('-')[0];
      fireEvent.click(removeShoeButton);

      shoeSizeInputs = screen.getAllByLabelText(/shoe size/i);
      expect(shoeSizeInputs.length).toBe(1);
    });
});
