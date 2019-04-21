import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Produto } from "../model/Produto";
import { IServiceResponse } from "../model/IResponse";
import { Arquivo } from "../model/Arquivo";
import { IPage } from "../model/IPage";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    constructor(private http: HttpClient){ }

    
    salvarImagem(arquivo: Arquivo){
        return this.http.post<IServiceResponse<Arquivo>>('/controle-vendas-api/api/v1/produto/imagem', arquivo)
        .toPromise();
    }

    buscarImagem(arquivoNome: string){
        return this.http.get( `/controle-vendas-api/api/v1/produto/imagem/${arquivoNome}`, { responseType: 'blob' }).toPromise();
    }

    salvarProduto(produto: Produto){
        return this.http.post<IServiceResponse<Produto>>('/controle-vendas-api/api/v1/produto', produto)
        .toPromise();
    }

    getProdutosPaginado(options: {params: HttpParams}){
        return this.http.get<IServiceResponse<IPage<Produto>>>('/controle-vendas-api/api/v1/produto' , options)
        .toPromise();
    }

}