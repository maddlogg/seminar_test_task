import styles from "./Seminar.module.less";

function Seminar({
  seminar,
  onDeleteSeminar,
  setConfirmDeleteIsOpen,
  setSeminarToEdit,
  setEditItemIsOpen,
}) {
  const { title, description, date, time, photo } = seminar;

  function handleButtonClick(e) {
    if (e.target.id === "edit") {
      setSeminarToEdit(seminar);
      setEditItemIsOpen(true);
      setConfirmDeleteIsOpen(false);
    } else if (e.target.id === "delete") {
      onDeleteSeminar(seminar);
      setConfirmDeleteIsOpen(true);
      setEditItemIsOpen(false);
    } else {
      return;
    }
  }

  return (
    <li className={styles.seminar}>
      <div className={styles.wrapper}>
        <img src={photo} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>
        {date}, {time}
      </span>
      <div className={styles.buttonset}>
        <button id="edit" onClick={handleButtonClick}>
          Редактировать
        </button>
        <button id="delete" onClick={handleButtonClick}>
          Удалить
        </button>
      </div>
    </li>
  );
}

export default Seminar;
