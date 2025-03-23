import { useState } from "react";

function EditItemModal({
  seminarToEdit,
  setEditItemIsOpen,
  setSeminarToEdit,
  onSeminarEdit,
}) {
  const [editionResult, setEditionResult] = useState(seminarToEdit);
  const { title, description, date, time, photo, id } = editionResult;

  const dateFormat = date.split(".").reverse().join("-");

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <p>{`Редактировать семинар ${id}`}</p>
        <form>
          <div className="form-item">
            <label htmlFor="title">Заголовок семинара</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) =>
                setEditionResult({
                  ...seminarToEdit,
                  title: `${e.target.value}`,
                })
              }
            ></input>
          </div>
          <div className="form-item">
            <label htmlFor="description">Описание семинара</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) =>
                setEditionResult({
                  ...seminarToEdit,
                  description: `${e.target.value
                    .split("-")
                    .reverse()
                    .join(".")}`,
                })
              }
            ></input>
          </div>
          <div className="form-item">
            <label htmlFor="date">Дата семинара</label>
            <input
              type="date"
              id="date"
              name="date"
              value={dateFormat}
              onChange={(e) =>
                setEditionResult({
                  ...seminarToEdit,
                  date: `${e.target.value.split("-").reverse().join(".")}`,
                })
              }
            ></input>
          </div>
          <div className="form-item">
            <label htmlFor="time">Время семинара</label>
            <input
              type="time"
              id="time"
              name="time"
              value={time}
              onChange={(e) =>
                setEditionResult({
                  ...seminarToEdit,
                  time: `${e.target.value}`,
                })
              }
            ></input>
          </div>
          <div className="form-item">
            <label htmlFor="time">URL для фото семинара</label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={photo}
              onChange={(e) =>
                setEditionResult({
                  ...seminarToEdit,
                  photo: `${e.target.value}`,
                })
              }
            ></input>
          </div>
          <div className="modal__buttonset">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                onSeminarEdit(editionResult);
                setSeminarToEdit({});
                setEditItemIsOpen(false);
              }}
            >
              Подтвердить изменения
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditItemIsOpen(false);
                setSeminarToEdit({});
              }}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItemModal;
