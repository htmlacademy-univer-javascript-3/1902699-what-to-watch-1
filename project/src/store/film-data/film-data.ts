import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmData } from '../../types/state';
import { fetchFilms, fetchPromoFilm } from '../api-actions';
import { toast } from 'react-toastify';
import { toastifyOptions } from '../../const';
import { AllGenres } from '../../const';
import { getFilmGenres } from '../../utils/films-genres';

const initialState: FilmData = {
  listOfFilms: [],
  promoFilm: null,
  favouriteFilms: [],
  isLoading: true,
  currentGenre: AllGenres,
  genres: []
};

export const filmData = createSlice({
  name: NameSpace.MainPage,
  initialState,
  reducers: {
    changeCurrentGenre: (state, action) => {
      state.currentGenre = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.listOfFilms = action.payload;
        state.genres = getFilmGenres(action.payload);
        state.isLoading = false;
      })
      .addCase(fetchFilms.rejected, (state) => {
        toast.error('Couldn\'t get films', toastifyOptions);
      })
      .addCase(fetchPromoFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isLoading = false;
      });
  }
});

export const {changeCurrentGenre} = filmData.actions;
