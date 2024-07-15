import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';

function IngredientsTable({ ingredients, setIngredients, register }) {
  const [ingredientsArray, setIngredientsArray] = useState([{ title: '' }]);

  const handleAddRow = () => {
    const newRow = { title: '' };
    setIngredientsArray([...ingredientsArray, newRow]);
  };

  

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

  useEffect(() => {
     const getIngredients = async () => {
       try{
          if(ingredients.length > 0 ) {
            setIngredientsArray(ingredients);
          }
         
       }catch(error){
          console.log(error.message);
       }
     }
     getIngredients();
  }, [ingredients]);

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
