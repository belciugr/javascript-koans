var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      function isNotMushrooms(singleIngredient)
      {
        //ingredient must not be mushrooms
        return singleIngredient !== "mushrooms";
      }

      function checkProduct(product)
      {
        //check product for nuts
        if(product.containsNuts == true)
          return false;
        
        //check ingredients list for mushrooms
        return _(product.ingredients).all(isNotMushrooms);
      }
      /* solve using filter() & all() / any() */

      //filter products so that they don't have any nuts and ingredients doesn't have mushrooms
      productsICanEat = products.filter(checkProduct);

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */

    function checkNumber(memo, num){
      if (num % 3 === 0 || num % 5 === 0)
        return memo + num;
      return memo; //in this case do not add 'num'
    }

    //use 'range' to obtain array from 0...999 then 'reduce' to add numbers which are multiples of 3 and 5
    var sum = _.range(1000).reduce(checkNumber);



    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    

    function countIngredients(memo, currValue, num)
    {
      //count ingredients
      ingredientCount[currValue] = (ingredientCount[currValue] || 0) + 1;
    }

    /* chain() together map(), flatten() and reduce() */
    var ingr = _(products).chain()
               .map(function(x) {return x.ingredients }) //map to array of arrays with ingredients
               .flatten() //map to single array with ingresients
               .reduce(countIngredients, 0); //count ingredients starting from 0

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {

    var number = 234658;
    
    var d = 2;
    while(number > 1)
    {
      while((number % d) === 0){
        number = number / d;
      }

      if(number > 1)
        d = d + 1;
    }

    expect(d).toBe(117329);
  });


  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    function isPalindrome(x){
      return x.toString() === x.toString().split("").reverse().join("");
    }
    
    var arr = [];
    for(var i = 999; i >= 100; i--)
    {
      for(var j = 999; j >= 100; j--)
      {
        var n = i*j;
        if(isPalindrome(n))
          arr.push(n);
      }
    }

    var max = Math.max.apply(Math, arr);
    expect(max).toBe(906609);
  });

/*
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});
