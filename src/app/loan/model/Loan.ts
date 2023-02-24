import { Client } from "src/app/client/model/Client";
import { Game } from "src/app/game/model/Game";
export class Loan {
    id: number;
    initial_date: Date;
    final_date: Date;
    game: Game;
    client: Client;    
}