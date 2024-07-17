import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

function IngredientsTable({ ingredients, setIngredients, register }) {
  const [ingredientsArray, setIngredientsArray] = useState([{ title: "" }]);

  const handleAddRow = () => {
    const newRow = { title: "", orderNumber: '0' };
    setIngredientsArray([...ingredientsArray, newRow]);
  };

  // const handleRemoveRow = (index) => {
  //   if (ingredientsArray.length > 1) {
  //     console.log("index = "+index);
  //     const newIngredientsArray = ingredientsArray.filter((_, i) => i !== index);
  //     console.log(newIngredientsArray);
  //     setIngredientsArray(newIngredientsArray);
  //   }
  // }

  const renderIngredients = (ingredient, index) => {
    return (
      <tr key={index}>
        <td>
          <input
            type="hidden"
            {...register(`ingredients.${index}.orderNumber`)}
            defaultValue={index}
          />

          <input
            type="text"
            name="title"
            placeholder="My ingredient title"
            className="form-control"
            // value={ingredient.title}
            // onChange={(event) => handleFormChange(index, event)}
            {...register(`ingredients.${index}.title`)}
          />
        </td>
        <td>
          <Button onClick={handleAddRow}>+</Button>
        </td>
        {/* <td>
          <Button onClick={() => handleRemoveRow(index)}>-</Button>
        </td> */}
      </tr>
    );
  };

  useEffect(() => {
    const getIngredients = async () => {
      try {
        if (ingredients.length > 0) {
          setIngredientsArray(ingredients);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getIngredients();
  }, [ingredients]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Ingredients</th>
        </tr>
      </thead>
      <tbody>{ingredientsArray.map(renderIngredients)}</tbody>
    </Table>
  );
}

export default IngredientsTable;
