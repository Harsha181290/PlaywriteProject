let message1 :string ="Hello";
message1 = "bye";
let age1 :number =20;
let isactive : boolean = true;
let numberarray : number[] =[1,2,3];
let data:any ="This can be any data type";
data=42;
console.log(message1);
console.log(age1);
console.log(isactive);
console.log(numberarray);
console.log(data);
function add(a:number,b:number) : number
{

    return a+b;
}

console.log(add(3,4));

let usernew: {name:string,age:number,place:string} ={name:"Harsha",age:42,place:"delhi"};

usernew.place="Hyderabad";
console.log(usernew.place);