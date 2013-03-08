Treet formats objects as trees, which is apparently a really difficult concept to understand sometimes.

Install:

    npm install treet

Require:

    var treet = require('treet');

Use:

    console.log(treet({a: {complicatedly: {nested: ['object']}}}));

Output:

    Object
      a: Object
        complicatedly: Object
          nested: Array
            0: "object"

Handles circular references by pointing to the location of the circular referencee above the circular referencer. For example:

    var obj = {};
    obj.obj = {obj: obj};
    console.log(treet(obj));

would output:

    Object
      obj: Object
        obj: .obj

Numerical indices in strings only are ignored; negative zero is displayed as `-0`; strings are displayed JSON-encoded; numbers, dates, and regular expressions are displayed as one would expect; anything else is given by the name of its constructor.
