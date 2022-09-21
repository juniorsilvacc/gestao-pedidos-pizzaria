import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './create-category-usecase';

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const category = await createCategoryUseCase.execute({ name, description });

    return response.status(201).json(category);
  }
}

export { CreateCategoryController };
