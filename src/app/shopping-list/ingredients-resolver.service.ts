import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Ingredient} from "../shared/Ingredient.model";
import {Observable, tap} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {ShoppingService} from "./shopping.service";
import {Injectable} from "@angular/core";
@Injectable({ providedIn: 'root' })
export class IngredientsResolverService implements Resolve<Ingredient[]>{

  constructor(private dbService : DataStorageService, private shoppingService : ShoppingService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ingredient[]> | Promise<Ingredient[]> | Ingredient[] {

    const ingredients = this.shoppingService.ingredients;
    if(ingredients.length === 0){
      return this.dbService.fetchIngredients()
        .pipe(tap(ingredients => {
          this.shoppingService.setIngredients(ingredients)
        }));
    }
    return ingredients;
  }
}
