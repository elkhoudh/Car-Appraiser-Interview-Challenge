// AGE:    Given the number of months of how old the car is, reduce its value one-half
// (0.5) percent.
// After 10 years, it's value cannot be reduced further by age. This is not
// cumulative.

// MILES:    For every 1,000 miles on the car, reduce its value by one-fifth of a
// percent (0.2). Do not consider remaining miles. After 150,000 miles, it's
// value cannot be reduced further by miles.

// PREVIOUS OWNER:    If the car has had more than 2 previous owners, reduce its value
// by twenty-five (25) percent. If the car has had no previous
// owners, add ten (10) percent of the FINAL car value at the end.

// COLLISION:        For every reported collision the car has been in, remove two (2)
// percent of it's value up to five (5) collisions.

// Each factor should be off of the result of the previous value in the order of
// 1. AGE
// 2. MILES
// 3. PREVIOUS OWNER
// 4. COLLISION

// E.g., Start with the current value of the car, then adjust for age, take that
// result then adjust for miles, then collision, and finally previous owner.
// Note that if previous owner, had a positive effect, then it should be applied
// AFTER step 4. If a negative effect, then BEFORE step 4.
// Write a simple Node/Express server that will accept the parameters as JSON, perform the calculation
// and return the car value as a JSON Object. No authentication or authorization is required.
// No data persistence is required.

// --You are tasked with writing an algorithm that determines the value of a used car,
// given several factors.
// grab the packages we need
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
// routes will go here
app.get("/", (req, res) => {
  res.json({ name: "Hamza" });
});

app.post("/carValue", (req, res) => {
  const currentValue = req.body.currentValue;
  const months = req.body.months;
  const miles = req.body.miles;
  const previousOwners = req.body.previousOwners;
  const collisions = req.body.collisions;
  // if (!currentValue || !months || !miles || !previousOwners || !collisions) {
  //   res.status(422);
  //   res.json({
  //     error:
  //       "You need to have the following parameters: currentValue, months, miles, previousOwners and collisions"
  //   });
  //   return;
  // }
  let carValue = {
    usedCarValue: 0
  };
  const usedCarValue = (months, currentValue) => {
    if (months >= 120) {
      currentValue = currentValue;
    } else if (months <= 120) {
      currentValue = currentValue - currentValue * 0.5;
    }
    carValue.usedCarValue = currentValue;
    milesCalc(carValue.usedCarValue, miles);
  };
  const milesCalc = (currentValue, miles) => {
    newMiles = Math.floor(miles / 1000);
    if (miles > 150000) {
      currentValue = currentValue;
    } else if (miles < 150000) {
      for (let i = 0; i < newMiles; i++) {
        currentValue = currentValue - currentValue * 0.2;
      }
    }
    carValue.usedCarValue = currentValue;
    previousOwnerCalc(carValue.usedCarValue, previousOwners);
  };

  const previousOwnerCalc = (currentValue, previousOwners) => {
    if (previousOwners >= 2) {
      currentValue = currentValue - currentValue * 0.25;
    }

    if (!previousOwners) {
      currentValue = currentValue + currentValue * 0.1;
    }

    carValue.usedCarValue = currentValue;
    collisionsCalc(carValue.usedCarValue, collisions);
  };

  const collisionsCalc = (currentValue, collisions) => {
    for (let i = 0; i < collisions; i++) {
      if (collisions > 5) {
        currentValue = currentValue;
      } else if (collisions < 5) {
        currentValue = currentValue - currentValue * 0.02;
      }
    }
    carValue.usedCarValue = currentValue;
  };

  usedCarValue(months, currentValue, miles, previousOwners, collisions);

  res.json(carValue);
});

// start the server
app.listen(port);
console.log("Server started! At http://localhost:" + port);
