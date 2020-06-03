import * as PIXI from "pixi.js";

export default class ScorePanel extends PIXI.Container {

    scoreText: PIXI.Text;

    constructor() {
        super();

        this.scoreText = new PIXI.Text("", {
            fontWeight: 600
        });
        this.score = 0;
        this.x = 5;
        this.y = 5;
        this.addChild(this.scoreText);
    }

    set score(val: number) {
        this.scoreText.text = `Score: ${val}`;
    }
}