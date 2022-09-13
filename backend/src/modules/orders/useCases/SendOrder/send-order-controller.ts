import { Request, Response } from 'express';
import { PostgresOrdersImplementations } from '../../repositories/implementations/postgres-orders-implementations';
import { SendOrdersUseCase } from './send-order-usecase';

class SendOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.body;

    const ordersImplementations = new PostgresOrdersImplementations();
    const sendOrderUseCase = new SendOrdersUseCase(ordersImplementations);

    const order = await sendOrderUseCase.execute({
      order_id,
    });

    return response.status(200).json(order);
  }
}

export { SendOrderController };