import * as PIXI from "pixi.js";

export default class Hero extends PIXI.Sprite {

    private static readonly HERO_WIDTH = 80;
    private static readonly HERO_HEIGHT = 50;
    private static readonly HERO_SPEED = 5;
    private static readonly GRAVITY = 0.8;
    private static readonly SCREEN_WIDTH = 710;

    private _map = {
        arrowUp: false,
        arrowDown: false,
        arrowLeft: false,
        arrowRight: false
    }

    constructor() {
        super();
        const hero = new PIXI.Sprite(PIXI.Texture.from("hero"));
        hero.width = Hero.HERO_WIDTH;
        hero.height = Hero.HERO_HEIGHT;
        this.addChild(hero);

        this.startController();
        PIXI.Ticker.shared.add(this.animate.bind(this));
        PIXI.Ticker.shared.add(() => {
            this.y += Hero.GRAVITY;
        });

        this.name= "Hero";
    }

    resetPosition(): void {
        this.position.set(0,0);
    }

    private animate(): void {
        if (this._map.arrowDown) {
            this.y += Hero.HERO_SPEED;
        }

        if (this._map.arrowUp) {
            if (this.y - Hero.HERO_SPEED <= 0) {
                this.y = 0;
            }

            this.y -= Hero.HERO_SPEED;
        }
        if (this._map.arrowLeft) {
            if (this.x - Hero.HERO_SPEED <= 0) {
                this.x = 0;
            }

            this.x -= Hero.HERO_SPEED;
        }

        if (this._map.arrowRight) {
            if (this.x + Hero.HERO_SPEED >= Hero.SCREEN_WIDTH) {
                this.x = Hero.SCREEN_WIDTH;
            }
            
            this.x += Hero.HERO_SPEED;
        }
    }

    startController(): void {
        document.onkeydown = (e: KeyboardEvent) => {
            const arrowLeft = 37;
            const arrowUp = 38;
            const arrowRight = 39;
            const arrowDown = 40;

            document.onkeyup = (e: KeyboardEvent) => {
                switch (e.keyCode) {
                    case arrowUp:
                        this._map.arrowUp = false
                        break;
                    case arrowDown:
                        this._map.arrowDown = false
                        break;
                    case arrowLeft:
                        this._map.arrowLeft = false
                        break;
                    case arrowRight:
                        this._map.arrowRight = false
                        break;
                }
            }

            document.onkeydown = (e: KeyboardEvent) => {
                switch (e.keyCode) {
                    case arrowUp:
                        this._map.arrowUp = true
                        break;
                    case arrowDown:
                        this._map.arrowDown = true
                        break;
                    case arrowLeft:
                        this._map.arrowLeft = true
                        break;
                    case arrowRight:
                        this._map.arrowRight = true
                        break;
                }
            }
        }
    }
}