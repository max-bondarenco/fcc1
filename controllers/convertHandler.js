const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.convert = catchAsync(async (req, res, next) => {
  const converter = new ConvertHandler();

  const initNum = converter.getNum(req.query.input);
  const initUnit = converter.getUnit(req.query.input);

  if ((initNum == 0 || Number.isNaN(initNum)) && !initUnit)
    return next(new AppError(400, "invalid number and unit"));
  if (initNum == 0 || Number.isNaN(initNum))
    return next(new AppError(400, "invalid number"));
  if (!initUnit) return next(new AppError(400, "invalid unit"));

  const returnUnit = converter.getReturnUnit(initUnit);
  const returnNum = converter.convert(initNum, initUnit);
  const string = converter.getString(initNum, initUnit, returnNum, returnUnit);

  res.status(200).json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string,
  });
});

class ConvertHandler {
  constructor() {}

  getNum = function (input) {
    const nums = input.replace(/[a-z]/gi, "").split("/");
    if (!nums[0]) return 1;
    if (nums.length > 2) return 0;
    return nums.length == 1 ? nums[0] * 1 : nums[0] / nums[1];
  };

  getUnit = function (input) {
    const unit = input.replace(/[^a-z]/gi, "").toLowerCase();
    if (!["kg", "lbs", "km", "l", "mi", "gal"].includes(unit)) return "";
    return unit === "l" ? "L" : unit;
  };

  getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      case "mi":
        return "km";
      case "km":
        return "mi";
    }
  };

  spellOutUnit = function (unit) {
    switch (unit) {
      case "gal":
        return "gallons";
      case "L":
        return "liters";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
    }
  };

  convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case "gal":
        return Math.round(initNum * galToL * 100000) / 100000;
      case "L":
        return Math.round((initNum / galToL) * 100000) / 100000;
      case "lbs":
        return Math.round(initNum * lbsToKg * 100000) / 100000;
      case "kg":
        return Math.round((initNum / lbsToKg) * 100000) / 100000;
      case "mi":
        return Math.round(initNum * miToKm * 100000) / 100000;
      case "km":
        return Math.round((initNum / miToKm) * 100000) / 100000;
    }
  };

  getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

exports.ConvertHandler = ConvertHandler;
