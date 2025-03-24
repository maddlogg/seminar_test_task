import styles from "./ConfirnDeleteModal.module.less";

function ConfirmDeleteModal({
  setConfirmDeleteIsOpen,
  DeleteItem,
  onDeleteSeminar,
}) {
  const { id } = DeleteItem;

  function handleDeletionSubmit(e) {
    e.preventDefault();

    if (e.target.type === "submit") {
      onDeleteSeminar(id);
      setConfirmDeleteIsOpen(false);
    } else {
      setConfirmDeleteIsOpen(false);
    }
  }

  function handleOuterClick(e) {
    if (e.target.id === "delete-modal") {
      e.stopPropagation();
      setConfirmDeleteIsOpen(false);
    } else {
      return;
    }
  }

  return (
    <div
      id="delete-modal"
      className={styles.wrapper}
      onClick={handleOuterClick}
    >
      <div className={styles.modal}>
        <p>{`Удалить семинар ${DeleteItem.title}?`}</p>
        <div className={styles.buttonset}>
          <button type="submit" onClick={handleDeletionSubmit}>
            Да
          </button>
          <button type="button" onClick={handleDeletionSubmit}>
            Отмена
          </button>
        </div>
        <span className={styles.close} onClick={handleDeletionSubmit}>
          X
        </span>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
