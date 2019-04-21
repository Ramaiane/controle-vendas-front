import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IServiceResponse } from "../model/IResponse";
import { IPage } from "../model/IPage";
import { Loja } from "../model/Loja";

@Injectable({
    providedIn: 'root'
})
export class LojaService{
    constructor(private http: HttpClient){ }

    getLojaPaginado(options: {params: HttpParams}){
        return this.http.get<IServiceResponse<IPage<Loja>>>('/controle-vendas-api/api/v1/loja' , options)
        .toPromise();
    }

    salvarNovaLoja(loja: Loja){
        return this.http.post<IServiceResponse<Loja>>('/controle-vendas-api/api/v1/loja', loja)
        .toPromise();
    }

    getLoja(id: string) {
        return this.http.get<IServiceResponse<Loja>>(`/controle-vendas-api/api/v1/loja/${id}`)
          .toPromise();
      }

    excluirLoja(id) {
        return this.http.delete<IServiceResponse<any>>(`/controle-vendas-api/api/v1/loja/${id}`)
          .toPromise();
    
      }

    alterarLoja(loja: Loja) {
        return this.http.put<IServiceResponse<Loja>>(`/controle-vendas-api/api/v1/loja/${loja.id}`, loja)
          .toPromise();
      }
    

}