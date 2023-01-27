//Write a function that takes an object (a) and a number (b) as arguments, Multiply all values of 'a' by 'b', Return the resulting object
  //  myFunction({a:1,b:2,c:3},3);

  function myFunction(obj, b){
    for(let i in obj){
        obj[i] = obj[i] * b;
    }
    return obj;
  }
  console.log(myFunction({a:1,b:2,c:3},3));