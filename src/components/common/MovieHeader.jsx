import { observer } from "mobx-react-lite"
import { dashboardStore } from "../../store/stores"
import {
  formatGenres,
  formatMediaType,
  formatRating,
  formatDuration,
  getFlagEmoji,
} from "../../utils/movie-format"
import { FavButton, WatchedButton, ListButton } from "./ControlButtons"

import PlaySvg from "/src/assets/icons/play-circle.svg?react"
import RatingIcon from "/src/assets/logos/rating.png"
import Imdb from "/src/assets/logos/imdb.svg"

import styles from "./MovieHeader.module.css"

const MovieHeader = observer(({ data }) => {
  return (
    <div className={styles["main"]}>
      <div
        className={styles["poster"]}
        style={{ backgroundImage: `url('${data?.poster_path}')` }}
      ></div>
      <div className={styles["main-right"]}>
        <h3 className={styles["movie-title"]}>{data?.title ?? "--"}</h3>
        <div className={styles["movie-meta-wrapper"]}>
          <div className={styles["tag"]}>
            {formatMediaType(data?.media_type)}
          </div>
          <div className={styles["dot"]}></div>
          <span className={styles["meta-text"]}>
            {data?.release_date?.slice(0, 4) || "--"}
          </span>
          <div className={styles["dot"]}></div>
          <span className={styles["meta-text"]}>
            {formatDuration(data?.duration)}
          </span>
          <div className={styles["dot"]}></div>
          <span className={styles["meta-text"]}>
            {formatGenres(data?.genres)}
          </span>
        </div>
        <div className={styles["movie-meta-2-wrapper"]}>
          <div className={styles["controls-wrapper"]}>
            <FavButton
              fav={
                dashboardStore.getMovieWaFa({
                  id: data?.id,
                  media_type: data?.media_type,
                })?.faved
              }
              onClick={() =>
                dashboardStore.favMovie({
                  id: data?.id,
                  media_type: data?.media_type,
                })
              }
            />
            <WatchedButton
              watched={
                dashboardStore.getMovieWaFa({
                  id: data?.id,
                  media_type: data?.media_type,
                })?.watched
              }
              onClick={() =>
                dashboardStore.watchedMovie({
                  id: data?.id,
                  media_type: data?.media_type,
                })
              }
            />
            <ListButton onClick={() => dashboardStore.addToList(data)} />
          </div>
          <div className={styles["separator"]}></div>

          <div className={styles["rt-wrapper"]}>
            <img src={RatingIcon} />
            <span>{formatRating(data?.vote_average)}</span>
          </div>
          <div className={styles["separator"]}></div>
          <div className={styles["imdb-wrapper"]}>
            <img src={Imdb} />
            <span>--</span>
          </div>
          <div className={styles["separator"]}></div>
          <div className={styles["country-wrapper"]}>
            <span className={styles["flag"]}>
              {getFlagEmoji(data?.country) ?? "🏳️"}
            </span>
            <span>{data?.language?.name || "--"}</span>
          </div>
        </div>
        <button
          className={styles["trailer-button"]}
          disabled={!data?.trailer_url}
          onClick={() => dashboardStore.playTrailer(data?.trailer_url)}
        >
          <PlaySvg className={styles["play-icon"]} />
          <span>Play trailer</span>
        </button>
      </div>
    </div>
  )
})

export default MovieHeader
