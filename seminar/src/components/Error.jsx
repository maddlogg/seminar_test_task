function Error({ message }) {
  return (
    <div className="error">
      <p>Упс... Что-то пошло не так</p>
      <p>{`Ошибка: ${message}`}</p>
    </div>
  );
}

export default Error;
