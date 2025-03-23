import Seminar from "./Seminar";

function SeminarList({
  seminars,
  onDeleteSeminar,
  setConfirmDeleteIsOpen,
  setSeminarToEdit,
  setEditItemIsOpen,
}) {
  return (
    <ul className="seminar-list">
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
