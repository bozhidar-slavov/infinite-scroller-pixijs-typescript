import * as PIXI from "pixi.js"

export default class Ground extends PIXI.Sprite {

    constructor() {
        super();
        const a = new PIXI.Graphics();
        a.beginFill(0x0fff);
        a.drawRect(0, 0, 800, 150);
        this.addChild(a);
        this.y = 540;
        this.visible = false;

        this.name = "Ground";
    }
}