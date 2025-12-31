import React, { useMemo, useState } from "react";
import styles from "./List.module.css";
import { ListCard } from "./ListCard";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export const List = () => {
  const { list } = useContext(ExpenseContext);
  
  const sorted = useMemo(() => {
    return [...list].sort((a, b) => {
      const ai = Number(a.id ?? 0);
      const bi = Number(b.id ?? 0);
      if (ai && bi) return bi - ai;
      const ad = new Date(a.date ?? 0).getTime();
      const bd = new Date(b.date ?? 0).getTime();
      return bd - ad;
    });
  }, [list]);

  const latestThree = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const [page, setPage] = useState(0);
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(rest.length / pageSize));
  const start = page * pageSize;
  const paged = rest.slice(start, start + pageSize);
  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(pageCount - 1, p + 1));

  return (
    <div className={styles.list_div}>
      <h2>Recent Transactions</h2>
      <div className={styles.maped_list}>
        {latestThree.map((item) => (
          <ListCard
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            category={item.category}
            date={item.date}
          />
        ))}
      </div>
      {rest.length > 0 && (
        <>
          <div className={styles.pagination_header}>
            <p>More Transactions</p>
          </div>
          <div className={styles.maped_list}>
            {paged.map((item) => (
              <ListCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                category={item.category}
                date={item.date}
              />
            ))}
          </div>
          <div className={styles.pagination}>
            <button className={styles.page_btn} onClick={prev} disabled={page === 0}>
              Prev
            </button>
            <span className={styles.page_info}>
              Page {page + 1} of {pageCount}
            </span>
            <button className={styles.page_btn} onClick={next} disabled={page >= pageCount - 1}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
