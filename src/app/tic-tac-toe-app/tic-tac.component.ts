import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "tic-tac",
    templateUrl: "tic-tac.component.html"
})

export class TicTacComponent implements OnInit {
    public game: string[] = new Array(9);
    public currentPlayer: string;
    public winner: string;
    private playerX: string = 'X';
    private playerY: string = 'Y';
    private readonly wonCombintations: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    ngOnInit(): void {
        this.currentPlayer = this.playerX;
    }

    set(index: number) {
        if (this.winner) return;
        if (!this.game[index] || this.game[index] == '') {
            if (this.currentPlayer == this.playerX) {
                this.game[index] = this.playerX;
                this.currentPlayer = this.playerY;
            } else {
                this.game[index] = this.playerY;
                this.currentPlayer = this.playerX;
            }
        }
        this.winner = this.getWinner();
    }

     getWinner(): string {
        for (let i = 0; i < this.wonCombintations.length; i++) {
            const [a, b, c] = this.wonCombintations[i];
            
            if(this.game[a] && this.game[a] === this.game[b] && this.game[a] === this.game[c]) {
                return this.game[a];
            }
        }

        return null;
    }

    clear() {
        this.game = new Array(9);
        this.winner = null;
    }
}