function Map(modelo) {
    exemplo = {
        cells: [],
        LINES: 32,
        COLUMNS: 32,
        SIZE: 32,
        assets: null,
    }
    Object.assign(this, exemplo, modelo);
    for (var c = 0; c < this.COLUMNS; c++) {
        exemplo.cells[c] = [];
        for (var l = 0; l < this.LINES; l++) {
            exemplo.cells[c][l] = { tipo: 0 };
        }
    }
    if (modelo.m) {
        for (var c = 0; c < this.COLUMNS; c++) {
            for (var l = 0; l < this.LINES; l++) {
                this.cells[c][l] = { tipo: modelo.m[l][c] };
            }
        }
    }
}

Map.prototype.desenhar = function (ctx) {
    var constEndFade = 50;
    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
            ctx.globalAlpha = 1.0;

            switch (this.cells[c][l].tipo) {
                case 0:
                    ctx.drawImage(this.assets.img("floresta"), 0, 0, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 1:
                    if (mapaframe > 3) {
                        mapaframe = 0
                    }
                    ctx.drawImage(this.assets.img("floresta"), 0, 0, 32, 32, c * this.SIZE, l * this.SIZE, 32, 33)
                    ctx.drawImage(this.assets.img("floresta"), (1 + Math.floor(mapaframe)) * 32, 5 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 33)
                    break;
                case 2:
                    ctx.drawImage(this.assets.img("floresta"), (2 * 32) + 1, (6 * 32), 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 3:
                    ctx.drawImage(this.assets.img("floresta"), 2 * 32, (7 * 32) - 1, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 4:
                    ctx.drawImage(this.assets.img("floresta"), (3 * 32) - 1, (6 * 32), 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 5:
                    ctx.drawImage(this.assets.img("floresta"), 3 * 32, (7 * 32) - 1, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 6: // Topo de arvore direito
                    ctx.drawImage(this.assets.img("floresta"), 0, 0, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    ctx.drawImage(this.assets.img("floresta"), 32, 6 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 7:
                    ctx.drawImage(this.assets.img("floresta"), 0, 0, 31, 31, c * this.SIZE, l * this.SIZE, 32, 32)
                    ctx.drawImage(this.assets.img("floresta"), 32, 7 * 32, 31, 31, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 8:
                    ctx.drawImage(this.assets.img("floresta"), 0, 0, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    ctx.drawImage(this.assets.img("floresta"), 0, 7 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 9: //Topo de arvore esquerdo
                    ctx.drawImage(this.assets.img("floresta"), 0, 0, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    ctx.drawImage(this.assets.img("floresta"), 0, 6 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 10: // grama
                    ctx.drawImage(this.assets.img("floresta"), 0, 0, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    ctx.drawImage(this.assets.img("floresta"), 13 * 32, 2 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 11: //esquedo superior da tenda
                    ctx.drawImage(this.assets.img("floresta"), 0, 0, 31, 31, c * this.SIZE, l * this.SIZE, 32, 32)
                    ctx.drawImage(this.assets.img("floresta"), 14 * 32, 2 * 32, 31, 31, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 12:// esquerdo inferior da tenda
                    ctx.drawImage(this.assets.img("floresta"), 0, 0, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    ctx.drawImage(this.assets.img("floresta"), 14 * 32, 3 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 13: // direito superidor da tenda
                    ctx.drawImage(this.assets.img("floresta"), 0, 0, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    ctx.drawImage(this.assets.img("floresta"), 15 * 32, 2 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 14:// direito inferior da tenda
                    ctx.drawImage(this.assets.img("floresta"), 0, 0, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    ctx.drawImage(this.assets.img("floresta"), 15 * 32, 3 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    break;
                case 15: // superior esquerdo agua
                    if (Math.floor(mapaframe) == 0)
                        ctx.drawImage(this.assets.img("floresta"), 4 * 32, 7 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 1)
                        ctx.drawImage(this.assets.img("floresta"), 7 * 32, 7 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 2)
                        ctx.drawImage(this.assets.img("floresta"), 10 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) > 2)
                    ctx.drawImage(this.assets.img("floresta"), 10 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)    
                        break;
                case 16: // superior meio agua
                    if (Math.floor(mapaframe) == 0)
                        ctx.drawImage(this.assets.img("floresta"), 5 * 32, 7 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 1)
                        ctx.drawImage(this.assets.img("floresta"), 8 * 32, 7 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 2)
                        ctx.drawImage(this.assets.img("floresta"), 11 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) > 2)
                    ctx.drawImage(this.assets.img("floresta"), 11 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)    
                        break;
                case 17:// superior direito agua
                    if (Math.floor(mapaframe) == 0)
                        ctx.drawImage(this.assets.img("floresta"), 6 * 32, 7 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 1)
                        ctx.drawImage(this.assets.img("floresta"), 9 * 32, 7 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 2)
                        ctx.drawImage(this.assets.img("floresta"), 12 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) > 2)
                    ctx.drawImage(this.assets.img("floresta"), 12 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)    
                        break;
                case 18:// meio esquerdo agua
                    if (Math.floor(mapaframe) == 0)
                        ctx.drawImage(this.assets.img("floresta"), 4 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 1)
                        ctx.drawImage(this.assets.img("floresta"), 7 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 2)
                        ctx.drawImage(this.assets.img("floresta"), 10 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) > 2)
                    ctx.drawImage(this.assets.img("floresta"), 10 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)    
                        break;
                case 19:// meio meio agua
                    if (Math.floor(mapaframe) == 0)
                        ctx.drawImage(this.assets.img("floresta"), 5 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 1)
                        ctx.drawImage(this.assets.img("floresta"), 8 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 2)
                        ctx.drawImage(this.assets.img("floresta"), 11 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) > 2)
                    ctx.drawImage(this.assets.img("floresta"), 11 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)    
                        break;
                case 20:// meio direito agua
                    if (Math.floor(mapaframe) == 0)
                        ctx.drawImage(this.assets.img("floresta"), 6 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 1)
                        ctx.drawImage(this.assets.img("floresta"), 9 * 32, 8 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 2)
                        ctx.drawImage(this.assets.img("floresta"), 12 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) > 2)
                    ctx.drawImage(this.assets.img("floresta"), 12 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)    
                        break;
                case 21:// inferior esquerdo agua
                    if (Math.floor(mapaframe) == 0)
                        ctx.drawImage(this.assets.img("floresta"), 4 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 1)
                        ctx.drawImage(this.assets.img("floresta"), 7 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 2)
                        ctx.drawImage(this.assets.img("floresta"), 10 * 32, 10 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) > 2)
                    ctx.drawImage(this.assets.img("floresta"), 10 * 32, 10 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)    
                        break;
                case 22:// inferior meio agua
                    if (Math.floor(mapaframe) == 0)
                        ctx.drawImage(this.assets.img("floresta"), 5 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 1)
                        ctx.drawImage(this.assets.img("floresta"), 8 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 2)
                        ctx.drawImage(this.assets.img("floresta"), 11 * 32, 10 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) > 2)
                    ctx.drawImage(this.assets.img("floresta"), 11 * 32, 10 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)    
                        break;
                case 23:// inferior direito agua
                    if (Math.floor(mapaframe) == 0)
                        ctx.drawImage(this.assets.img("floresta"), 6 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 1)
                        ctx.drawImage(this.assets.img("floresta"), 9 * 32, 9 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) == 2)
                        ctx.drawImage(this.assets.img("floresta"), 12 * 32, 10 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)
                    if (Math.floor(mapaframe) > 2)
                    ctx.drawImage(this.assets.img("floresta"), 12 * 32, 10 * 32, 32, 32, c * this.SIZE, l * this.SIZE, 32, 32)    
                        break;
                default:
                    cor = "red";
            }
            if (this.cells[c][0] || this.cells[c][1] || this.cells[c][2]) {

            }
            if (this.cells[c][this.LINES] || this.cells[c][this.LINES - 1] || this.cells[c][this.LINES - 2]) {

            }
            if (this.cells[this.COLUMNS - 1][l] || this.cells[this.COLUMNS - 2][l] || this.cells[this.COLUMNS - 3][l]) {

            }
        }
    }
    var grd = ctx.createLinearGradient(0, 0, constEndFade, 0);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 5 * 32, this.LINES * 32);

    grd = ctx.createLinearGradient(0, 0, 0, constEndFade);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, this.COLUMNS * 32, 5 * 32);

    grd = ctx.createLinearGradient(0, (this.LINES * 32), 0, (this.LINES * 32) - constEndFade);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(c * this.SIZE, l * this.SIZE, -this.LINES * 32, -5 * 32);

    var grd = ctx.createLinearGradient((this.COLUMNS * 32), 0, (this.COLUMNS * 32) - constEndFade, 0);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(c * this.SIZE, l * this.SIZE, -5 * 32, -this.COLUMNS * 32);
}