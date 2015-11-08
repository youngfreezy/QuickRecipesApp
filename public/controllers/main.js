angular.module('MyApp')
  .controller('MainCtrl', function ($scope, Recipes, $alert, $http, $location, RecipeBox, $rootScope, $route, Profile, $cookies) {
    window.Recipes = Recipes;
    // console.log($scope.recipe);

    $scope.genres = ['Mexican', 'Italian', 'Chinese', 'Korean',
      'American', 'Comfort Food', 'New American', 'Dessert', 'Fruit',
      'Indian', 'West African', 'Japanese', 'Quick', 'Pizza', 'Romantic', 'Spicy', 'Bland',
      'Pan-Asian', 'Indonesian', 'Vietnamese', 'Hipster', 'Habanero'
    ];

    $scope.allergies = ["Peanut-Free", "Wheat-Free", "Seafood-Free", "Dairy-Free", "Gluten-Free", "Egg-Free", "Treenut-Free"];
    $scope.dietaryRestrictions = ["Vegan", "Vegetarian", "Pescatarian", "Low Carbs", "Low Sugar"];
   
    var randGenre = $scope.genres[Math.floor(Math.random() * $scope.genres.length)];
    getRandomGenre = function () {
      var randGenre = $scope.genres[Math.floor(Math.random() * $scope.genres.length)];
      $scope.randGenre = randGenre;

    };



    $scope.getGenreRecipes = function (genre) {
      Recipes.getRecipesByGenre(genre).then(function (response) {
        $scope.recipes = response;
        
      });
    };


    $scope.getAllergyRecipes = function (allergy) {
      console.log($scope.allergy);

      Recipes.getRecipesByRestrictions(allergy).then(function (response) {
        $scope.recipes = response;
        console.log(response);
      });
    };

    $scope.searchRecipes = function () {

      Recipes.getRecipes($scope.query.name).then(function (response) {
        $scope.recipes = response;
        // console.log($scope.recipes);
      });

    };



    $scope.getGenreRecipes = function (genre) {
      Recipes.getRecipesByGenre(genre).then(function (response) {
        $scope.recipes = response;
        // console.log(response);
      });
    };

    $scope.handleEnterKey = function ($event) {

      if ($event.keyCode === 13) {
        $scope.searchRecipes();
      }
    };

    $scope.getIndividualRecipe = function (recipeId) {
      Recipes.getIndividualRecipes(recipeId).then(function (response) {
        $scope.individualRecipe = response;

        // console.log($rootScope.recipePropsIWant);
        // console.log($scope.individualRecipe);
      });
    };

    function getUserRecipes() {
      Recipes.getUserRecipes().then(function (recipes) {
        $scope.userRecipes = recipes;
      });
    }
    // var id = $rootScope.currentUser._id;


    $scope.$on("getUserRecipes", getUserRecipes);


    function init(randGenre) {
      Recipes.getQuickRecipes(randGenre).then(function (response) {

        $scope.quickRecipes = response;
        // console.log('quick recipes',$scope.quickRecipes);
        getUserRecipes();
      });

    }

    init(randGenre);

  })
  .directive('streamPreview', function () {

    return {
      controller: 'StreamCtrl',
      template: [
        '{{lasthourRecipes.userName}}',
        '<ul style="list-style-type: none">',
        '<li class="animate-repeat" ng-repeat="recipe in recipeStreamLimited | orderBy:\'createdAt\':true">',
        '{{recipe.userName}}  Added: {{recipe.name}}',
        '</li>',
        '</ul>'
      ].join('')
    };
  })
  .directive('recipeBoxPreview', function () {
    return {
      template: [
        '<h5><center>Your Recipe Box: </center></h5>',
        '<ol>',
        '<li class="animate-repeat" ng-repeat="recipe in userRecipes | orderBy:\'createdAt\':true">',
        '<a href="{{recipe.recipeUrl}}" target="_blank">{{recipe.name}}</a>',
        '</li>',
        '</ol>'
      ].join('')
    };
  });