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

        unknownObject = new GameObject(this);

        constructor(public xor: LibXOR) { }

        add(index: number, count: number) {
            let length = this.objects.length;
            this.arrayInfo.set(index | 0,
                new ArrayIndexInfo(length, count));
            this.objects.length = length + count;
            for (let i = 0; i < count; i++) {
                this.objects[i + length] = null;
            }
        }

        get(index: number, i: number): GameObject | null {
            if (!this.arrayInfo.has(index)) {
                return null;
            }
            let ainfo = this.arrayInfo.get(index);
            if (i < 0 && i >= ainfo.length) { return this.unknownObject; }
            let obj = this.objects[i + ainfo.first];
            if (!obj) {
                return null;
            }
            return obj;
        }

        safeget(index: number, i: number): GameObject {
            let obj = this.safeget(index, i);
            if (!obj) {
                hflog.error("GameObject " + index + "/" + i + " does not exist!");
                return this.unknownObject;
            }
            return obj;
        }

        set(index: number, i: number, gobj: GameObject) {
            if (this.arrayInfo.has(index)) {
                hflog.error("Trying to set unknown game object type " + index);
                return;
            }
            gobj.objectType = index;
            gobj.arrayIndex = i;
            gobj.gobjs = this;
            const ainfo = this.arrayInfo.get(index);
            if (i < 0 || i >= ainfo.length) {
                hflog.error("Trying to set unknown game object index " + i);
                return;
            }
            this.objects[i + ainfo.first] = gobj;
        }
    }
}