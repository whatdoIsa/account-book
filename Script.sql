create table accountbook (
	id int auto_increment,
	date date,
	divi varchar(10),
	list varchar(100),
	pay int,
	primary key (id)
)

insert into accountbook(date, divi, list, pay) values('2021-12-14', '수입', '용돈', '500000');
insert into accountbook(date, divi, list, pay) values('2022-12-14', '지출', '커피', '5000');
insert into accountbook(date, divi, list, pay) values('2023-12-14', '지출', '핫식스', '2200');