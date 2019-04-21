import { Component, ViewChild, OnInit } from "@angular/core";
import { Fornecedor } from "src/app/model/Fornecedor";
import { NgForm } from "@angular/forms";
import { BreadcrumbService } from "src/app/service/breadcrumb.service";
import { FornecedorService } from "src/app/service/fornecedor.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-mantem-fornecedor',
    templateUrl: './mantem-fornecedor.component.html'
})
export class MantemFornecedorComponent implements OnInit{

    fornecedor: Fornecedor;
    @ViewChild('fornecedorForm') fornecedorForm: NgForm;

    constructor(private breadcrumbService: BreadcrumbService,
                private fornecedorService: FornecedorService,
                private route: ActivatedRoute){
        this.fornecedor = new Fornecedor();
        this.breadcrumbService.setItems([
            {label: 'Lojas', routerLink: 'lojas'},
            {label: 'Nova Loja', routerLink: 'mantemLoja'}
          ]);
    }

    ngOnInit() {
      if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editarloja') {
        this.route.params.subscribe(params => {
          this.fornecedorService.getForncedorById(params['id'])
            .then(res => this.fornecedor = res.data);
        });
      } else {
        this.inicializarFornecedor();
      }
        this.inicializarFornecedor();
    }

    inicializarFornecedor() {
        this.fornecedor = new Fornecedor();
      }

    
      salvar(): void {
        if (this.fornecedorForm.invalid) {
          return;
        }
    
        if (this.fornecedor.id) {
       //   this.lojaService.alterarLoja(this.loja);
        } else {
          this.fornecedorService.salvarFornecedor(this.fornecedor)
            .then(() => {
              this.fornecedorForm.reset();
              setTimeout(() => this.inicializarFornecedor(), 0);
            });
        } 
      }

}