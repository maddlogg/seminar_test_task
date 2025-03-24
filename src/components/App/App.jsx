import { useState, useEffect } from "react";
import SeminarList from "../SeminarList/index.js";
import ConfirmDeleteModal from "../ConfirmDeleteModal/index.js";
import EditItemModal from "../EditItemModal/index.js";
import Loader from "../Loader/index.js";
import Error from "../Error/index.js";
import { _get, _post, _patch, _delete } from "../../api-requests/api.js";
import styles from "./App.module.less";

function App() {
  const [seminars, setSeminars] = useState([]);
  const [deleteItem, setdeleteItem] = useState({});
  const [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false);
  const [seminarToEdit, setSeminarToEdit] = useState({});
  const [editItemIsOpen, setEditItemIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //Запрос данных для первоначального рендеринга
  useEffect(function () {
    getSeminars();
  }, []);

  async function getSeminars() {
    try {
      setIsLoading(true);
      const res = await _get("/seminars");

      if (res.statusText !== "OK") {
        throw new Error(res.statusText);
      }

      setSeminars(res.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteSeminar(id) {
    try {
      const res = await _delete(`/seminars/${id}`);

      if (res.statusText !== "OK") {
        throw new Error(res.statusText);
      }

      console.log(`Семинар ${id} успешно удален`);

      setSeminars((seminars) =>
        seminars.filter((seminar) => seminar.id !== id)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async function editSeminar(item) {
    try {
      const res = await _patch(`/seminars/${item.id}`, item);

      if (res.statusText !== "OK") {
        throw new Error(res.statusText);
      }

      console.log(`Семинар ${item.id} успешно отредактирован`);

      setSeminars((seminars) =>
        seminars.map((seminar) => {
          if (seminar.id === item.id) {
            return { ...seminar, ...item };
          }
          return seminar;
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  //Функция удаления элемента списка с сервера
  function handleDeleteSeminar(id) {
    deleteSeminar(id);
  }

  //Функция редактирования данных элемента на сервере
  function handleSeminarEdit(item) {
    editSeminar(item);
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Доступные семинары</h1>
      {/* Рендеринг списка элементов */}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <SeminarList
          seminars={seminars}
          onDeleteSeminar={setdeleteItem}
          setConfirmDeleteIsOpen={setConfirmDeleteIsOpen}
          setSeminarToEdit={setSeminarToEdit}
          setEditItemIsOpen={setEditItemIsOpen}
        />
      )}
      {error && <Error message={error} />}
      {/* Рендеринг модльного окна удаления элемента, при условии, что ни один
      элемент не редактируется */}
      {confirmDeleteIsOpen && !editItemIsOpen && (
        <ConfirmDeleteModal
          setConfirmDeleteIsOpen={setConfirmDeleteIsOpen}
          deleteItem={deleteItem}
          onDeleteSeminar={handleDeleteSeminar}
        />
      )}
      {/* Рендеринг модльного окна удаления элемента, при условии, что модальное
      окно удаления закрыто */}
      {!confirmDeleteIsOpen && editItemIsOpen && (
        <EditItemModal
          seminarToEdit={seminarToEdit}
          setEditItemIsOpen={setEditItemIsOpen}
          setSeminarToEdit={setSeminarToEdit}
          onSeminarEdit={handleSeminarEdit}
        />
      )}
    </div>
  );
}

export default App;
