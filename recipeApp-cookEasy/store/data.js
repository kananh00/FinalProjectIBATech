import { createID } from "../utils/createID";
import { SET_APP_DATA } from "../utils/storeDataAS";
import { selectAuthUsername } from "./auth";

const ADD_RECIPE = "ADD_RECIPE";
const ADD_INGREDIENT = "ADD_INGREDIENT";
const DELETE_RECIPE = "DELETE_RECIPE";
const UPDATE_RECIPE = "UPDATE_RECIPE";
const UPDATE_INGREDIENT = "UPDATE_INGREDIENTS";
const ADD_COMMENT = "ADD_COMMENT";
// const username = selectAuthUsername(state);

const MODULE_NAME = "data";
export const getRecipes = (state) => state[MODULE_NAME].recipes;

export const selectSingleRecipeByID = (state, ID) =>
  getRecipes(state).find((recipe) => recipe.id === ID);

const initialState = {
  recipes: [
    {
      id: createID(),
      name: "Cheese Burger",
      duration: "20",
      durationType: "min",
      username: "Helen",
      photo:
        "https://img.favpng.com/8/17/11/chef-s-uniform-french-cuisine-woman-restaurant-png-favpng-Gb9et2NQUv9GKdAX5AyR9W8GE.jpg",
      portion: "1",
      description:
        "    To make the hamburger patties, you are going to need ground beef, your favorite seasoning blend- I included the recipe for mine!, shredded cheese and sliced cheese.",
      imageUri: "https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg",

      ingredients: [
        { id: createID(), title: "Bread", unit: "kg", count: "1" },
        { id: createID(), title: "Beef", unit: "g", count: "100" },
        { id: createID(), title: "Salt", unit: "pkg", count: "1" },
        { id: createID(), title: "Tomatoes", unit: "kg", count: "1" },
        { id: createID(), title: "Cheese", unit: "kg", count: "0,3" },
      ],
      comments: [
        {
          id: createID(),
          username: "Tim",
          uPhoto:
            "https://www.mantruckandbus.com/fileadmin/media/bilder/020/mit-18-monaten-planungszeit-stefan-sahlmann-header.jpg",
          text: "Looks perfect))",
        },
        {
          id: createID(),
          username: "Brad",
          uPhoto:
            "https://www.mantruckandbus.com/fileadmin/media/bilder/02_19/219_05_busbusiness_interviewHeader_1485x1254.jpg",
          text: "Just try now, and it taste so delicious.",
        },
      ],
    },
    {
      id: createID(),
      name: "Tarte-Tatin",
      duration: "40",
      portion: "5",
      durationType: "min",
      username: "Mike",
      photo:
        "https://previews.123rf.com/images/kurhan/kurhan1702/kurhan170200709/72799627-chef-man-.jpg",
      imageUri:
        "https://assets.afcdn.com/recipe/20180503/79001_w1024h768c1cx2880cy1920.jpg",
      description: "tarte-tatin recipe",
      ingredients: [
        { id: createID(), title: "flour", unit: "kg", count: "1" },
        { id: createID(), title: "apple", unit: "g", count: "500" },
        { id: createID(), title: "sugar", unit: "g", count: "400" },
        { id: createID(), title: "milk", unit: "pkg", count: "1" },
      ],
      comments: [
        {
          id: createID(),
          username: "Tomas",
          uPhoto:
            "https://post.healthline.com/wp-content/uploads/2019/09/man-city-urban-walking-serious-732x549-thumbnail.jpg",
          text: "Thanks for sharing this)",
        },
        {
          id: createID(),
          username: "Helen",
          uPhoto:
            "https://previews.123rf.com/images/serezniy/serezniy1302/serezniy130204417/21540408-young-woman-chef-cooking-in-kitchen.jpg",
          text: "Also, can add some lemon juice",
        },
      ],
    },
  ],
};

export function dataReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes,
          {
            id: payload.recipeID,
            username: payload.userName,
            photo: payload.userPhoto,
            name: payload.recipeTitle,
            imageUri: payload.recipeImage,
            duration: payload.recipeDuration,
            durationType: payload.durationType,
            portion: payload.recipePortion,
            description: payload.recipeDesc,
            ingredients: [],
            comments: [],
          },
        ],
      };
    case ADD_INGREDIENT: {
      return {
        ...state,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === payload.recipeID) {
            return {
              ...recipe,
              ingredients: [
                {
                  id: createID(),
                  title: payload.ingredient?.title,
                  count: payload.ingredient?.count,
                  unit: payload.ingredient?.unit,
                },
                ...recipe.ingredients,
              ],
            };
          }
          return recipe;
        }),
      };
    }
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) => recipe.id !== payload.recipeID
        ),
      };

    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === payload.recipeID) {
            return {
              ...recipe,
              name: payload.recipe?.name,
              imageUri: payload.recipe?.imageUri,
              duration: payload.recipe?.duration,
              portion: payload.recipe?.portion,
              description: payload.recipe?.description,
            };
          }
          return recipe;
        }),
      };
    case UPDATE_INGREDIENT:
      return {
        ...state,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === payload.recipeID) {
            return {
              ...recipe,
              ingredients: recipe.ingredients.map((ingredient) => {
                if (ingredient.id === payload.ingredient?.id) {
                  return {
                    ...ingredient,
                    title: payload.ingredient?.title,
                    unit: payload.ingredient?.unit,
                    count: payload.ingredient?.count,
                  };
                }
                return ingredient;
              }),
            };
          }
          return recipe;
        }),
      };
    case ADD_COMMENT: {
      return {
        ...state,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === payload.recipeID) {
            return {
              ...recipe,
              comments: [
                {
                  id: createID(),
                  uPhoto: payload.comment?.uPhoto,
                  text: payload.comment?.text,
                },
                ...recipe.comments,
              ],
            };
          }
          return recipe;
        }),
      };
    }
    case SET_APP_DATA:
      return {
        ...state,
        ...payload.recipes,
      };

    default:
      return state;
  }
}

export const addRecipe = (payload) => ({
  type: ADD_RECIPE,
  payload,
});
export const addIngredient = (payload) => ({
  type: ADD_INGREDIENT,
  payload,
});
export const deleteRecipe = (payload) => ({
  type: DELETE_RECIPE,
  payload,
});
export const updateRecipe = (payload) => ({
  type: UPDATE_RECIPE,
  payload,
});
export const updateIngredient = (payload) => ({
  type: UPDATE_INGREDIENT,
  payload,
});
export const addComment = (payload) => ({
  type: ADD_COMMENT,
  payload,
});
