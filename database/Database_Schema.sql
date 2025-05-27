drop database test;
CREATE database IF NOT EXISTS test;
use test;
CREATE table IF NOT EXISTS bank(
	BankID INT AUTO_INCREMENT primary key NOT NULL,
	Name varchar(20) NOT NULL,
	Address varchar(75) NOT NULL,
	Money INT NOT NULL
);

CREATE table IF NOT EXISTS customer(
	SSN INT primary key NOT NULL,
	FirstName varchar(20) NOT NULL,
	MiddleName varchar(20) NOT NULL,
	LastName varchar(20) NOT NULL,
	StreetAddress varchar(75) NOT NULL,
	Zip INT NOT NULL,
	State char(2) NOT NULL,
	DateOfBirth DATE NOT NULL,
	Sex varchar(1) NOT NULL,
	MemberOf INT NOT NULL,
	foreign key(MemberOf) References bank(BankID)
);

CREATE table IF NOT EXISTS account(
	AccountNumber INT AUTO_INCREMENT primary key NOT NULL,
	Balance int NOT NULL,
	AccountType varchar(20) NOT NULL,
	Name varchar(20) NOT NULL,
	Status varchar(10) NOT NULL,
	CustomerSSN INT NOT NULL,
	foreign key(CustomerSSN) References customer(SSN),
	BankID INT NOT NULL,
	foreign key(BankID) References bank(BankID)
);

CREATE table IF NOT EXISTS transaction(
	TransactionID INT AUTO_INCREMENT Primary Key NOT NULL,
	transactionName varchar(20) NOT NULL,
	vendor varchar(20) NOT NULL,
	transactionType varchar(20) NOT NULL,
	Amount INT NOT NULL,
	transactionDate DATE NOT NULL,
	AccountNumber INT NOT NULL,
	foreign key(AccountNumber) References account(AccountNumber)
);

create table IF NOT EXISTS loans(
	LoanID INT AUTO_INCREMENT Primary Key NOT NULL,
	DateIssued DATE NOT NULL,
	Principle INT NOT NULL,
	loanAmount INT NOT NULL,
	loanStatus varchar(10) NOT NULL,
	offeredBy INT NOT NULL,
	foreign key(offeredBy) References bank(BankID),
	takenOutBy INT NOT NULL,
	foreign key(takenOutBy) References customer(SSN)
);
