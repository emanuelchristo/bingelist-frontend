import styles from "./Empty.module.css"

export default function Empty() {
  const TOTAL_GIFS = 5

  // return (
  // 	<img
  // 		className={styles['image']}
  // 		src={`/images/nothing/nothing-${Math.floor(Math.random() * TOTAL_GIFS) + 1}.gif`}
  // 	/>
  // )

  return <div className={styles["empty"]}>Nothing here</div>
}
