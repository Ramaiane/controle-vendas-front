import { Component, OnInit } from "@angular/core";
import { Produto } from "../../model/Produto";
import { ProdutoService } from "../../service/produto.service";
import { UtilityService } from "../../service/utility/utility.service";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { BreadcrumbService } from "../../service/breadcrumb.service";
import { HttpParams } from "@angular/common/http";
import { IServiceResponse } from "../../model/IResponse";
import { IPage } from "../../model/IPage";
import { ProdutoDTO } from "../../model/ProdutoDTO";
import { Imagem } from "../../model/Imagem";

@Component({
    selector: 'app-vendas',
    templateUrl: 'vendas.component.html'
})
export class VendasComponent implements OnInit{

    responseProduto: IServiceResponse<IPage<Produto>>;
    produtoDto: ProdutoDTO[] = [];
    nrLinhasTabela = 10;

    ngOnInit(){

        
    }

    constructor(private produtoService: ProdutoService,
        private utilityService: UtilityService,
        private confirmationService: ConfirmationService,
        private breadcrumbService: BreadcrumbService) { 
            this.breadcrumbService.setItems([
                {label: 'Início'},
                {label: 'Vendas', routerLink: 'vendasProduto'}
              ]);
        }



        loadLazy(event: LazyLoadEvent){
        this.getLOjas(event.first / event.rows, event.sortField, event.sortOrder).then(response => {
            this.responseProduto = response;
            debugger
            const produtos = response.data.content;
            for(const produto of produtos){
                const dto = new ProdutoDTO();
                dto.produto = produto;
                debugger
                this.produtoService.buscarImagem(produto.foto).then(resp => {
                    debugger

                    dto.imagem = new Imagem();
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                       dto.imagem.url = reader.result;
                        }, false);


                        if (resp) {
                            reader.readAsDataURL(resp);

                        }
                        dto.imagem.arquivo = new Blob([resp]);

                        const url = window.URL.createObjectURL(dto.imagem.arquivo);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = dto.imagem.nome;
                        this.produtoDto.push(dto);
                   
                  });
              

            }  
          });
    }

    getImagemProduto(nomeFoto: any){
        this.produtoService.buscarImagem(nomeFoto).then(resp => {
            debugger;
            const arquivo = new Blob([resp]);
            const url = window.URL.createObjectURL(arquivo); 
           
          });
    }

    getLOjas(pagina = 0, sortField = 'nome', sortOrder = 1): Promise<IServiceResponse<IPage<Produto>>> {
        sortField = sortField || 'nome';
        let sort: string;
        sort = sortOrder === 1 ? 'asc' : 'desc';
        const options = this.carregaOptionsLoja(pagina.toString(), this.nrLinhasTabela.toString(), sortField, sort);
        return this.produtoService.getProdutosPaginado(options);
        

      }

      carregaOptionsLoja(pagina: string, nrLinhas: string, sortField: string, sortOrder: string) {
        const options = {
          params: new HttpParams()
            .set('page', pagina)
            .set('size', nrLinhas)
            .set('sort', `${sortField},${sortOrder}`)
        };
        return options;
    }

}