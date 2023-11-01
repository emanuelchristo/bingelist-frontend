import { observer } from "mobx-react-lite"
import { dashboardStore } from "../../store/stores"

import MovieHeader from "../common/MovieHeader"
import Spinner from "../common/Spinner"
import MovieGrid from "../common/MovieGrid"

import AddSvg from "/src/assets/icons/add.svg?react"
import CloseSvg from "/src/assets/icons/close.svg?react"

import styles from "./SimilarPanel.module.css"

const SimilarPanel = observer(() => {
  return (
    <div className={styles["similar-panel"] + " card"}>
      <div className={styles["header"]}>
        <div className={styles["title-wrapper"]}>
          <span className={styles["header-title"]}>Similar</span>
        </div>
        <div className={styles["controls-wrapper"]}>
          {!dashboardStore?.similarReference ? (
            <button
              className={styles["add-button"]}
              onClick={() => {
                dashboardStore
                  .quickSearch()
                  .then((movie) => dashboardStore.similarAddReference(movie))
              }}
            >
              <AddSvg className={styles["add-icon"]} />
              <span>Add</span>
            </button>
          ) : (
            <button
              className={styles["remove-button"]}
              onClick={dashboardStore.similarRemoveReference}
            >
              <CloseSvg className={styles["remove-icon"]} />
              <span>Remove</span>
            </button>
          )}
        </div>
      </div>

      {!dashboardStore.similarReference && (
        <div className={styles["add-movie-wrapper"]}>
          Add something to start
        </div>
      )}

      {!!dashboardStore.similarReference && (
        <>
          {dashboardStore.similarReferenceDetials.fetchState === "success" ? (
            <div className={styles["content"]}>
              <div className={styles["movie-header-wrapper"]}>
                <MovieHeader
                  data={dashboardStore.similarReferenceDetials.details}
                />
              </div>
              {dashboardStore.similarMovies.fetchState === "success" ? (
                <div className={styles["similars"]}>
                  <MovieGrid movies={dashboardStore.similarMovies.movies} />
                </div>
              ) : (
                <div className={styles["loader-wrapper"]}>
                  <Spinner />
                </div>
              )}
            </div>
          ) : (
            <div className={styles["loader-wrapper"]}>
              <Spinner />
            </div>
          )}
        </>
      )}
    </div>
  )
})

export default SimilarPanel
