import TinyBarChart from "./BarChart"
import { List } from "./List"
import styles from "./Transaction.module.css"

export const Transaction = () => {
  return (
    <div className={styles.tran_div}>
        <div className={styles.list_bar}>
          <div className={styles.list_container}>
            <List/>
          </div>
          <div className={styles.chart_container}>
            <TinyBarChart/>
          </div>
        </div>
    </div>
  )
}
