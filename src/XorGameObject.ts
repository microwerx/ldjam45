/// <reference path="./XorObjectManager.ts" />

namespace XOR {
    export class GameObject {
        objectName: string = "";
        objectType: number = 0;
        arrayIndex: number = -1;
        gobjs: GameObjectManager | null = null;

        constructor() { }

        set name(s: string) { this.objectName = s; }
        get name(): string { return this.objectName; }
    }
}