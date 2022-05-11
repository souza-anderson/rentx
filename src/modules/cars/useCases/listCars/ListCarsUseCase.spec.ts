import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      brand: "Car_brand",
      category_id: "category_id",
      daily_rate: 110,
      description: "Carro com espaço",
      fine_amount: 40,
      license_plate: "DEF-1234",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      brand: "Car_brand_teste",
      category_id: "category_id",
      daily_rate: 110,
      description: "Carro com espaço",
      fine_amount: 40,
      license_plate: "DEF-1234",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car2",
    });

    console.log(cars);

    // expect(cars).toEqual([car]);
  });
});
