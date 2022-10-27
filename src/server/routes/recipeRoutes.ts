//import { Router } from "express";
var express = require(`express`);
const router = express.Router();

import * as  recipeController from '../controllers/recipeController';


/**
 * App Routes
 */

//GET
router.get(`/`,recipeController.homepage);
router.get('/categories',recipeController.exploreCategories);
router.get('/recipe/:id', recipeController.exploreRecipe);
router.get('/categories/:id',recipeController.exploreCategoriesById);
router.get('/explore-latest',recipeController.exploreLatest);
router.get('/show-random',recipeController.showRandom);
router.get('/submit-recipe',recipeController.submitRecipe);

//POST
router.post('/search',recipeController.searchRecipe);
router.post('/submit-recipe',recipeController.submitRecipeOnPost);


export default router;