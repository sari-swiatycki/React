//// זה עובד שינוי אחרי יעלי

import React from "react"
import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router"
import AppLayout from "./components/AppLayout"
import Home from "./components/Home"
import LogIn from "./components/LogIn"
import Avatar from "./components/Avatar"
import UpDate from "./components/UpDate"
import RecipesLayout from "./components/RecipeLayout"
import ShowRecipe from "./components/ShowRecipe"
import AddRecipeForm from "./components/AddRecipes"
export const MyRouter = createBrowserRouter([
   { path: '/',
      element: <AppLayout />,
      errorElement: <>error element</>,
      children: [
    
         { path: 'UpDate', element: <UpDate /> },
         {
            path: '/', element: <Home />,
            children: [            
               {
                  path: '/RecipesList', element: <RecipesLayout />,
                  children: [                     
                     { path: 'Recipe/:id', element: <ShowRecipe /> },
                  ]                
               },              
            ]    
                    
        },
       
       
        
]
   }
])





























// children: [
//    { path: 'Avatar', element: <Avatar /> },
//    { path: 'UpDate', element: <UpDate /> },
//    { path: '/', element: <Home /> },
//    {
//       path: '/RecipesList', element: <RecipesLayout />,
//       children: [
//          { path: 'Recipe/:id', element: <ShowRecipe /> },
//       ]
//    },
//    {path:'/AddRecipe',element:<AddRecipeForm/>},
//    // { path: 'Recipe/:id/', element: <ShowRecipe />, errorElement: <>Error</> },

// ]






















