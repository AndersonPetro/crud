import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product!: Product

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

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
    
  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
    this.productService.showMessage('Produto atualizado com sucesso!');
    this.router.navigate(["/products"]);
  });

  }

  cancel(): void {
    this.router.navigate(['/products'])

  }

}
