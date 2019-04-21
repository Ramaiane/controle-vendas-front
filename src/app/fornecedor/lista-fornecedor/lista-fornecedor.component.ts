import { Component, OnInit, ViewChild } from "@angular/core";
import { IServiceResponse } from "src/app/model/IResponse";
import { IPage } from "src/app/model/IPage";
import { Fornecedor } from "src/app/model/Fornecedor";
import { Table } from "primeng/table";
import { FornecedorService } from "src/app/service/fornecedor.service";
import { UtilityService } from "src/app/service/utility/utility.service";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { BreadcrumbService } from "src/app/service/breadcrumb.service";
import { HttpParams } from "@angular/common/http";

@Component({
    selector: 'app-lista-fornecedor',
    templateUrl: './lista-fornecedor.component.html'
})
export class ListaFornecedorComponent implements OnInit{

    responseFornecedor: IServiceResponse<IPage<Fornecedor>>;
    nrLinhasTabela = 10 ;
    filtroNome = '';
    filtroUrl = '';
    filtroId = '';
    filtroAtivo = true;
    private debouncer;
    private delay = 500;
    @ViewChild('dt') dt: Table;

    cols: { field: string, header: string }[];

    constructor(private fornecedorService: FornecedorService,
        private utilityService: UtilityService,
        private confirmationService: ConfirmationService,
        private breadcrumbService: BreadcrumbService) { 
            this.breadcrumbService.setItems([
                {label: 'Início'},
                {label: 'Fornecedor', routerLink: 'fornecedores'}
              ]);
        }

    ngOnInit(){
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'nome', header: 'Loja' },
            { field: 'url', header: 'Site' },
            { field: 'ativo', header: 'Ativo' }
          ];
    }

    loadLazy(event: LazyLoadEvent) {

        this.getFornecedor(event.first / event.rows, event.sortField, event.sortOrder).then(response => {
          this.responseFornecedor = response;
        });
      }
      
      
    getFornecedor(pagina = 0, sortField = 'nome', sortOrder = 1): Promise<IServiceResponse<IPage<Fornecedor>>> {
        sortField = sortField || 'nome';
        let sort: string;
        sort = sortOrder === 1 ? 'asc' : 'desc';
        const options = this.carregaOptionsFornecedor(pagina.toString(), this.nrLinhasTabela.toString(), sortField, sort);
        return this.fornecedorService.getFornecedorPaginado(options);
      }


      
      carregaOptionsFornecedor(pagina: string, nrLinhas: string, sortField: string, sortOrder: string) {
        const options = {
          params: new HttpParams()
            .set('page', pagina)
            .set('size', nrLinhas)
            .set('sort', `${sortField},${sortOrder}`)
        };

        options.params = this.utilityService.carregaParamsString(this.filtroNome, options.params, 'nome');
        options.params = this.utilityService.carregaParamsString(this.filtroUrl, options.params, 'url');
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
          message: 'Confirma a exclusão do fornecedor?',
          accept: () => {
            this.fornecedorService.excluirFornecedor(id).then(() => this.dt.reset());
          }
        });
      }


}