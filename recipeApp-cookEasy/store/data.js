import { createID } from "../utils/createID";
import { SET_APP_DATA } from "../utils/storeDataAS";


const MODULE_NAME = "data";
export const getRecipes = (state) => state[MODULE_NAME].recipes;
export const selectSingleRecipeByID = (state, ID) =>
  getRecipes(state).find((recipe) => recipe.id === ID);

const initialState = {
    recipes: [
      {
        id: createID(),
        name: "Cheese Burger",
        duration: "20min",
        portion: "1",
        imageUri: 
        "https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg",

        ingredients: [
          
                        { id: createID(), title: "Bread", unit: "kg", count: "1"},
                        { id: createID(), title: "Beef", unit: "g", count: "100"},
                        { id: createID(), title: "Salt", unit: "pkg", count: "1"},
                        { id: createID(), title: "Tomatoes", unit: "kg", count: "1"},
                        { id: createID(), title: "Cheese", unit: "kg", count: "0,3"},
                     
                  ],
        description: "    To make the hamburger patties, you are going to need ground beef, your favorite seasoning blend- I included the recipe for mine!, shredded cheese and sliced cheese."
        },
        {
            id: createID(),
            name: "Tarte-Tatin",
            duration: "40min",
            portion: "5",
            imageUri: "https://assets.afcdn.com/recipe/20180503/79001_w1024h768c1cx2880cy1920.jpg",
            ingredients: [
              
                            { id: createID(), title: "flour", unit: "kg", count: "1"},
                            { id: createID(), title: "apple", unit: "g", count: "500"},
                            { id: createID(), title: "sugar", unit: "g", count: "400"},
                            { id: createID(), title: "milk", unit: "pkg", count: "1"},                
                      ],
            description: "Peel, quarter and core the apples. Put the sugar in a flameproof 20cm ceramic tatin dish or a 20cm ovenproof heavy-based frying pan and place over a medium-high heat. Cook the sugar for 5-7 mins to a dark amber caramel syrup that's starting to smoke, then turn off the heat and stir in the 60g diced chilled butter."
            },
                  
    ],
  };

  
export function dataReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_APP_DATA:
            return {
              ...state,
              ...payload.recipes,
            };
      
      default:
        return state;
    }
  }