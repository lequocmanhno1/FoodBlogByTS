require(`../models/database`);
// import { json, RequestHandler } from  'express';
import express, {Request, Response, NextFunction} from 'express';
import Category from '../models/Category';
import Recipe from '../models/Recipe';
import {UploadedFile} from 'express-fileupload';

/**
 * GET /
 * HOMEPAGE
 */

export const homepage = async(req : Request, res: Response) => {
    
  try {
    const limitNumdber : number = 5;
    const categories  = await Category.find({}).limit(limitNumdber);    
    const lastest = await Recipe.find({}).sort({_id: -1}).limit(limitNumdber);

    const food = {lastest};
    
    res.render(`index`, { title: 'Homepage' , categories, food});
  } catch (error : any) {
    res.status(500).send({message: error.message || "Error Occureds"});
  }  
    
}


/**
 * GET /
 * CATEGORIES
 */

export const exploreCategories  = async(req: Request, res: Response) => {
    
  try {
    const limitNumdber = 5;
    const categories = await Category.find({}).limit(limitNumdber);    
    

    res.render(`categories`, { title: 'Cooking Blog - Categories' , categories});
  } catch (error : any) {
    res.status(500).send({message: error.message || "Error Occureds"});
  }  
}




/**
 * GET /recipe/:id
 * RECIPE
 */

 export const exploreRecipe  = async(req: Request, res: Response) => {
    
  try {
    let recipeID = req.params.id;
    const recipe = await Recipe.findById(recipeID);
    
    res.render(`recipe`, { title: 'Cooking Blog - Recipe', recipe});
  } catch (error : any) {
    res.status(500).send({message: error.message || "Error Occureds"});
  }  
}


/**
 * GET /categories/:id
 * Categories by Id
 */

 export const exploreCategoriesById  = async(req: Request, res: Response) => {
  try {
    let categoryId = req.params.id;
    const limitNumdber = 20;
    const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumdber);
    res.render(`categories`, { title: 'Cooking Blog - Recipe', categoryById});
  } catch (error : any) {
    res.status(500).send({message: error.message || "Error Occureds"});
  }  
}


/**
 * POST /search
 * Search recipe
 */

 export const searchRecipe  = async(req: Request, res: Response) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({ $text : {$search  : searchTerm , $diacriticSensitive: true }});
    // res.json(recipe);
    res.render(`search`, { title: 'Cooking Blog - Search', recipe});
  } catch (error : any) {
    res.status(500).send({message: error.message || "Error Occureds"});
  }
}


/**
 * GET /expole-lastest
 */

export const exploreLatest = async(req: Request, res: Response) => {
  try {
    const limitNumdber = 10;
    let recipe = await Recipe.find({}).sort({ _id : -1 }).limit(limitNumdber);

    res.render('explore-lastest', {title: 'Cooking Blog - Lastest', recipe});

  } catch (error: any) {
    res.status(500).send({message: error.message || "Error Occureds"});
  }
}

/**
 * GET /show-random
 */

export const showRandom = async(req: Request, res: Response) => {
  try {
    let numberRecipe = await Recipe.find({}).countDocuments();
    let random = Math.floor(Math.random() * numberRecipe);
    let recipe = await Recipe.findOne().skip(random).exec();

    //res.json(recipe);

    res.render('show-random', {title: 'Cooking Blog - Lastest', recipe});

  } catch (error:any) {
    res.status(500).send({message: error.message || "Error Occureds"});
  }
}

/**
 * GET /submit-recipe
 */

export const submitRecipe = async(req: Request, res: Response) => {
  try {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');

    res.render('submit-recipe', {title: 'Cooking Blog - Submit Recipe', infoErrorsObj,infoSubmitObj});
  } catch (error : any) {
    res.status(500).send({message: error.message || "Error Occureds"})
  }
}


/**
 * POST /submit-recipe
 */

 export const submitRecipeOnPost = async(req: Request, res: Response) => {
  try {
    let imageUploadFile ;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0){
      console.log('No files uploaded');
    } else {
      imageUploadFile = req.files.image as UploadedFile;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath,function(err){
        if (err) {
          res.status(500).send(err);
        }
      });
    }
    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });

    await newRecipe.save();
    req.flash('infoSubmit', 'Recipe has been added');
    res.redirect('submit-recipe');
  } catch (error : any) {
    req.flash('infoErrors',error);
    res.redirect('submit-recipe');
  }
}



//  async function updateRecipe(){
//   try {
//     const res = await Recipe.updateOne({name: 'current name', name: 'new name'});
//     res.n;//Number of document matched
//     res.nModified;//Number of document modified

//   } catch (error : any) {
//     console.log(error : any);
//   }
//  }

 //updateRecipe();


 
//  async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({name: 'current name;);'});

//   } catch (error : any) {
//     console.log(error : any);
//   }
//  }

 //deleteRecipe();
