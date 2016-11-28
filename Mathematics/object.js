var Mathematics = {
    // 1. The construction of A to Grade B
    pow: function (a, b) {
      var power = a;
      for (var i = 1; i < b; i++) {
        power = power * a;
      }
      return power;
    },

    // 2. Return minimum number
    min: function (array) {
      // Check on the number of entering array
      for (var i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'number') {
          console.log('ERROR: Not a number');
          return;
        }
      }

      var mini = array[0];
      for (var j = 0; j < array.length; j++) {
        if (mini > array[j + 1]) {
          mini = array[j + 1];
        }
      }
      return mini;

    },

    // 3. Return maximum number
    max: function (array) {
      // Check on the number of entering array
      for (var i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'number') {
          console.warn('ERROR: Not a number');
          return;
        }
      }

      var maxi = array[0];
      for (var j = 0; j < array.length; j++) {
        if (maxi < array[j + 1]) {
          maxi = array[j + 1];
        }
      }
      return maxi;
    },

    // 4. Calculation of the factorial A
    factorial: function (a) {
      var fact = 1;
      for (var i = 1; i < a; i++) {
        fact = fact * (i + 1);
      }
      return fact;
    },

    // 5. constant of object
    PI: 3.141592653589793
};




console.log(Mathematics.pow(2, 3));
console.log(Mathematics.min([25, 2, 55, 15]));
console.log(Mathematics.max([25, 2, 55, 15]));
console.log(Mathematics.max([25, 'foo']));
console.log(Mathematics.factorial(5));
console.log(Mathematics.PI);