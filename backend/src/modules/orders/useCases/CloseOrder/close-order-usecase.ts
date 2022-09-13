import { AppError } from '../../../../shared/errors/app-error';
import { IOrdersRepository } from '../../repositories/orders-repository';

interface IRequest {
  order_id: string;
}

class CloseOrderUseCase {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute({ order_id }: IRequest): Promise<void> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('Pedido não encontrado', 404);
    }

    await this.ordersRepository.closeOrder(order_id);
  }
}

export { CloseOrderUseCase };