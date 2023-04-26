const chai = require("chai");
let assert = chai.assert;
const { ConvertHandler } = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("1. convertHandler should correctly read a whole number input", function (done) {
    assert(convertHandler.getNum("15") === 15);
    done();
  });

  test("2. convertHandler should correctly read a decimal number input", function (done) {
    assert(convertHandler.getNum("15.3") === 15.3);
    done();
  });

  test("3. convertHandler should correctly read a fractional input", function (done) {
    assert(convertHandler.getNum("15/3") === 5);
    done();
  });

  test("4. convertHandler should correctly read a fractional input with a decimal", function (done) {
    assert(convertHandler.getNum("13.5/4.5 ") === 3);
    done();
  });

  test("5. convertHandler should correctly return an error on a double-fraction", function (done) {
    assert(convertHandler.getNum("1/2/3") === 0);
    done();
  });

  test("6. convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function (done) {
    assert(convertHandler.getNum("") === 1);
    done();
  });

  test("7. convertHandler should correctly read each valid input unit", function (done) {
    assert(convertHandler.getUnit("gal") === "gal");
    assert(convertHandler.getUnit("L") === "L");
    assert(convertHandler.getUnit("km") === "km");
    assert(convertHandler.getUnit("kg") === "kg");
    assert(convertHandler.getUnit("lbs") === "lbs");
    assert(convertHandler.getUnit("mi") === "mi");

    done();
  });

  test("8. convertHandler should correctly return an error for an invalid input unit", function (done) {
    assert(convertHandler.getUnit("kgg") === "");
    done();
  });

  test("9. convertHandler should return the correct return unit for each valid input unit", function (done) {
    assert(convertHandler.getReturnUnit("gal") === "L");
    assert(convertHandler.getReturnUnit("L") === "gal");
    assert(convertHandler.getReturnUnit("km") === "mi");
    assert(convertHandler.getReturnUnit("kg") === "lbs");
    assert(convertHandler.getReturnUnit("lbs") === "kg");
    assert(convertHandler.getReturnUnit("mi") === "km");

    done();
  });

  test("10. convertHandler should correctly return the spelled-out string unit for each valid input unit", function (done) {
    assert(convertHandler.spellOutUnit("gal") === "gallons");
    assert(convertHandler.spellOutUnit("L") === "liters");
    assert(convertHandler.spellOutUnit("km") === "kilometers");
    assert(convertHandler.spellOutUnit("kg") === "kilograms");
    assert(convertHandler.spellOutUnit("lbs") === "pounds");
    assert(convertHandler.spellOutUnit("mi") === "miles");

    done();
  });

  test("11. convertHandler should correctly convert gal to L", function (done) {
    assert(convertHandler.convert(1, "gal") === 3.78541);
    done();
  });

  test("12. convertHandler should correctly convert L to gal", function (done) {
    assert(convertHandler.convert(1, "L") === 0.26417);
    done();
  });

  test("13. convertHandler should correctly convert mi to km", function (done) {
    assert(convertHandler.convert(1, "mi") === 1.60934);
    done();
  });

  test("14. convertHandler should correctly convert km to mi", function (done) {
    assert(convertHandler.convert(1, "km") === 0.62137);
    done();
  });

  test("15. convertHandler should correctly convert lbs to kg", function (done) {
    assert(convertHandler.convert(1, "lbs") === 0.45359);
    done();
  });

  test("16. convertHandler should correctly convert kg to lbs", function (done) {
    assert(convertHandler.convert(1, "kg") === 2.20462);
    done();
  });
});
