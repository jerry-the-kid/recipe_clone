import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {Ingredient} from "../shared/Ingredient.model";
import {DataStorageService} from "../shared/data-storage.service";

@Injectable({providedIn: 'root'})
export class ShoppingService {
  idEditChange = new BehaviorSubject<number>(-1);
  ingredients: Ingredient[] = [];
  ingredientChange = new BehaviorSubject<Ingredient[]>([]);

  constructor(private dataStorage: DataStorageService) {
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientChange.next([...this.ingredients]);
  }

  addIngredients(ingredient: Ingredient) {
    const existIngredientIndex = this.ingredients
      .findIndex(ing => ing.name === ingredient.name);

    if (existIngredientIndex !== -1) {
      this.ingredients[existIngredientIndex] = {
        name: ingredient.name,
        quantity: this.ingredients[existIngredientIndex].quantity + ingredient.quantity
      }
    } else {
      this.ingredients.push(ingredient);
    }

    this.ingredientChange.next([...this.ingredients]);
    this.dataStorage.addIngredients(this.ingredients);
  }

  getIngredient(id : number) {
    return this.ingredients[id];
  }

  updateIngredient(id : number, ingredient : Ingredient) {
    this.ingredients[id] = ingredient;
    this.ingredientChange.next([...this.ingredients]);
    this.dataStorage.addIngredients(this.ingredients);
  }

  deleteIngredient(id : number) {
    this.ingredients.splice(id, 1);
    this.ingredientChange.next([...this.ingredients]);
    this.dataStorage.addIngredients(this.ingredients);
  }

}
