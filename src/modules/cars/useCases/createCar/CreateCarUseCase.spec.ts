import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car",
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "description car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        brand: "brand",
        category_id: "category",
        daily_rate: 100,
        description: "description car",
        fine_amount: 60,
        license_plate: "ABC-1234",
      });

      await createCarUseCase.execute({
        name: "Car2",
        brand: "brand",
        category_id: "category",
        daily_rate: 100,
        description: "description car",
        fine_amount: 60,
        license_plate: "ABC-1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "description car",
      fine_amount: 60,
      license_plate: "ABCD-1234",
    });

    expect(car.available).toBe(true);
  });
});
