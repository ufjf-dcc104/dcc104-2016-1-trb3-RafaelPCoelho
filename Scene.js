function Scene(params) {
    var exemplo = {
        sprites: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
        assets: null,
        map: null
    }
    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.adicionar = function (sprite) {
    this.sprites.push(sprite);
    sprite.scene = this;
};

Scene.prototype.desenhar = function () {
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].desenhar(this.ctx);
    }
};

Scene.prototype.mover = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].mover(dt);
    }
};

Scene.prototype.comportar = function () {
    for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].comportar) {
            this.sprites[i].comportar();
        }
    }
};

Scene.prototype.limpar = function () {
    this.ctx.clearRect(0, 0, this.w, this.h);
}

Scene.prototype.spawnDeInimigos = function (dt){
    tempoDeSpawn = tempoDeSpawn - dt * 1;
    if ((tempoDeSpawn <= 7 && tempoDeSpawn >= 6.99) || (tempoDeSpawn <= 6 && tempoDeSpawn >= 5.99) || (tempoDeSpawn <= 5 && tempoDeSpawn >= 4.99) || (tempoDeSpawn <= 4 && tempoDeSpawn >= 3.99) || (tempoDeSpawn <= 3 && tempoDeSpawn >= 2.99)){
        cena1.adicionar(new Sprite({ 
            x: 990,
            y: 150,
            h: 15,
            w: 15,
            va: 20,
            vm: 10 + ( Math.random()* 50 ),
            color: "green",
            //vida: 1,
            comportar: persegue(personagem),
            props: { tipo: "inimigo" },
            deSpawn: {tipo: "s"},
        }));
 }
}

Scene.prototype.atiraFlecha = function () {
    if (personagem.cooldown <= 0.2 && personagem.cooldown >= 0.18) {
        this.assets.play("tiro");
        var posiçãoDaFlecha = 0
        if (personagem.ultimoLado == 1) {//cima
            posiçãoDaFlecha = 0;
        }
        if (personagem.ultimoLado == 2) {//esquerda
            posiçãoDaFlecha = 1;
        }
        if (personagem.ultimoLado == 3) {//baixo
            posiçãoDaFlecha = 2;
        }
        if (personagem.ultimoLado == 4) {//direita
            posiçãoDaFlecha = 3;
        }
        cena1.adicionar(new Sprite({
            x: personagem.x - 10, y: personagem.y - 20,
            vx: 800 * flechadirex,
            vy: 800 * flechadirey,
            vm: 240,
            color: "blue",
            ladoDaFlecha: posiçãoDaFlecha,
            w: 4,
            h: 4,
            tempoDeVida: 3,
            props: { tipo: "tiro" }
        }));
    }
}

Scene.prototype.checaColisao = function () {
    for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].morto) {
            this.toRemove.push(this.sprites[i]);
        }
        for (var j = i + 1; j < this.sprites.length; j++) {
            if (this.sprites[i].entrouNoRange(this.sprites[j])) {
                if (this.sprites[i].props.tipo === "personagem" && this.sprites[j].deSpawn.tipo === "n" && this.sprites[j].urro == 0 && this.sprites[j].vida > 0) {
                    tempoDeSpawn = 8;
                }
                if (this.sprites[i].props.tipo === "personagem" && this.sprites[j].props.tipo === "inimigo" && this.sprites[j].vida > 0) {
                    this.sprites[j].vm = 20 + Math.random()*30;
                    if (this.sprites[j].urro == 0 && this.sprites[j].deSpawn.tipo === "n"){
                        this.assets.play("urro");
                        this.sprites[j].urro = 1;
                    }
                }
            }
            if (this.sprites[i].colidiuCom(this.sprites[j])) {
                if (this.sprites[i].props.tipo === "personagem" && this.sprites[j].props.tipo === "inimigo" && this.sprites[j].vida > 0) {
                    this.sprites[j].vm = 0;
                    this.sprites[j].atack = 1;
                    if (this.sprites[j].vida > 0){
                        this.sprites[i].vida--;
                        }
                }
                else {
                    this.sprites[j].atack = 0;
                }
            }
            if (this.sprites[i].colidiuComFlecha(this.sprites[j])) {
                if (this.sprites[i].props.tipo === "inimigo" && this.sprites[j].props.tipo === "tiro" && this.sprites[i].vida > 0) {
                    this.toRemove.push(this.sprites[j]);
                    this.sprites[i].vida--;
                }
            }
        }
    }
};

Scene.prototype.removeFlecha = function () {
    for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].tempoDeVida < 0) {
            this.toRemove.push(this.sprites[i]);
        }
    }
}

Scene.prototype.removeMorto = function () {
    for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].vida <= 0) {
            //this.toRemove.push(this.sprites[i]);
        }
    }
}

Scene.prototype.removeSprites = function () {
    for (var i = 0; i < this.toRemove.length; i++) {
        var idx = this.sprites.indexOf(this.toRemove[i]);
        if (idx >= 0) {
            this.sprites.splice(idx, 1);
        }
    }
    this.toRemove = [];
};

Scene.prototype.desenharMapa = function () {
    this.map.desenhar(this.ctx);
}

Scene.prototype.passo = function (dt) {
    this.limpar();
    this.desenharMapa();
    this.atiraFlecha();
    this.spawnDeInimigos(dt);
    this.removeFlecha();
    this.removeMorto();
    this.comportar();
    this.mover(dt);
    this.desenhar();
    this.checaColisao();
    this.removeSprites();
}