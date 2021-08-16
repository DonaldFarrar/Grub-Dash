const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass

//Middleware

function requiredFields(req, res, next) {
  const data = req.body.data || {};
  const information = ["deliverTo", "mobileNumber", "status", "dishes"];
  for (const info of information) {
    if (!data[info]) {
      return next({
        status: 400,
        message:
          "Order must have a status of pending, preparing, out-for-delivery, delivered",
      });
    }
  }
  next();
}

//create, read, update, and list orders
const list = (req, res) => {
  res.json({ data: orders });
};

const create = (req, res, next) => {
  const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body;
  if (dishes < 0) {
    return next({
      status: 400,
      message: `Dish ${index} must have a quantity that is an integer greater than 0`,
    });
  }
  next();

  const newOrder = {
    id: nextId(),
    deliverTo: deliverTo,
    mobileNumber: mobileNumber,
    status: status,
    dishes: dishes,
  };

  dishes.push(newOrder);

  res.status(201).json({ data: newOrder });
};

module.exports = {
  list,
  create: [requiredFields, create],
};
