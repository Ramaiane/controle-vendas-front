import { Component, OnInit, ViewChild } from "@angular/core";
import { LojaService } from "../../service/loja.service";
import { IServiceResponse } from "../../model/IResponse";
import { IPage } from "../../model/IPage";
import { Loja } from "../../model/Loja";
import { UtilityService } from "../../service/utility/utility.service";
import { HttpParams } from "@angular/common/http";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { BreadcrumbService } from "../../service/breadcrumb.service";
import { Table } from "primeng/table";

@Component({
    selector: 'app-lista-loja',
    templateUrl: './lista-loja.component.html'
})
export class ListaLojaComponent implements OnInit{
    
    responseLoja: IServiceResponse<IPage<Loja>>;

    nrLinhasTabela = 10 ;
    filtroNome = '';
    filtroId = '';
    filtroAtivo = true;
    private debouncer;
    private delay = 500;
    @ViewChild('dt') dt: Table;

    cols: { field: string, header: string }[];

    constructor(private lojaService: LojaService,
                private utilityService: UtilityService,
                private confirmationService: ConfirmationService,
                private breadcrumbService: BreadcrumbService) { 
                    this.breadcrumbService.setItems([
                        {label: 'Início'},
                        {label: 'Loja', routerLink: 'lojas'}
                      ]);
                }

    ngOnInit(){
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'nome', header: 'Loja' },
            { field: 'ativo', header: 'Ativo' }
          ];
    }
    
  loadLazy(event: LazyLoadEvent) {
    this.getLOjas(event.first / event.rows, event.sortField, event.sortOrder).then(response => {
      this.responseLoja = response;
    });
  } 

    getLOjas(pagina = 0, sortField = 'nome', sortOrder = 1): Promise<IServiceResponse<IPage<Loja>>> {
        sortField = sortField || 'nome';
        let sort: string;
        sort = sortOrder === 1 ? 'asc' : 'desc';
        const options = this.carregaOptionsLoja(pagina.toString(), this.nrLinhasTabela.toString(), sortField, sort);
        return this.lojaService.getLojaPaginado(options);
        

      }

      carregaOptionsLoja(pagina: string, nrLinhas: string, sortField: string, sortOrder: string) {
        const options = {
          params: new HttpParams()
            .set('page', pagina)
            .set('size', nrLinhas)
            .set('sort', `${sortField},${sortOrder}`)
        };

        options.params = this.utilityService.carregaParamsString(this.filtroNome, options.params, 'nome');
        options.params = this.utilityService.carregaParamsString(this.filtroId, options.params, 'id');
        options.params = options.params.set('ativo', this.filtroAtivo + '');
        return options;
    }

    onChangeFilter() {
        clearTimeout(this.debouncer);
        this.debouncer = setTimeout(() => {
          this.dt.reset();
        }, this.delay);
      }

      excluir(id) {
        this.confirmationService.confirm({
          message: 'Confirma a exclusão da loja?',
          accept: () => {
            this.lojaService.excluirLoja(id).then(() => this.dt.reset());
          }
        });
      }

}