angular.module('invoice1', []).controller('InvoiceController', function(){
	this.qty = 1;
	this.cost = 2;
	this.cur = 'INR';
	this.currencies = ['USD', 'EUR', 'INR'];
	this.usdToElse = {
		USD: 1, 
		EUR: 0.74, 
		INR: 61
	};
	
	this.total = function(outCur){
		return this.convertCurrency(this.qty * this.cost, this.cur, outCur);
	};
	
	this.convertCurrency = function(amount, cur, outCur){
		//return 2;
	    return amount * this.usdToElse[outCur] / this.usdToElse[cur];
	};
	
	this.pay = function(){
		window.alert("Paid!");
	};
});