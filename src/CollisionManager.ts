import * as PIXI from "pixi.js"

import { Sprite, Ticker } from "pixi.js";

export default class CollisionManager extends PIXI.utils.EventEmitter {

    static CollisionEnter = "CollisionEnter";

    private _playerCollider: Sprite;
    private _colliderByName: Map<string, Sprite>;

    constructor() {
        super();
        this._playerCollider = new PIXI.Sprite();
        this._colliderByName = new Map<string, Sprite>();
        Ticker.shared.add(this.animate, this);
    }

    addPlayerCollider(collider: Sprite): void {
        this._playerCollider = collider;
    }

    addCollider(collider: Sprite): void {
        this._colliderByName.set(collider.name, collider);
    }

    removeCollider(name: string): void {
        this._colliderByName.delete(name);
    }

    private animate(): void {
        this._colliderByName.forEach((collider: Sprite) => {
            const isCollision = this.isCollision(this._playerCollider, collider);
            if (isCollision) {
                this.emit(CollisionManager.CollisionEnter, { colliderName: collider.name });
            }
        });
    }

    private isCollision(obj1: Sprite, obj2: Sprite): boolean {
        const rect1 = obj1.getBounds();
        const rect2 = obj2.getBounds();

        const res = (rect1.x + rect1.width > rect2.x &&
            rect1.x < rect2.x + rect2.width &&
            rect1.y + rect1.height > rect2.y &&
            rect1.y < rect2.y + rect2.height);

        return res;
    }
}