const sum = (a, b) => {
   if (a && b) {
      return a + b
   }
   throw new Error('invalid arguments')
}


try {
   console.log(sum(2));
} catch (error) {
   console.log('error occured');
   // console.log(error);
}

console.log('this works')