import { rest } from 'msw';

export const handlers = [
  rest.post('/api/booking', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Booking successful' }));
  }),
];