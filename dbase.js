/**
 * @matric:	
 * @author: Adedoyin Simeon Adeyemi
 * @Origin: https://github.com/SimeonDee/db-transaction-time-stamp-ordering-protocol
*/

// QUESTION
/**
	Write, in any programming language. Rge following algorithm for the time-stamp ordering protocol 

	The timestamp of transaction  Ti is denoted as TS(Ti)
	Read time-stamp of data-item X is denoted by R-timestamp(X)
	Write time-stamp of data-item X is denoted by W-timestamp(X)
	Timestamp ordering protocol works as follows:
	If a transaction Ti issues a read(X) operation
		If TS(Ti) < W-timestamp(X)
			Operation rejected
		If TS(Ti) >= W-timestamp(X)
			Operation executed
		All data-item timestamps updated
	If a transaction Ti issues a write(X) operation
		If TS(Ti) < R-timestamp(X)
			Operation rejected
		If TS(Ti) < W-timestamp(X)
			Operation rejected and Ti rolled back
		Otherwise, operation executed
 */

// IMPLEMENTED WITH: NODEjs

// Implementation
class Transaction{
	constructor(){
		this.TS;
		this.R_timestamp;
		this.W_timestamp;
		this.X = 0;

		this.init = this.init.bind(this);
		this.readOperation = this.readOperation.bind(this);
		this.writeOperation = this.writeOperation.bind(this);
	}

	init(){
		const snapshot = new Date();
		this.TS = snapshot
		this.R_timestamp = snapshot;
		this.W_timestamp = snapshot;
		this.X = 0;
	}

	readOperation(){
		this.R_timestamp = new Date();
		if(this.TS < this.W_timestamp){
			return null;	// read operation rejected
		} else {
			// updating all data items timestamps
			const snapshot = new Date()
			this.TS = snapshot;
			this.R_timestamp = snapshot
			this.W_timestamp = snapshot

			// carry out read operation
			console.log(`Reading the value... ${this.X}`);
			return this.X
		}
	}

	writeOperation(val){
		this.W_timestamp = new Date();

		if(this.TS < this.R_timestamp){
			console.log('operation rejected and rolled back');
			return 'operation rejected';	// reject operation
		
		} if(this.TS < this.W_timestamp){
			console.log(`operation rejected and rolled back`);
			return 'operation rejected and rolled back';

		} else {
			// carry out the write operation
			console.log(`Writing the value... ${val}`);
			this.X = val;
		}
	}
}

class Scheduler{
	constructor(){
		this.transactions = [];
	}

	addTransaction(transaction){
		if(transaction instanceof Transaction){
			transaction.init();
			this.transactions.push(transaction);
		} else {
			console.log('argument must be a transaction');
		}
	}
}

// Testing
const newScheduler = new Scheduler();
const newTransaction1 = new Transaction();
const newTransaction2 = new Transaction();
const newTransaction3 = new Transaction();

newScheduler.addTransaction(newTransaction1);
newScheduler.addTransaction(newTransaction2);
newScheduler.addTransaction(newTransaction3);

newScheduler.transactions[0].writeOperation(30);
newScheduler.transactions[1].readOperation();
newScheduler.transactions[1].writeOperation(25);
newScheduler.transactions[2].readOperation();
newScheduler.transactions[2].writeOperation(26);
newScheduler.transactions[1].readOperation();