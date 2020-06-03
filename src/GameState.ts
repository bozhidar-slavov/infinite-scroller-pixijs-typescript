export default class GameState {

    private static _instance: GameState;

    public score: number;

    constructor() {
        this.score = 0
    }

    static get instance(): GameState {
        if (GameState._instance) {
            return GameState._instance;
        }

        GameState._instance = new GameState();

        return GameState._instance;
    }
}