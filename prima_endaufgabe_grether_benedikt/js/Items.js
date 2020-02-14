"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    let ITEM;
    (function (ITEM) {
        ITEM["NONE"] = "None";
        ITEM["SWORD"] = "Sword";
    })(ITEM = prima_endaufgabe_grether_benedikt.ITEM || (prima_endaufgabe_grether_benedikt.ITEM = {}));
    // let itemCounter: number = 20;
    class Items extends ƒ.Node {
        // public itemUsabilityPoints: number;
        constructor(type, _itemUsabilityPoints, _locationY) {
            super("Item");
            this.type = type;
            this.addComponent(new ƒ.ComponentTransform());
            this.cmpTransform.local.translateY(_locationY);
            this.itemUsabilityPoints = _itemUsabilityPoints;
            // if (_location){
            //   console.log(this.cmpTransform.local.translation.x);
            //   this.cmpTransform.local.translateX(_location);
            //   console.log(_location);
            // }
            for (let sprite of Items.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show();
            this.hitbox = this.creatHitbox();
            this.appendChild(this.hitbox);
        }
        static generateSprites(_txtImage) {
            Items.sprites = [];
            let sprite = new prima_endaufgabe_grether_benedikt.Sprite(ITEM.SWORD);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(169, 125, 8, 18), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.TOPCENTER);
            Items.sprites.push(sprite);
        }
        itemUsability() {
            // console.log();
            this.itemUsabilityPoints = this.itemUsabilityPoints - 1;
            // this.updateItemUsability();
        }
        // private updateItemUsability(): void {
        //   if (this.itemCounter == this.itemUsabilityPoints) {
        //     this.itemCounter -= 5;
        //     this.healthBar -= 20;
        //     let element: HTMLElement = document.getElementById("itemHealthBar");
        //     element.style.width = this.healthBar + "%";
        //   }
        //   if (this.itemUsabilityPoints == 0) {
        //     bene.item = ITEM.NONE;
        //     this.itemCounter = 20;
        //     // this.itemUsabilityPoints = 25;
        //     this.healthBar = 100;
        //     Sound.play("itemDegredation");
        //   }
        // }
        creatHitbox() {
            let hitbox = new prima_endaufgabe_grether_benedikt.Hitbox("ItemHitbox");
            hitbox.cmpTransform.local.scaleX(0.2);
            hitbox.cmpTransform.local.scaleY(0.4);
            this.hitbox = hitbox;
            return hitbox;
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == this.type);
        }
    }
    Items.itemCounter = 20;
    Items.healthBar = 100;
    prima_endaufgabe_grether_benedikt.Items = Items;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Items.js.map