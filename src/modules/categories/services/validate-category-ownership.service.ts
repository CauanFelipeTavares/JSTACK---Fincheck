import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryService {
  constructor(private readonly categoryRepo: CategoriesRepository){}

    async validade(userId: string, categoryId: string,){
    
        const category = await this.categoryRepo.findFirst({
            where: {
                userId, id: categoryId,
            }
        })

        if(!category) throw new NotFoundException('Categoria não encontrada')

    }
}
