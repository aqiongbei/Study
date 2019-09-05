function Process (opt) {
	this.rate = 0;
	this.afterStart = opt.afterStart;
	this.afterStop = opt.afterStop;
	this.timer = null;
	this.step = null;
	this._getInterval = function () {
		return Math.round(Math.random() * 600); 
	}
	this._getStep = function () {
		return Math.round(Math.random() * 3); 
	}
}

Process.prototype.start = function (rate){
	this.rate = rate || this.rate;
	let _this = this;
	let interval = this._getInterval();
	this.timer = setInterval (function (){
		interval = _this._getInterval();
		_this.step = _this._getStep();
		_this.afterStart && _this.afterStart.call(_this);
	}, interval)
}

Process.prototype.stop = function (rate) {
	this.rate = rate;
	clearTimeout(this.timer);
	this.afterStop && this.afterStop();
}

var process = new Process({
	interval: 1000,
	afterStart: function (){
		this.rate += this.step;
		if (this.rate >= 97) {
			this.rate = 99;
			this.stop(this.rate);
		}
		processContainer.text(this.rate + '%');
		window.sessionStorage.processNum = this.rate;
	},
	afterStop: function () {
		window.sessionStorage.processNum = this.rate;
	}
})
var processContainer = $('.process');
process.start();