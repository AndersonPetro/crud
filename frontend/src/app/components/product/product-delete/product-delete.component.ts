import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product!: Product

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam !== null) {
      const id = parseInt(idParam, 10);
      if (!isNaN(id)) {
        this.productService.readById(id).subscribe((product) => {
          this.product = product;
        });
      } else {
        console.error("Id não é um numero valido");
      }
    } else {
      console.error("Id nao foi fornecido na rota");
    }
  }


  deleteProduct(): void {
    if (this.product.id != undefined) {
      this.productService.delete(this.product.id).subscribe(() => {
        this.productService.showMessage("Produto excluido com sucesso!");
        this.router.navigate(["/products"]);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/products'])

  }

}
