import styles from "./ConfirnDeleteModal.module.less";

function ConfirmDeleteModal({
  setConfirmDeleteIsOpen,
  deleteItem,
  onDeleteSeminar,
}) {
  //Получаем id семинара для удаления
  const { id } = deleteItem;

  //Обработчик клика в модальном окне, удаление при подтверждении, закрытие окна при отмене
  function handleDeletionSubmit(e) {
    e.preventDefault();

    if (e.target.type === "submit") {
      onDeleteSeminar(id);
      setConfirmDeleteIsOpen(false);
    } else {
      setConfirmDeleteIsOpen(false);
    }
  }

  //Обработчик клика вне модального окна для закрытия
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
        <p>{`Удалить семинар ${deleteItem.title}?`}</p>
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
