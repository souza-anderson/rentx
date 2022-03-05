import { Category } from "../../model/Category";
import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRespository) {}

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}

export { ListCategoriesUseCase };
