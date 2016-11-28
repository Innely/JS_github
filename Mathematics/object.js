var Mathematics = {
    // 1. The construction of A to Grade B
    pow: function (a, b) {
      var result = a;
      for (var i = 1; i < b; i++) {
        result = result * a;
      }
      return result;
    },

    // 2. Return minimum number
    min: function (array) {
      var result = array[0];
      for (var i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'number') {
          console.warn('ERROR: Not a number');
          return;
        }
        if (result > array[i + 1]) {
          result = array[i + 1];
        }
      }
      return result;
    },

    // 3. Return maximum number
    max: function (array) {
      var result = array[0];
      for (var i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'number') {
          console.warn('ERROR: Not a number');
          return;
        }
        if (result < array[i + 1]) {
          result = array[i + 1];
        }
      }
      return result;
    },

    // 4. Calculation of the factorial A
    factorial: function (a) {
      var result = 1;
      for (var i = 1; i < a; i++) {
        result = result * (i + 1);
      }
      return result;
    },

    // 5. Constant of object
    PI: 3.141592653589793
};




console.log(Mathematics.pow(2, 3));
console.log(Mathematics.min([25, 2, 55, 15]));
console.log(Mathematics.max([25, 2, 55, 15]));
console.log(Mathematics.max([25, 'foo']));
console.log(Mathematics.factorial(5));
console.log(Mathematics.PI);