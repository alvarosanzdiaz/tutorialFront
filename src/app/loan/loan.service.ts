import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/Loan';
import { LoanPage } from './model/LoanPage';

@Injectable({
providedIn: 'root'
})
export class LoanService {

    constructor(
        private http: HttpClient
    ) { }

    getLoansStart(pageable: Pageable): Observable<LoanPage> {
        return this.http.post<LoanPage>('http://localhost:8080/loan', {pageable:pageable});
    }
    getLoans(pageable:Pageable, gameId?: number, clientId?: number, fecha?:Date): Observable<LoanPage> {

        return this.http.post<LoanPage>(this.composeFindUrl(gameId, clientId,fecha),{pageable:pageable});
        
    }
    saveLoan(loan: Loan): Observable<void> {
        let url = 'http://localhost:8080/loan';
        if (loan.id != null) url += '/'+loan.id;

        return this.http.put<void>(url, loan);
    }

    deleteLoan(idLoan : number): Observable<void> {
        return this.http.delete<void>('http://localhost:8080/loan/'+idLoan);
    }    

    isPrested(loan: Loan) :Observable<Boolean>{
        return this.http.post<Boolean>('http://localhost:8080/loan/check-disponibilidad',loan);
        
    }
    exceedLoan(loan: Loan) :Observable<Boolean>{
        return this.http.post<Boolean>('http://localhost:8080/loan/check-exceed',loan);
        
    }
    
    getAllloans(): Observable<Loan[]> {
        return this.http.get<Loan[]>('http://localhost:8080/loan');
    }
    
    private composeFindUrl(gameId?: number, clientId?: number, fecha?:Date) : string {
        let params = '';
        
        if (gameId != null) {
            params += "gameId="+gameId;
        }

        if (clientId != null) {
            if (params != '') params += "&";
            params += "clientId="+clientId;
        }

        if (fecha != null) {
            if (params != '') params += "&";
            params += "initial_date="+fecha;
        }

        let url = 'http://localhost:8080/loan'

        console.log( url + '?'+params);
        
        if (params == '') return url;
        
        else return url + '?'+params;
    }
}

