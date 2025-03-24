import Seminar from "../Seminar/index";
import styles from "./SeminarList.module.less";

function SeminarList({
  seminars,
  onDeleteSeminar,
  setConfirmDeleteIsOpen,
  setSeminarToEdit,
  setEditItemIsOpen,
}) {
  return (
    <ul className={styles.list}>
      {seminars?.map((seminar) => (
        <Seminar
          key={seminar.id}
          seminar={seminar}
          onDeleteSeminar={onDeleteSeminar}
          setConfirmDeleteIsOpen={setConfirmDeleteIsOpen}
          setSeminarToEdit={setSeminarToEdit}
          setEditItemIsOpen={setEditItemIsOpen}
        />
      ))}
    </ul>
  );
}

export default SeminarList;
