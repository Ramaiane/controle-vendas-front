import { Component, ViewChild, OnInit } from "@angular/core";
import { Loja } from "../../model/Loja";
import { NgForm } from "@angular/forms";
import { BreadcrumbService } from "../../service/breadcrumb.service";
import { LojaService } from "../../service/loja.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-mantem-loja',
    templateUrl: './mantem-loja.component.html'
})
export class MantemLojaComponent implements OnInit{

    loja: Loja;
    @ViewChild('lojaForm') lojaForm: NgForm;

    constructor( private breadcrumbService: BreadcrumbService,
                 private lojaService: LojaService,
                 private route: ActivatedRoute){
        this.loja = new Loja();
        this.breadcrumbService.setItems([
            {label: 'Lojas', routerLink: 'lojas'},
            {label: 'Nova Loja', routerLink: 'mantemLoja'}
          ]);

    }

    ngOnInit(){
      if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editarloja') {
        this.route.params.subscribe(params => {
          this.lojaService.getLoja(params['id'])
            .then(res => this.loja = res.data);
        });
      } else {
        this.inicializarLoja();
      }
    }

    inicializarLoja() {
      this.loja = new Loja();
    }

    salvar(): void {
        if (this.lojaForm.invalid) {
          return;
        }
    
        if (this.loja.id) {
          this.lojaService.alterarLoja(this.loja);
        } else {
          this.lojaService.salvarNovaLoja(this.loja)
            .then(() => {
              this.lojaForm.reset();
              // Ajuste para que o checkbox reflita corretamente o estado atual da propriedade ATIVO
              setTimeout(() => this.inicializarLoja(), 0);
            });
        } 
      }
}