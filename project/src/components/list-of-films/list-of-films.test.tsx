import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import ListOfFilms from './list-of-films';
import HistoryRouter from '../history-router/history-router';
import { makeFakeFilm } from '../../utils/mocks';

const history = createMemoryHistory();

describe('Component: ListOfFilms', () => {
  it('Should rebder correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ListOfFilms films={ [makeFakeFilm({}), makeFakeFilm({}), makeFakeFilm({})] } />
      </HistoryRouter>
    );

    expect(screen.getAllByTestId('film_card')).toHaveLength(3);
  });
});
