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
            this.itemCounter = _itemUsabilityPoints - 5;
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
            this.itemUsabilityPoints = this.itemUsabilityPoints - 1;
            this.updateItemUsability();
        }
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
        updateItemUsability() {
            if (this.itemCounter == this.itemUsabilityPoints) {
                this.itemCounter -= 20;
                Items.healthBar -= 20;
                let element = document.getElementById("itemHealthBar");
                element.style.width = Items.healthBar + "%";
            }
            if (this.itemUsabilityPoints == 0) {
                prima_endaufgabe_grether_benedikt.bene.item.type = ITEM.NONE;
                Items.healthBar = 100;
                prima_endaufgabe_grether_benedikt.Sound.play("itemDegredation");
            }
        }
    }
    // static itemCounter: number = 20;
    Items.healthBar = 100;
    prima_endaufgabe_grether_benedikt.Items = Items;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Items.js.map