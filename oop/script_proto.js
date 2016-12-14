// Parent class
function Base() {}
// Getter for Base
Base.prototype.getId = function() {
  return Math.floor(Math.random()* 100 + 1);
};

// Class heir to the Base
function Model(params) {
  Base.apply(this, arguments);
  this.defaults = params;
}
// Inheritance from Base
Model.prototype = Object.create(Base.prototype);
Model.prototype.constructor = Model;

// Setter for Model
Model.prototype.set = function(property, value) {
  (property in this.defaults) && console.warn('это новое свойство!');
  this.defaults[property] = value;
};
// Getter for Model
Model.prototype.get = function(property) {
  return (property in this.defaults) ? this.defaults[property] : 'false';
};
// Getter for Model
Model.prototype.getAll = function() {
  var result = [];
  var value;
  for (var key in this.defaults) {
    value = this.defaults[key];
    if ( value.constructor !== Object ) { // check not an Object
      result.push(value);
    }
  }
  return result;
};

// Class heir to the Model
function ExtendedModel(params) {
  Model.apply(this, arguments);
}
// Inheritance from Model
ExtendedModel.prototype = Object.create(Model.prototype);
ExtendedModel.prototype.constructor = ExtendedModel;

// Getter for ExtendedModel, extended from Model.prototype.getAll
ExtendedModel.prototype.getAll = function(prop) {
  var result = [];

  function getNestedValues(obj) {
    for (var key in obj) {
      var value = obj[key];
      if ( value.constructor !== Object ) {
        result.push(value);
      }
      else {
        getNestedValues(value);
      }
    }
    return result;
  }

  if (prop) {
    // Only check the first nesting
    if (typeof this.defaults[prop] === 'object') {
      return getNestedValues(this.defaults[prop]);
    }
    else {
      return 'this property is not an object'
    }
  }
  else {
    return getNestedValues(this.defaults);
  }

};
// End


//1
var obj = new Base();
obj.getId();


//2
var model = new Model({
type: 'big',
data: [1, 2, 3],
status: {
 online: true,
 offline: false
}
});
model.set('type', 'normal');
model.set('new', true);
model.get('data'); // [1, 2, 3]
model.get('bla'); // false
model.getAll();

//3
var extendedModel = new ExtendedModel({
foo: {
 bar: 500,
 baz: false
},
bar: 'test'
});
extendedModel.getAll(); // [500, false, 'test']
extendedModel.getAll('foo'); // [500, false]