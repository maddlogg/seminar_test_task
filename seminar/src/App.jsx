import { useState, useEffect } from "react";
import "./App.css";
import SeminarList from "./components/SeminarList";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import EditItemModal from "./components/EditItemModal";
import Loader from "./components/Loader";
import Error from "./components/Error";
import { _get, _post, _patch, _delete } from "./api-requests/Api.js";

function App() {
  const [seminars, setSeminars] = useState([]);
  const [idDeleteItem, setIdDeleteItem] = useState("");
  const [сonfirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false);
  const [seminarToEdit, setSeminarToEdit] = useState({});
  const [editItemIsOpen, setEditItemIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //Запрос данных для первоначального рендеринга
  useEffect(function () {
    getData();
  }, []);

  async function getData() {
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

  async function deleteData(id) {
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

  async function editData(item) {
    try {
      const res = await _patch(`/seminars/${item.id}`);

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
    deleteData(id);
  }

  //Функция редактирования данных элемента на сервере
  function handleSeminarEdit(item) {
    editData(item);
  }

  return (
    <div className="app">
      <h1 className="title">Доступные семинары</h1>
      {/* Рендеринг списка элементов */}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <SeminarList
          seminars={seminars}
          onDeleteSeminar={setIdDeleteItem}
          setConfirmDeleteIsOpen={setConfirmDeleteIsOpen}
          setSeminarToEdit={setSeminarToEdit}
          setEditItemIsOpen={setEditItemIsOpen}
        />
      )}
      {error && <Error message={error} />}
      {/* Рендеринг модльного окна удаления элемента, при условии, что ни один
      элемент не редактируется */}
      {сonfirmDeleteIsOpen && !editItemIsOpen && (
        <ConfirmDeleteModal
          setConfirmDeleteIsOpen={setConfirmDeleteIsOpen}
          idDeleteItem={idDeleteItem}
          onDeleteSeminar={handleDeleteSeminar}
        />
      )}
      {/* Рендеринг модльного окна удаления элемента, при условии, что модальное
      окно удаления закрыто */}
      {!сonfirmDeleteIsOpen && editItemIsOpen && (
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
