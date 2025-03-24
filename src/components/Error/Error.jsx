import styles from "./Error.module.less";

function Error({ message }) {
  return (
    <div className={styles.error}>
      <p>Упс... Что-то пошло не так</p>
      <p>{`Ошибка: ${message}`}</p>
    </div>
  );
}

export default Error;
