import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesContoller } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = null;
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesContoller(
  listCategoriesUseCase
);

export { listCategoriesController };
