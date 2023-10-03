import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: 'Nome do Produto',
    price: 2.80

  }



  constructor(
    private productService: ProductService,
    private router: Router
  ) { }
  
  ngOnInit(): void {

  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showOnMessage('Produto criado')
      this.router.navigate(['/poducts'])
    })
  }

  cancel(): void {
    this.router.navigate(["/products"])


  }
}
