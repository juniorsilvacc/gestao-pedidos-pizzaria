import { Router } from 'express';
import { CloseOrderController } from '../../../modules/orders/useCases/CloseOrder/close-order-controller';
import { ConcludeOrdersController } from '../../../modules/orders/useCases/ConcludeOrder/conclude-order-controller';
import { CreateOrderController } from '../../../modules/orders/useCases/CreateOrder/create-order-controller';
import { ListOrderItemDetailsController } from '../../../modules/orders/useCases/ListOrderItemDetails/list-order-item-details-controller';

import { ListOrdersDraftFalseController } from '../../../modules/orders/useCases/ListOrdersDraftFalse/list-orders-draf-false-controller';

import { SendOrderController } from '../../../modules/orders/useCases/SendOrder/send-order-controller';
import ensureAdmin from '../middlewares/ensure-admin';
import ensureAuthenticate from '../middlewares/ensure-authenticate';

const ordersRouter = Router();

const createOrderController = new CreateOrderController();
const closeOrderController = new CloseOrderController();
const listOrdersDraftFalseController = new ListOrdersDraftFalseController();
const sendOrderController = new SendOrderController();
const concludeOrderController = new ConcludeOrdersController();
const listOrderItemDetailsController = new ListOrderItemDetailsController();

ordersRouter.post('/create', ensureAuthenticate, createOrderController.handle);

ordersRouter.delete(
  '/close/:id',
  ensureAuthenticate,
  closeOrderController.handle,
);

ordersRouter.get(
  '/list',
  ensureAuthenticate,
  ensureAdmin,
  listOrdersDraftFalseController.handle,
);

ordersRouter.put('/send', ensureAuthenticate, sendOrderController.handle);

ordersRouter.put(
  '/end',
  ensureAuthenticate,
  ensureAdmin,
  concludeOrderController.handle,
);

ordersRouter.get(
  '/detail',
  ensureAuthenticate,
  ensureAdmin,
  listOrderItemDetailsController.handle,
);

export { ordersRouter };