import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Ingredient} from "./Ingredient.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  API_URL = "https://angular-http-5d15b-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json";
  constructor(private http: HttpClient) {
  }
  fetchIngredients(){
    console.log("Fetch");
    return this.http.get<Ingredient[]>(this.API_URL);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.http.put(this.API_URL, ingredients)
      .subscribe();
  }
}
