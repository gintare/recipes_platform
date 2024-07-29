import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteIngredient } from "../../../services/delete";

function IngredientsTable({ ingredients, setIngredients, register, setValue }) {
  const [ingredientsArray, setIngredientsArray] = useState([{ title: "" }]);

  const handleAddRow = () => {
    const newRow = { title: "", orderNumber: '0' };
    setIngredientsArray([...ingredientsArray, newRow]);
  };

  const handleRemoveRow = async (index) => {
    try{
      if (ingredientsArray.length > 1) {
        const ingredId = ingredients[index].ingredientId;
        await deleteIngredient(ingredId);
        const newIngredients = ingredients.filter((ingre) => ingre.ingredientId != ingredId);
        setIngredients(newIngredients);
      }
    }catch(error){
      console.log(error.message);
    }
    
  }

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
        <td>
          <Button onClick={() => handleRemoveRow(index)}>-</Button>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    if (ingredients.length > 0) {
      setIngredientsArray(ingredients);
      setValue('ingredients', ingredients, { shouldValidate: true });
    }
  }, [ingredients, setIngredients]);

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
