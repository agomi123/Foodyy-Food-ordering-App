import express from 'express';
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import { createProductController,
    getAllProducts,
    getSingleProducts,
    getProductPhoto,
    DeleteProduct,
    UpdateProduct,
    FilterProductController,
    productCountController,
    productListController,
    searchProductController,
    GetSimilarProduct,
    productCategoryController,
    braintreeTokenController,
    braintreePaymentController

} from '../controllers/productController.js';
import formidable from 'express-formidable';

const router= express.Router()
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),UpdateProduct);
router.get('/getproducts',getAllProducts);
router.get('/getsingleproduct/:slug',getSingleProducts);

router.get('/getproductphoto/:pid',getProductPhoto);
router.delete('/product/:pid',DeleteProduct);

router.post('/product-filter',FilterProductController);
router.get('/product-count',productCountController);
router.get('/product-list/:page',productListController);
router.get("/search/:keyword", searchProductController);
router.get('/related-product/:pid/:cid',GetSimilarProduct);
router.get('/product-category/:slug',productCategoryController);

router.get('/braintree/token',braintreeTokenController);
router.post('/braintree/payment',requireSignIn,braintreePaymentController);
export default router


