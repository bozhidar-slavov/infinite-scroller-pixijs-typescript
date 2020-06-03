import * as PIXI from "pixi.js";

import { Main } from "./index"

export default class GameOverPanel extends PIXI.Graphics {

    gameOverText: PIXI.Text;
    restartButton: PIXI.Graphics;

    constructor() {
        super();

        this.beginFill(0xffffff);
        this.lineStyle(3, 0xff0000);
        this.drawRoundedRect(0, 0, 400, 200, 5);

        this.gameOverText = new PIXI.Text("", {
            fontSize: 16,
            align: "center",
            fontFamily: "Arial Black",
            fontVariant: "small-caps",
            fontWeight: "500"
        });

        this.addChild(this.gameOverText);

        // create restart button
        this.restartButton = new PIXI.Graphics();
        this.restartButton.beginFill(0xff000);
        this.restartButton.drawRoundedRect(0, 0, 150, 100, 5);
    
        this.setObjectAtCenterInAnother(this.restartButton, this);

        // generate text for the button
        const restartText = new PIXI.Text("Restart", {
            fontSize: 16,
            fontWeight: 600
        });
        this.restartButton.addChild(restartText);
        
        this.setObjectAtCenterInAnother(restartText, this.restartButton);

        this.addChild(this.restartButton);
        this.restartButton.interactive = true;

        // make restart button more user friendly
        this.restartButton.on("mouseover", () => {
            this.restartButton.alpha = 0.6;
        });

        this.restartButton.on("mouseout", () => {
            this.restartButton.alpha = 1;
        });
    }

    set score(val: number) {
        this.gameOverText.text = `Game over! Your score is ${val} points!`
        
        // Set positions
        this.gameOverText.x = (this.width - this.gameOverText.width) / 2;
        this.gameOverText.y = 10;
        this.x = (Main.GAME_WIDTH - this.width) / 2;
        this.y = (Main.GAME_HEIGHT - this.height) / 2;
    }

    private setObjectAtCenterInAnother(object1: PIXI.Container, object2: PIXI.Container): void {
        object1.x = (object2.width - object1.width) / 2;
        object1.y = (object2.height - object1.height) / 2;
    }
}