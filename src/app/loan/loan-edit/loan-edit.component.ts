import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';

@Component({
selector: 'app-loan-edit',
templateUrl: './loan-edit.component.html',
styleUrls: ['./loan-edit.component.scss']
})
export class LoanEditComponent implements OnInit {

    loan : Loan;
    clients: Client[];
    games: Game[];
    fechaDevolucionInvalida : Boolean;
    tiempoPrestamoExcedido: Boolean;
    gamePrested: Boolean;
    gamesExceded: Boolean;

    constructor(
        public dialogRef: MatDialogRef<LoanEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private loanService: LoanService,
        private clientService: ClientService,
        private gameService: GameService,
    ) { }

    ngOnInit(): void {
  
            this.loan = new Loan();

            this.clientService.getClients().subscribe(
                clients => {
                    this.clients = clients;
    
                    if (this.loan.client != null) {
                        let clientFilter: Client[] = clients.filter(client => client.id == this.data.loan.client.id);
                        if (clientFilter != null) {
                            this.loan.client = clientFilter[0];
                        }
                    }
                }
            );
    
            this.gameService.getGames().subscribe(
                games => {
                    this.games = games
    
                    if (this.loan.game != null) {
                        let gameFilter: Game[] = games.filter(game => game.id == this.data.loan.game.id);
                        if (gameFilter != null) {
                            this.loan.game = gameFilter[0];
                        }
                    }
                }
            );
        }
        checkFinalDate(){

            const fechaInicio = new Date(this.loan.initialDate);
            const fechaFin = new Date(this.loan.finalDate);
            const diffTime = fechaFin.getTime() - fechaInicio.getTime();
            const diffDays = diffTime / (1000 * 60 * 60 * 24)
    
            //Si fecha fin es anterior a fecha inicio
            if(diffDays < 0){
                this.fechaDevolucionInvalida = true;
                this.tiempoPrestamoExcedido = false;
            }
    
            //Si el prestamo excede 14 días
            else if(diffDays>14){
                this.tiempoPrestamoExcedido = true;
                this.fechaDevolucionInvalida = false;     
                }
            
            
            //Préstamo correcto
            else{
                this.fechaDevolucionInvalida = false;
                this.tiempoPrestamoExcedido = false;             
            }
            
        }
        isGamePrested(){
            this.loanService.isPrested(this.loan).subscribe(
                
                result =>{
                if (result){
                    this.gamePrested = true;
                    
                }else{
                    this.gamePrested = false;
                }
              })
        }
        exceedGames(){
            this.loanService.exceedLoan(this.loan).subscribe(
                result =>{
                if (result){
                    this.gamesExceded = true;                  
                }else{
                    this.gamesExceded = false;
                }
              })
    
        }
    onSave() {
        if(!this.gamePrested && !this.tiempoPrestamoExcedido && !this.fechaDevolucionInvalida && !this.gamesExceded){
            this.loanService.saveLoan(this.loan).subscribe(result => {

                this.dialogRef.close();
            });  
        }
          
    } 

    onClose() {
        this.dialogRef.close();
    }

}