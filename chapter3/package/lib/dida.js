var Dida = function (di, da) {
    this.di = di;
    this.da = da;

};

Dida.prototype.d = function () {
    return this.di + this.da;
};

module.exports = Dida;


//每一个文件都需要导出


