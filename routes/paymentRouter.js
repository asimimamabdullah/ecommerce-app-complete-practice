const router = require("express").Router();

const { getPayments, createPayment } = require("../controllers/paymentCtrl");
const auth = require("../middleware/auth");

const authAdmin = require("../middleware/authAdmin");

router
  .route("/payment")
  .get(auth, authAdmin, getPayments)
  .post(auth, createPayment);

module.exports = router;
