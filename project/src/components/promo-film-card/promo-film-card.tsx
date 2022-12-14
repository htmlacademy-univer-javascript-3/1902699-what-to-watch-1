import { useNavigate } from 'react-router-dom';
import { Film } from '../../types/film';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFavouriteFilms, getAuthorizationStatus } from '../../store/user-process/selectors';
import { changeFavoriteFilmStatus } from '../../store/api-actions';

type PromoFilmCardProps = {
  film: Film
}

function PromoFilmCard({film} : PromoFilmCardProps) : JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {name, genre, released, posterImage, id} = film;

  const favoriteFilms = useAppSelector(getFavouriteFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const onMyListButton = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      let status: number;
      const filmId = String(id);

      if (film.isFavorite) { status = 0; }
      else { status = 1; }

      dispatch(changeFavoriteFilmStatus({filmId, status}));
    } else {
      navigate(`${AppRoute.Login}`);
    }
  };

  const onPlayButton = () => {
    navigate(`${AppRoute.Player}/${id}`);
  };

  return (
    <div className="film-card__wrap" data-testid="promo_film">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>

        <div className="film-card__desc">
          <h2 className="film-card__title">{name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{genre}</span>
            <span className="film-card__year">{released}</span>
          </p>

          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button" onClick={() => onPlayButton()}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <button className="btn btn--list film-card__button" type="button" onClick={() => onMyListButton()}>
              <svg viewBox="0 0 19 20" width="19" height="20">
                {
                  film.isFavorite
                    ? <use xlinkHref="#in-list"></use>
                    : <use xlinkHref="#add"></use>
                }
              </svg>
              <span>My list</span>
              <span className="film-card__count">{favoriteFilms.length}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoFilmCard;
