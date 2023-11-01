import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { dashboardStore } from "../../store/stores"

import MovieContent from "../common/MovieContent"
import ShuffleSvg from "/src/assets/icons/shuffle.svg?react"

import styles from "./RandomPanel.module.css"

const RandomPanel = observer(() => {
  useEffect(() => {
    dashboardStore.fetchRandom()
  }, [])

  return (
    <div className={styles["random-panel"] + " card"}>
      <div className={styles["header"]}>
        <div className={styles["title-wrapper"]}>
          <span className={styles["header-title"]}>Random</span>
        </div>
        <div className={styles["controls-wrapper"]}>
          <button
            className={styles["shuffle-button"]}
            onClick={dashboardStore.fetchRandom}
          >
            <ShuffleSvg className={styles["shuffle-icon"]} />
            <span>Shuffle</span>
          </button>
        </div>
      </div>
      <div className={styles["content"]}>
        <MovieContent
          data={dashboardStore.random?.movie}
          loading={dashboardStore.random?.fetchState !== "success"}
        />
      </div>
    </div>
  )
})

export default RandomPanel
