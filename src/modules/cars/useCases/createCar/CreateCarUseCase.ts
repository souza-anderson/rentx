import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  name: string;
  brand: string;
  category_id: string;
  daily_rate: number;
  description: string;
  fine_amount: number;
  license_plate: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: IRequest): Promise<void> {
    await this.carsRepository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });
  }
}

export { CreateCarUseCase };
