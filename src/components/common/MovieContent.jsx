import { observer } from "mobx-react-lite"

import CastItem from "./CastItem"
import Spinner from "./Spinner"
import MovieHeader from "./MovieHeader"

import styles from "./MovieContent.module.css"

const MovieContent = observer(({ data, loading }) => {
  if (loading)
    return (
      <div className={styles["loading-wrapper"]}>
        <Spinner />
      </div>
    )
  else
    return (
      <div className={styles["content-container"]}>
        <div>
          <MovieHeader data={data} />
        </div>
        {data?.synopsis && (
          <div className={styles["synopsis"]}>
            <span className={styles["section-title"]}>Synopsis</span>
            <p className={styles["normal-text"]}>{data?.synopsis || "--"}</p>
          </div>
        )}

        {data?.credits?.length > 0 && (
          <div className={styles["info-items"]}>
            {data?.credits?.map((item, index) => (
              <div className={styles["info-item"]} key={index}>
                <span className={styles["section-title"]}>
                  {item?.title || "--"}
                </span>
                <span className={styles["normal-text"]}>
                  {item?.name || "--"}
                </span>
              </div>
            ))}
          </div>
        )}

        {!!data?.casts && (
          <div className={styles["top-cast"]}>
            <span className={styles["section-title"]}>Top cast</span>
            <div className={styles["cast-wrapper"]}>
              {data?.casts?.map((item, index) => (
                <CastItem
                  key={index}
                  name={item?.name}
                  role={item?.role}
                  imgSrc={item?.img_url}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
})

export default MovieContent
