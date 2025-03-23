function ConfirmDeleteModal({
  setConfirmDeleteIsOpen,
  idDeleteItem,
  onDeleteSeminar,
}) {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <p>{`Удалить семинар ${idDeleteItem}?`}</p>
        <div className="modal__buttonset">
          <button
            onClick={() => {
              onDeleteSeminar(idDeleteItem);
              setConfirmDeleteIsOpen(false);
            }}
          >
            Да
          </button>
          <button onClick={() => setConfirmDeleteIsOpen(false)}>Отмена</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
