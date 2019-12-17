function Sprite(params = {}) {
    var exemplo = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        h: 10,
        w: 10,
        a: 0,
        va: 0,
        vm: 0,
        props: {},
        deSpawn: {},
        flechadirex: 1,
        flechadirey: 0,
        ladoDaFlecha: 0,
        tempoDeVida: undefined,
        atack: 0,
        urro: 0,
        cooldown: 0,
        frame: 0,
        lado: 0,
        ultimoLado: 3,
        color: "blue",
        vida: 1,
        imune: 0,
        atirando: 0,
        comportar: undefined,
        scene: undefined
    }
    Object.assign(this, exemplo, params);
}
Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function (ctx) {
    if (this.props.tipo == "personagem") {
        if (Math.floor(this.frame) > 8 && this.cooldown < 0) {
            this.frame = 1;
        }
        if (Math.floor(this.frame) > 13) {
            this.frame = 6;
        }
        if (this.vida == 0) {
            this.frame = 0;
            this.vida--;
        }
        if (Math.floor(this.frame) > 5 && this.vida < 0) {
            this.frame = 5;
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        var F = Math.floor(this.frame);
        if (this.vx < 0 && Math.abs(this.vx) > Math.abs(this.vy) && (this.lado != 3 || this.lado != 4)) { this.lado = 1; this.ultimoLado = 2; this.vmx = 300 }// esquerda
        if (this.vx > 0 && Math.abs(this.vx) > Math.abs(this.vy) && (this.lado != 3 || this.lado != 4)) { this.lado = 2; this.ultimoLado = 4; this.vmx = 300 }// direita
        if (this.vy < 0 && Math.abs(this.vy) > Math.abs(this.vx) && (this.lado != 2 || this.lado != 1)) { this.lado = 3; this.ultimoLado = 1; this.vmy = -300 }// cima
        if (this.vy > 0 && Math.abs(this.vy) > Math.abs(this.vx) && (this.lado != 2 || this.lado != 1)) { this.lado = 4; this.ultimoLado = 3; this.vmy = 300 }// baixo
        if (this.vx == 0 && this.vy == 0 && this.cooldown < 0 && this.vida > 0) { this.lado = 0; }
        if (this.cooldown > 0) { this.lado = 5; }
        if (this.vida < 0) { this.lado = 6; }
        switch (this.lado) {                         //////////////////////////PERSONAGEM
            case 0:
                ctx.drawImage(this.scene.assets.img("personagem"), 0, 64 * (7 + this.ultimoLado), 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                ctx.drawImage(this.scene.assets.img("calças"), 0, 64 * (7 + this.ultimoLado), 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                break;
            case 1:
                ctx.drawImage(this.scene.assets.img("personagem"), (F % 9) * 64, 64 * 9, 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                ctx.drawImage(this.scene.assets.img("calças"), (F % 9) * 64, 64 * 9, 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                break;
            case 2:
                ctx.drawImage(this.scene.assets.img("personagem"), (F % 9) * 64, 64 * 11, 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                ctx.drawImage(this.scene.assets.img("calças"), (F % 9) * 64, 64 * 11, 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                break;
            case 3:
                ctx.drawImage(this.scene.assets.img("personagem"), (F % 9) * 64, 64 * 8, 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                ctx.drawImage(this.scene.assets.img("calças"), (F % 9) * 64, 64 * 8, 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                break;
            case 4:
                ctx.drawImage(this.scene.assets.img("personagem"), (F % 9) * 64, 64 * 10, 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                ctx.drawImage(this.scene.assets.img("calças"), (F % 9) * 64, 64 * 10, 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                break;
            case 5:
                ctx.drawImage(this.scene.assets.img("personagem"), (F % 12) * 64, 64 * (15 + this.ultimoLado), 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                ctx.drawImage(this.scene.assets.img("calças"), (F % 12) * 64, 64 * (15 + this.ultimoLado), 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                break;
            case 6:
                ctx.drawImage(this.scene.assets.img("personagem"), (F % 6) * 64, 64 * 20, 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                ctx.drawImage(this.scene.assets.img("calças"), (F % 6) * 64, 64 * 20, 64, 64, -this.w * 3.2, -this.h * 5.5, 64, 64)
                break;
            default:
                this.frame = 0;
                break;

        }
        ctx.restore();
    }
    if (this.props.tipo == "inimigo") {
        if (this.atack == 1 && this.vm == 0 && this.frame == 1) {
            cena1.assets.play("espada");
        }
        if (this.vida == 0) {
            this.frame = 0;
            this.vida--;
        }
        if (Math.floor(this.frame) > 5 && this.vida < 0) {
            this.frame = 5;
        }
        if (Math.floor(this.frame) > 6) {
            this.frame = 1;
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        var F = Math.floor(this.frame);
        if (this.vx < 0 && Math.abs(this.vx) > Math.abs(this.vy) && (this.lado != 3 || this.lado != 4)) { this.lado = 1; this.ultimoLado = 2 }// esq
        if (this.vx > 0 && Math.abs(this.vx) > Math.abs(this.vy) && (this.lado != 3 || this.lado != 4)) { this.lado = 2; this.ultimoLado = 4 }//dir
        if (this.vy < 0 && Math.abs(this.vy) > Math.abs(this.vx) && (this.lado != 2 || this.lado != 1)) { this.lado = 3; this.ultimoLado = 1 }//cima
        if (this.vy > 0 && Math.abs(this.vy) > Math.abs(this.vx) && (this.lado != 2 || this.lado != 1)) { this.lado = 4; this.ultimoLado = 3 }//baixo
        if (this.vm == 0 && this.atack == 1) { this.lado = 5; }
        if (this.vida < 0) { this.lado = 6 }
        switch (this.lado) {                                           ////////////INIMIGO
            case 0:
                ctx.drawImage(this.scene.assets.img("inimigo2"), 0, 64 * 10, 64, 64, -this.w * 2, -this.h * 3.5, 64, 64);
                break;
            case 1:
                ctx.drawImage(this.scene.assets.img("inimigo2"), (F % 9) * 64, 64 * 9, 64, 64, -this.w * 2, -this.h * 3.5, 64, 64);
                break;
            case 2:
                ctx.drawImage(this.scene.assets.img("inimigo2"), (F % 9) * 64, 64 * 11, 64, 64, -this.w * 2, -this.h * 3.5, 64, 64);
                break;
            case 3:
                ctx.drawImage(this.scene.assets.img("inimigo2"), (F % 9) * 64, 64 * 8, 64, 64, -this.w * 2, -this.h * 3.5, 64, 64);
                break;
            case 4:
                ctx.drawImage(this.scene.assets.img("inimigo2"), (F % 9) * 64, 64 * 10, 64, 64, -this.w * 2, -this.h * 3.5, 64, 64);
                break;
            case 5:
                ctx.drawImage(this.scene.assets.img("inimigo2"), (F % 6) * 64, 64 * (11 + this.ultimoLado), 64, 64, -this.w * 2, -this.h * 3.5, 64, 64);
                break;
            case 6:
                ctx.drawImage(this.scene.assets.img("inimigo2"), (F % 6) * 64, 64 * 20, 64, 64, -this.w * 2, -this.h * 3.5, 64, 64);
                break;
            default:
                this.frame = 0;
                break;

        }
        ctx.restore();
    }
    if (this.props.tipo == "tiro") {
        ctx.save();
        ctx.translate(this.x, this.y);
        switch (this.ladoDaFlecha) {                                           ////////////INIMIGO
            case 0:
                ctx.drawImage(this.scene.assets.img("flecha"), 256 * (this.ladoDaFlecha), 0, 256, 256, -this.w * 7.5, -this.h * 4.50, 64, 64);
                break;
            case 1:
                ctx.drawImage(this.scene.assets.img("flecha"), 256 * (this.ladoDaFlecha), 0, 256, 256, -this.w * 4, -this.h * 7.50, 64, 64);
                break;
            case 2:
                ctx.drawImage(this.scene.assets.img("flecha"), 256 * (this.ladoDaFlecha), 0, 256, 256, -this.w * 7.5, -this.h * 11, 64, 64);
                break;
            case 3:
                ctx.drawImage(this.scene.assets.img("flecha"), 256 * (this.ladoDaFlecha), 0, 256, 256, -this.w * 11, -this.h * 7.50, 64, 64);
                break;
            default:
                break;
        }
        ctx.restore();
    }
    ctx.fillStyle = "blue";
    //ctx.fillRect(this.x, this.y, 5, 5);
};

Sprite.prototype.mover = function (dt) {
    if (this.props.tipo == "inimigo") {
        this.moverCircular(dt);
    }
    else {
        this.moverOrtogonal(dt);
    }
}

Sprite.prototype.moverCircular = function (dt) {

    this.frame += 10 * dt;

    this.a = this.a + this.va * dt;

    if (this.vida < 0){
        this.vm = 0;
    }

    this.vx = this.vm * Math.cos(this.a);
    this.vy = this.vm * Math.sin(this.a);

    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;

    this.mc = Math.floor(this.x / this.scene.map.SIZE);
    this.ml = Math.floor(this.y / this.scene.map.SIZE);

    this.aplicaRestricoes(dt);
    this.cooldown = this.cooldown - dt;
    this.tempoDeVida = this.tempoDeVida - dt;
}

Sprite.prototype.moverOrtogonal = function (dt) {
    this.a = this.a + this.va * dt;

    this.frame += 20 * dt;

    this.vx = this.vx// + this.ax * dt// - this.vx * 0.9 * dt;
    this.vy = this.vy// + this.ay * dt /*+ 120 * dt*/;

    this.mc = Math.floor(this.x / this.scene.map.SIZE);
    this.ml = Math.floor(this.y / this.scene.map.SIZE);

    this.aplicaRestricoes(dt);
    this.cooldown = this.cooldown - dt;
    this.tempoDeVida = this.tempoDeVida - dt;
}
Sprite.prototype.aplicaRestricoes = function (dt) {

    var dnx;
    var dx;
    dx = this.vx * dt;
    dnx = dx;
    dy = this.vy * dt;
    dny = dy;
    if (dx > 0
        && this.scene.map.cells[this.mc + 1][this.ml].tipo != 0
        && this.scene.map.cells[this.mc + 1][this.ml].tipo != 10
    ) {
        dnx = this.scene.map.SIZE * (this.mc + 1) - (this.x + this.w / 2);
        dx = Math.min(dnx, dx);
    }
    if (dx < 0
        && this.scene.map.cells[this.mc - 1][this.ml].tipo != 0
        && this.scene.map.cells[this.mc - 1][this.ml].tipo != 10
    ) {
        dnx = this.scene.map.SIZE * (this.mc - 1 + 1) - (this.x - this.w / 2);
        dx = Math.max(dnx, dx);
    }
    if (dy > 0
        && this.scene.map.cells[this.mc][this.ml + 1].tipo != 0
        && this.scene.map.cells[this.mc][this.ml + 1].tipo != 10
    ) {
        dny = this.scene.map.SIZE * (this.ml + 1) - (this.y + this.h / 2);
        dy = Math.min(dny, dy);
    }
    if (dy < 0
        && this.scene.map.cells[this.mc][this.ml - 1].tipo != 0
        && this.scene.map.cells[this.mc][this.ml - 1].tipo != 10
    ) {
        dny = this.scene.map.SIZE * (this.ml - 1 + 1) - (this.y - this.h / 2);
        dy = Math.max(dny, dy);
    }
    this.vy = dy / dt;
    this.x = this.x + dx;
    this.y = this.y + dy;

    var MAXX = this.scene.map.SIZE * this.scene.map.COLUMNS - this.w / 2;
    var MAXY = this.scene.map.SIZE * this.scene.map.LINES - this.h / 2;

    if (this.x > MAXX) this.x = MAXX;
    if (this.y > MAXY) {
        this.y = MAXY;
        this.vy = 0;
    }
    if (this.x - this.w / 2 < 0) this.x = 0 + this.w / 2;
    if (this.y - this.h / 2 < 0) this.y = 0 + this.h / 2;

}


Sprite.prototype.colidiuCom = function (alvo) {
    if (alvo.x + alvo.w / 2 < this.x - this.w / 2) return false;
    if (alvo.x - alvo.w / 2 > this.x + this.w / 2) return false;

    if (alvo.y + alvo.h / 2 < this.y - this.h / 2) return false;
    if (alvo.y - alvo.h / 2 > this.y + this.h / 2) return false;

    return true;
}

Sprite.prototype.colidiuComFlecha = function (alvo) {
    if (alvo.x + alvo.w / 2 < this.x - this.w) return false;
    if (alvo.x - alvo.w / 2 > this.x + this.w) return false;

    if (alvo.y + alvo.h / 2 < this.y - 35) return false;
    if (alvo.y - alvo.h / 2 > this.y + this.h / 2) return false;

    return true;
}

Sprite.prototype.entrouNoRange = function (alvo) {
    this.mc = Math.floor(this.x / this.scene.map.SIZE);
    this.ml = Math.floor(this.y / this.scene.map.SIZE);
    if (alvo.x + alvo.w / 2 < this.x - 200 || this.scene.map.cells[this.mc][this.ml].tipo == 10) return false;
    if (alvo.x - alvo.w / 2 > this.x + 200 || this.scene.map.cells[this.mc][this.ml].tipo == 10) return false;

    if (alvo.y + alvo.h / 2 < this.y - 200 || this.scene.map.cells[this.mc][this.ml].tipo == 10) return false;
    if (alvo.y - alvo.h / 2 > this.y + 200 || this.scene.map.cells[this.mc][this.ml].tipo == 10) return false;

    return true;
}
