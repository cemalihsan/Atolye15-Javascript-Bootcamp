// TYPE COERSION

// Implicit vs Explicit Coersion

//String
String(123)  //explicit coersion
123 + "" // "123"


//Boolean
Boolean(2)  // true
if(2){
    console.log("Why")
}  // implicit due to logical context
!2 // false
2 || "Hello" // implicit due to logical context

Boolean("") //false
Boolean(0) //false
Boolean(null) //false

Boolean({}) //true
Boolean([]) //true


// Numeric Conversion

Number(123) // 123
// comparison (>, <, <=, >=)
// arithmatic (+, -, /, *, %)  // if there is a string, then concatanates it.
// loose equality(==), != // if both side is string then cant convert to number

+ "123" // 123
123 != "456" // converts string to number // 123 != 456
4 > "5" // 4 > 5

Number("12ab") //NaN
Number(" ") // 0
NaN == NaN // false

// Reference Types Coercion

// 1. If input is already a primitive, do nothing and return it.
// 2. Call input.toString(), if the result is primitive, return it.
// 3. Call input.valueOf(), if the result is primitive, return it.
// 4. If neither input.toString() nor input.valueOf() yields primitive, throw TypeError.

true + false // 1
12 / "6" // 2
"number" + 15 + 3 // "number153"

[1] > null // "1" > null => 1 > 0 //True
"foo" + + "bar" // "foo" + NaN => "fooNaN"
"true" == true // NaN == 1 => False
["x"] == "x" //"x" == "x" => True
//[] + null + 1  // "" + null => "null" + 1 => "null1"

0 || "0" && {} // "0" && {} => {} // and(&&) operator looks until finding false, or(||) looks until finding true
[1,2,3] == [1,2,3]  //because of being reference typeof, they occupy different location in the memory, as a result it is false
{} + [] + {} + [1] // + [] + {} + [1] => 0 + {} + [1] => 0 + "[object Object]" + [1] => "0[object Object]" + [1] 
//=> "0[object Object]" + "1" => "0[object Object]1" 