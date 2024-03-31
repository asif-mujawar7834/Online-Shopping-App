import styles from "./style.module.css";
export const DeliveryTrack = ({ status }: { status: string }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dotwrapper}>
        <div
          className={`${styles.dot} ${
            status === "order confirmed" ||
            status === "out for delivery" ||
            status === "delivered"
              ? styles.active
              : ""
          }`}
        ></div>
        <span className="font-semibold text-xs sm:text-sm">
          Order Confirmed
        </span>
      </div>
      <div className={styles.dotwrapper}>
        <div
          className={`${styles.dot} ${
            status === "out for delivery" || status === "delivered"
              ? styles.active
              : ""
          }`}
        ></div>
        <span className="font-semibold text-xs sm:text-sm">
          Out For Delivery
        </span>
      </div>
      <div className={styles.dotwrapper}>
        <div
          className={`${styles.dot} ${
            status === "delivered" ? styles.active : ""
          }`}
        ></div>
        <span className="font-semibold text-xs sm:text-sm">Delivered</span>
      </div>
    </div>
  );
};
