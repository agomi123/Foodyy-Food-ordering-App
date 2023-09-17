import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";


import { createCategoryController,updateCategoryController,getAllCategory,getSingleCategory,DeleteSingleCategory } from "./../controllers/categoryController.js";
const router =express.Router()
//create-category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update category

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);

//get all category
router.get('/categories',getAllCategory);

//single categ
router.get('/single-category/:slug',getSingleCategory);

//delet-category

router.delete('/delete-category/:id',requireSignIn,isAdmin,DeleteSingleCategory);
export default router