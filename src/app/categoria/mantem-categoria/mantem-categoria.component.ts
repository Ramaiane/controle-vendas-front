import { Component, OnInit, ViewChild } from "@angular/core";
import { Categoria } from "../../model/Categoria";
import { NgForm } from "@angular/forms";
import { BreadcrumbService } from "../../service/breadcrumb.service";
import { CategoriaService } from "../../service/categoria.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-mantem-categoria',
    templateUrl: './mantem-categoria.component.html'
})
export class MantemCategoriaComponent implements OnInit {

    categoria: Categoria;
    @ViewChild('categoriaForm') categoriaForm: NgForm;

    constructor(private breadcrumbService: BreadcrumbService,
                private categoriaService: CategoriaService,
                private route: ActivatedRoute){
        this.categoria = new Categoria();
        this.breadcrumbService.setItems([
                        {label: 'Categorias', routerLink: 'categorias'},
                        {label: 'Nova Categoria', routerLink: 'mantemLoja'}
        ]);
    }
    ngOnInit(){
        if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editarFornecedor') {
            this.route.params.subscribe(params => {
              this.categoriaService.getCategoriaById(params['id'])
                .then(res => this.categoria = res.data);
            });
          } else {
            this.inicializarCategoria();
          }
    }

    inicializarCategoria() {
        this.categoria = new Categoria();
      }

      
    salvar(): void {
        debugger
        if (this.categoriaForm.invalid) {
          return;
        }
    
        if (this.categoria.id) {
          this.categoriaService.alterarCategoria(this.categoria);
        } else {
          this.categoriaService.salvarCategoria(this.categoria)
            .then(() => {
              this.categoriaForm.reset();
              setTimeout(() => this.inicializarCategoria(), 0);
            });
        } 
      }
}