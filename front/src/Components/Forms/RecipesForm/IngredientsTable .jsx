import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

function IngredientsTable({ ingredients, setIngredients, register }) {
  const [ingredientsArray, setIngredientsArray] = useState([{ title: '' }]);

  const handleAddRow = () => {
    const newRow = { title: '' };
    setIngredientsArray([...ingredientsArray, newRow]);
  };

//   const handleFormChange = (index, event) => {
//     const newIngredientsArray = [...ingredientsArray];
//     newIngredientsArray[index][event.target.name] = event.target.value;

//     // Update the local state
//     setIngredientsArray(newIngredientsArray);

//     // Update the parent state
//     setIngredients(newIngredientsArray);
//     console.log(ingredients);

//   };

  const renderIngredients = (ingredient, index) => {
    return (
      <tr key={index}>
        <td>
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
      </tr>
    );
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Ingredients</th>
        </tr>
      </thead>
      <tbody>
        {ingredientsArray.map(renderIngredients)}
      </tbody>
    </Table>
  );
}

export default IngredientsTable;
