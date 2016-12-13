// class
function Base() {
  var id;

  this.getId = function() {
    return id = Math.floor((Math.random()* 100) + 1);
  }
}

// class heir to the Base
function Model(params) {
  Base.apply(this, arguments);

  // используем внешнюю переменную вместо this
  var self = this;
  self.defaults = params;
  //console.log(this.defaults);

  this.set = function(property, value) {
    (property in self.defaults) ? '' : console.warn('это новое свойство!');
    self.defaults[property] = value;
  }

  this.get = function(property) {
    return (property in self.defaults) ? self.defaults[property] : 'false';
  }

  this.getAll = function() {
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
    getNestedValues(self.defaults);
    return valueArr;
    console.log(this.defaults);
  }

}

//class heir to the Model
function ExtendedModel(params) {
  Model.apply(this, arguments);

  var parentGetAll = this.getAll;
  this.getAll = function() {
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
    getNestedValues(this.defaults);
    return valueArr;
    console.log(this.defaults);
  }
}

// 1
var obj = new Base();
obj.getId();


// 2
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

// 3
var extendedModel = new ExtendedModel({
  foo: {
    bar: 500,
    baz: false
  },
  bar: 'test'
});
extendedModel.getAll(); // [500, false, 'test']
extendedModel.getAll('foo'); // [500, false]