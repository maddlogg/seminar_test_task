import { useState } from "react";
import styles from "./EditItemModal.module.less";

function EditItemModal({
  seminarToEdit,
  setEditItemIsOpen,
  setSeminarToEdit,
  onSeminarEdit,
}) {
  const [editionResult, setEditionResult] = useState(seminarToEdit);
  const { title, description, date, time, photo } = editionResult;

  //Преобразование даты в формат, который воспринимает инпут с типом даты
  const dateFormat = date.split(".").reverse().join("-");

  //Обработчик ввода новых данных в окне редактирования
  //Если обработчик сраработает на инпут даты,
  //то его значение будет преобразовано в необходимый формат
  //В ином случае будет использовано значение без манипуляций
  function handleSeminarInputEdition(e) {
    if (e.target.name === "date") {
      setEditionResult({
        ...editionResult,
        [e.target.name]: e.target.value.split("-").reverse().join("."),
      });
    } else {
      setEditionResult({
        ...editionResult,
        [e.target.name]: e.target.value,
      });
    }
  }

  //Обработчик клика внутри модального окна
  //Если пользователь подтверждает изменения, они будут записаны и отправлены на сервер
  //В ином случае окно будет закрыто
  function handleEditionSubmit(e) {
    e.preventDefault();

    if (e.target.type === "submit") {
      onSeminarEdit(editionResult);
      setSeminarToEdit({});
      setEditItemIsOpen(false);
    } else {
      setEditItemIsOpen(false);
      setSeminarToEdit({});
    }
  }

  //Обработчик клика вне окна для его закрытия
  function handleOuterClick(e) {
    if (e.target.id === "edit-modal") {
      e.stopPropagation();
      setEditItemIsOpen(false);
      setSeminarToEdit({});
    } else {
      return;
    }
  }

  return (
    <div id="edit-modal" className={styles.wrapper} onClick={handleOuterClick}>
      <div className={styles.modal}>
        <p>{`Редактировать семинар ${title}`}</p>
        <form>
          <div className={styles.item}>
            <label htmlFor="title">Заголовок семинара</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleSeminarInputEdition}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="description">Описание семинара</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={handleSeminarInputEdition}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="date">Дата семинара</label>
            <input
              type="date"
              id="date"
              name="date"
              value={dateFormat}
              onChange={handleSeminarInputEdition}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="time">Время семинара</label>
            <input
              type="time"
              id="time"
              name="time"
              value={time}
              onChange={handleSeminarInputEdition}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="time">URL для фото семинара</label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={photo}
              onChange={handleSeminarInputEdition}
            ></input>
          </div>
          <div className={styles.buttonset}>
            <button type="submit" onClick={handleEditionSubmit}>
              Подтвердить изменения
            </button>
            <button type="button" onClick={handleEditionSubmit}>
              Отмена
            </button>
          </div>
        </form>
        <span className={styles.close} onClick={handleEditionSubmit}>
          X
        </span>
      </div>
    </div>
  );
}

export default EditItemModal;
