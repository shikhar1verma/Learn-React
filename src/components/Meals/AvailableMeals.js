import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-custom-hooks-abf71-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw Error("Something went wrong!!!");
      }
      const responseData = await response.json();
      setMeals(responseData);
      setIsLoading(false);
      setError(false);
    };
    fetchMeals().catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes["meals-loading"]}>Content is loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p className={classes["meals-fetching-error"]}>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
