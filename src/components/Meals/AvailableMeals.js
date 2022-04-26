
import React from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
import { useEffect,useState} from 'react';

const AvailableMeals = props =>{
    const [meals,setMeals] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError] = useState(null);
    useEffect(()=>{
      const  fetchMeals= async ()=> {
        console.log()
        const response = await  fetch(`${process.env.REACT_APP_FIREBASE_URL_MEALS}`);
        if(!response.ok){
          throw new Error('Something Went Wrong');
        }
        const meals = await response.json();
        const loadedMeals = [];
        

        for(const key in meals){
          loadedMeals.push({
            id:key,
            name:meals[key].name,
            description:meals[key].description,
            price:meals[key].price,
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      }

        fetchMeals().then().catch(error=>{
          setIsLoading(false);
          setHttpError(error.message)
        });
    },[]);


    if(isLoading){
      return <section className={styles.MealsLoading}>
        <p>Loading....</p>
      </section>
    }
    if(httpError){
      return <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    }
    const mealsList = meals.map(meal=><MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>)
    return (<section className={styles.meals}>
      
      <Card>
          <ul>
              {mealsList}
          </ul>
        </Card>
    </section>)
};
export default AvailableMeals;