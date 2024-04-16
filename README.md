# Database Transaction Time-Stamp Ordering Protocol Implementation
JavaScript/Nodejs implementation of Database Transaction Time-Stamp Ordering Protocol

## The Algorithm
**The following is the algorithm for the time-stamp ordering protocol**

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

- IMPLEMENTED WITH: Node.js (JavaScript)
