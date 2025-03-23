function Seminar({
  seminar,
  onDeleteSeminar,
  setConfirmDeleteIsOpen,
  setSeminarToEdit,
  setEditItemIsOpen,
}) {
  const { title, description, date, time, photo, id } = seminar;

  return (
    <li className="seminar-list__item">
      <div className="seminar-list__item__img-wrapper">
        <img src={photo} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>
        {date}, {time}
      </span>
      <div className="seminar-list__item__buttonset">
        <button
          onClick={() => {
            setSeminarToEdit(seminar);
            setEditItemIsOpen(true);
            setConfirmDeleteIsOpen(false);
          }}
        >
          Редактировать
        </button>
        <button
          onClick={() => {
            onDeleteSeminar(id);
            setConfirmDeleteIsOpen(true);
            setEditItemIsOpen(false);
          }}
        >
          Удалить
        </button>
      </div>
    </li>
  );
}

export default Seminar;
