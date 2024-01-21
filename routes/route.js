const router = require('express').Router();

const { payment } = require('../controller/paymentController');
const { createUser, loginUser } = require('../controller/userController');
const {
  createItem,
  getItem,
  updateItem,
  deleteItem,
} = require('../controller/itemController');

const { authentication } = require('../mid/authentication');
const { createOrder, updateOrder } = require('../controller/orderController');

router.post('/createUser', createUser);
router.post('/loginUser', loginUser);

//without auth
router.post('/createItem', createItem);
router.get('/getItem/:itemId?', getItem);
router.post('/updateItem/:itemId', updateItem);
router.delete('/deleteItem/:itemId', deleteItem);

//with auth
router.post('/auth/createitem', authentication, createItem);
router.get('/auth/getItem/:itemId?', authentication, getItem);
router.post('/auth/updateItem/:itemId', authentication, updateItem);
router.delete('/auth/deleteItem/:itemId', authentication, deleteItem);

//for order
router.post('/createOrder', createOrder);
router.post('/updateOrder', updateOrder);

//for auth order
router.post('/auth/createOrder', authentication, createOrder);
router.post('/auth/updateOrder', authentication, updateOrder);

//for cash payment
router.post('/payment', payment);

module.exports = router;
