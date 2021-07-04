import { useState } from "react";

function PromoChoice(props) {
  const [value, setValue] = useState("queen");

  const handleChange = (e) => {
    const choice = e.target.value;
    setValue(choice);
    props.onChange(choice);
  };

  return (
    <div>
      <select value={value} onChange={handleChange}>
        <option value="queen">Queen</option>
        <option value="rook">Rook</option>
        <option value="bishop">Bishop</option>
        <option value="knight">Knight</option>
      </select>
    </div>
  );
}

export default PromoChoice;
