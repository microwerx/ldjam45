/// <reference path="GravityObject.ts" />

namespace XOR {
    class ArrayIndexInfo {
        constructor(private first_: number, private length_: number) { }

        get first(): number { return this.first_; }
        get lastIndex(): number { return this.first_ - this.length_; }
        get length(): number { return this.length_; }
    }

    export class GameObjectManager {
        private arrayInfo = new Map<number, ArrayIndexInfo>();
        private length_ = 0;
        private objects = new Array<GameObject>();
        private arrayTypeNames = new Map<string, number>();

        unknownObject = new GameObject();

        /**
         * 
         * @param xor a reference to the LibXOR library
         */
        constructor(public xor: LibXOR) { }

        /**
         * 
         * @param typeName The string used to reference this type
         * @param gameObjectType a positive integer that indexes this object type
         * @param count The maximum number of objects of this object type
         */
        add(typeName: string, gameObjectType: number, count: number): void {
            if (gameObjectType <= 0) {
                hflog.error("game object type must be > 0");
                return;
            }
            if (this.arrayTypeNames.has(typeName)) {
                hflog.error("game object type already used!");
            }
            let length = this.objects.length;
            this.arrayInfo.set(gameObjectType | 0,
                new ArrayIndexInfo(length, count));
            this.arrayTypeNames.set(typeName, gameObjectType | 0);
            this.objects.length = length + count;
            for (let i = 0; i < count; i++) {
                this.objects[i + length] = null;
            }
        }

        get(gameObjectType: number, i: number): GameObject | null {
            if (!this.arrayInfo.has(gameObjectType)) {
                return null;
            }
            let ainfo = this.arrayInfo.get(gameObjectType);
            if (i < 0 && i >= ainfo.length) { return this.unknownObject; }
            let obj = this.objects[i + ainfo.first];
            if (!obj) {
                return null;
            }
            return obj;
        }

        safeget(gameObjectType: number, i: number): GameObject {
            let obj = this.safeget(gameObjectType, i);
            if (!obj) {
                hflog.error("GameObject { type: " + gameObjectType + ", index: " + i + " } does not exist!");
                return this.unknownObject;
            }
            return obj;
        }

        set(gameObjectType: number, i: number, gobj: GameObject) {
            if (this.arrayInfo.has(gameObjectType)) {
                hflog.error("Trying to set unknown game object type " + gameObjectType);
                return;
            }
            gobj.objectType = gameObjectType;
            gobj.arrayIndex = i;
            gobj.gobjs = this;
            const ainfo = this.arrayInfo.get(gameObjectType);
            if (i < 0 || i >= ainfo.length) {
                hflog.error("Trying to set unknown game object index " + i);
                return;
            }
            this.objects[i + ainfo.first] = gobj;
        }

        getType(typeName: string): number {
            if (this.arrayTypeNames.has(typeName)) {
                return this.arrayTypeNames.get(typeName);
            }
            return 0;
        }
    }
}