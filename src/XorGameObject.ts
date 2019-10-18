/// <reference path="./XorObjectManager.ts" />

namespace XOR {
    export class GameObject {
        private objectType: number = -1;
        private ArrayIndex: number = -1;

        constructor(public gobjs: GameObjectManager) { }
    }
}