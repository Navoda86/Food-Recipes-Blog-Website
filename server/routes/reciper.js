const express = require('express');
const router = express.Router();
const recipec = require('../controllers/recipec');


const verifyLogin = (req,res,next) => {
    if(req.session.userLoggedIn){
      next();
    }
    else{
      res.redirect('/signin')
    }
  }
/**foodblogapp routes */

router.get('/', recipec.homepage);
router.get('/categories', recipec.explorCategoris);
router.get('/recipes/:id', recipec.explorRecipe);
router.get('/categories/:id', recipec.explorCategorisByID);
router.post('/search', recipec.searchRecipe);
router.get('/explore-latest', recipec.explorLatest);
router.get('/submit-recipe',verifyLogin,recipec.submitRecipe);
router.post('/submit-recipe',verifyLogin,recipec.submitRecipePost);
router.post('/signup',recipec.signupPost);
router.get('/signup',recipec.signUp);
router.get('/signin',recipec.signIn);
router.post('/signin',recipec.signinPost);
router.get('/allrecipes',recipec.allRecipes);
router.get('/profile',verifyLogin,recipec.userProfile);
router.post('/profile',verifyLogin,recipec.Profile);
router.get('/viewList/:id',verifyLogin,recipec.viewRecipe);
router.get('/editList/:id',verifyLogin,(req,res)=>res.redirect('/profile'));
router.post('/editList/:id',verifyLogin,recipec.editRecipes);

router.delete('/deleteList/:id',verifyLogin,recipec.deleteRecipe);
//log out
router.get('/logout',(req,res)=> {
  req.session.destroy();
  res.redirect('/');

})


module.exports = router;