import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(401).send({ message: "Name is Required" });
    const existingcategory = await categoryModel.findOne({ name });
    if (existingcategory)
      return res
        .status(200)
        .send({ success: true, message: "Category Already exist" });
    const cat = await new categoryModel({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "New Cat Created",
      cat, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};


//update

export const updateCategoryController= async(req,res)=>{
    try{
       const {name}=req.body;
       const {id}=req.params;
       const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
       res.status(200).send({
          success:true,
          message:'Category Updated Successfully',
          category
       })
    }
    catch(error){

      console.log(error);
      res.status(500).send({
        success:false,
        error,
        message:'Error while updating category'
      })
    }
};


export const getAllCategory = async(req,res)=>{
    try{
      const allcat= await categoryModel.find({})
      res.status(200).send({
        success:true,
        message:"Succesfully got all categories",
        allcat
      })
    }
    catch(error){
      console.log(error);
      res.status(500).send({
        success:false,
        error,
        message:'Error while getting category'
      })
    }
};


export const getSingleCategory = async(req,res)=>{
    try{
      
      const allcat= await categoryModel.findOne({slug:req.params.slug});
      res.status(200).send({
        success:true,
        message:"Succesfully specific all categories",
        allcat
      })
    }
    catch(error){
      console.log(error);
      res.status(500).send({
        success:false,
        error,
        message:'Error while getting category'
      })
    }
};

export const DeleteSingleCategory = async(req,res)=>{
    try{ 
      const {id}=req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success:true,
        message:'Category Deleted Successfully'
      })
     
    }
    catch(error){
      console.log(error);
      res.status(500).send({
        success:false,
        error,
        message:'Error while getting category'
      })
    }
};

