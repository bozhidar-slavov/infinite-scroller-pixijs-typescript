import * as PIXI from "pixi.js"

export default class Background extends PIXI.Container {

    private static readonly BACKGROUND_SPEED = 3;

    private _slides:PIXI.Sprite[] = []

    constructor(){
        super();
        this._slides = [
            new PIXI.Sprite(PIXI.Texture.from("bg1")),
            new PIXI.Sprite(PIXI.Texture.from("bg1")),
        ]

        this.addChild(this._slides[0], this._slides[1]);
        
        this._slides[1].x = this._slides[0].x + this._slides[0].width

        PIXI.Ticker.shared.add(this.animate.bind(this))
    }

    private animate(): void {
        this._slides[0].x -= Background.BACKGROUND_SPEED;
        this._slides[1].x -= Background.BACKGROUND_SPEED;
        
        if(this._slides[0].x <= -this._slides[0].width) {
            console.log("*** animate background - change");
            this._slides[0].x = this._slides[1].x + this._slides[1].width;

            const tmp = this._slides[0];
            this._slides[0] = this._slides[1];
            this._slides[1] = tmp;
        }
    }
}