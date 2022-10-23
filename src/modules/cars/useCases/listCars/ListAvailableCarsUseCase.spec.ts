import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      brand: "Car_brand_teste",
      category_id: "category_id",
      daily_rate: 110,
      description: "Carro com espaço",
      fine_amount: 40,
      license_plate: "DEF-1234",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_teste",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      brand: "Car_brand_teste",
      category_id: "category_id",
      daily_rate: 110,
      description: "Carro com espaço",
      fine_amount: 40,
      license_plate: "DEF-1234",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      brand: "Car_brand_teste",
      category_id: "123456",
      daily_rate: 110,
      description: "Carro com espaço",
      fine_amount: 40,
      license_plate: "DEF-1234",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "123456",
    });

    expect(cars).toEqual([car]);
  });
});
