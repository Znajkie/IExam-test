import { server } from './src/mocks/server';
import '@testing-library/jest-dom';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
