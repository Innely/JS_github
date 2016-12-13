// Parent class
function Base() {}

Base.prototype.getId = function() {
  var id;
  return id = Math.floor((Math.random()* 100) + 1);
};


// Class heir to the Base
function Model(params) {
  Base.apply(this, arguments);
  this.defaults = params;
}

Model.prototype = Object.create(Base.prototype);
Model.prototype.constructor = Model;

Model.prototype.set = function(property, value) {
  (property in this.defaults) ? '' : console.warn('это новое свойство!');
  this.defaults[property] = value;
};

Model.prototype.get = function(property) {
  return (property in this.defaults) ? this.defaults[property] : 'false';
};

Model.prototype.getAll = function() {
  var valueArr = [];
  var value;
  function getNestedValues(obj) {
    for (var key in obj) {
      value = obj[key];
      if ( Array.isArray(value) || typeof value !== 'object' ) {
        valueArr.push(value);
      }
    }
  }
  getNestedValues(this.defaults);
  return valueArr;
};

// Class heir to the Model
function ExtendedModel(params) {
  Model.apply(this, arguments);
}

ExtendedModel.prototype = Object.create(Model.prototype);
ExtendedModel.prototype.constructor = ExtendedModel;

ExtendedModel.prototype.getAll = function(prop) {
  var valueArr = [];
  var value;

  function getNestedValues(obj) {
    for (var key in obj) {
      value = obj[key];
      if ( Array.isArray(value) || typeof value !== 'object' ) {
        valueArr.push(value);
      }
      else {
        getNestedValues(value);
      }
    }
  }

  if (prop) {
    // Only check the first nesting
    if (typeof this.defaults[prop] === 'object') {
      getNestedValues(this.defaults[prop]);
      return valueArr;
    }
    else {
      return 'this property is not an object'
    }
  }
  else {
    getNestedValues(this.defaults);
    return valueArr;
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