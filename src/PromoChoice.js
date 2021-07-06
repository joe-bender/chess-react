function PromoChoice(props) {
  const handleChange = (e) => {
    const choice = e.target.value;
    props.onChange(choice);
  };

  return (
    <div>
      <h3>Choose a piece:</h3>
      <button type="button" value="queen" onClick={handleChange}>
        Queen
      </button>
      <button type="button" value="rook" onClick={handleChange}>
        Rook
      </button>
      <button type="button" value="bishop" onClick={handleChange}>
        Bishop
      </button>
      <button type="button" value="knight" onClick={handleChange}>
        Knight
      </button>
    </div>
  );
}

export default PromoChoice;
