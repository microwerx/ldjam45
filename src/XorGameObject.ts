/// <reference path="./XorObjectManager.ts" />

namespace XOR {
    export class GameObject {
        objectType: number = -1;
        arrayIndex: number = -1;
        gobjs: GameObjectManager | null = null;

        constructor() { }
    }
}