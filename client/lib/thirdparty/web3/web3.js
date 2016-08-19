if(typeof web3 !== 'undefined')
	if(web3.currentProvider.constructor.name === "MetamaskInpageProvider") {
		metaMask = new Web3(web3.currentProvider);

		web3 = new Web3(new Web3.providers.HttpProvider("https://eth3.augur.net/"));

		Session.set('publicNode', true);
		Session.set('metaMask', true);
	}
	else {
		metaMask = null;
		web3 = new Web3(web3.currentProvider);
	}
else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	if(!web3.isConnected()) {
		web3 = new Web3(new Web3.providers.HttpProvider("https://eth3.augur.net/"));
		Session.set('publicNode', true);
	}
}