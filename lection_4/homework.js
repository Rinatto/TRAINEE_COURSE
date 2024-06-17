// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):
// 1)
console.log('1');

setTimeout(() => console.log('2'), 1);

let promiseNew = new Promise((resolve) => {
    console.log('3');
    resolve();
});

promiseNew.then(() => console.log('4'));

setTimeout(() => console.log('5'));

console.log('6');

// 1 3 6 4 5 2

//////////////////////////////
// 2)
let promiseTree = new Promise((resolve, reject) => {
    resolve("a");
    console.log("1");
    setTimeout(() => {
        console.log("2");
    }, 0);
    console.log("3");
});
// 1 3 2

/////////////////////////
// 3)
// let promiseTwo = new Promise((resolve, reject) => {
//     resolve("a");
// });
// promiseTwo
    // .then((res) => {
    //     return res + "b";
    // })
    // .then((res) => {
    //     return res + "с";
    // })
    // .finally((res) => {
    //     return res + "!!!!!!!";
    // })
    // .catch((res) => {
    //     return res + "d";
    // })
    // .then((res) => {
    //     console.log(res);
    // });

// abc

/////////////////////////////
// 4)
// function doSmth() {
//     return Promise.resolve("123");
// }
// doSmth()
//     .then(function (a) {
//         console.log("1", a); //
//         return a;
//     })
//     .then(function (b) {
//         console.log("2", b);
//         return Promise.reject("321");
//     })
//     .catch(function (err) {
//         console.log("3", err);
//     })
//     .then(function (c) {
//         console.log("4", c);
//         return c;
//     });

// 1 123
// 2 123
// 3 321
// 4 undefined

///////////////////////////
// 5)
console.log("1");
setTimeout(function () {
    console.log("2");
}, 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");

// 1 4 3 2
////////////////////////////
//6)
// async function a() {
//   console.log("a");
// }

// console.log("1");

// (async function () {
//   console.log("f1");
//   await a();
//   console.log("f2");
// })();
// console.log("2");

// 1 f1 a 2 f2 

////////////////////////////////
//7)
// console.log(1);

// setTimeout(() => console.log(2));

// async function func() {
//   console.log(3);

//   await new Promise((resolve) => {
//     console.log(4);
//     resolve();
//     console.log(5);
//   })
//     .then(() => console.log(6))
//     .then(() => console.log(7));

//   console.log(8);
// }

// setTimeout(() => console.log(9));

// func();

// console.log(10);

// 1 3 4 5 10 6 7 8 2 9 

///////////////////////////////////
// 8)*
// function foo(callback) {
//     setTimeout(() => {
//         callback('A');
//     }, Math.random() * 100);
// }
// function bar(callback) {
//     setTimeout(() => {
//         callback('B');
//     }, Math.random() * 100);
// }
// function baz(callback) {
//     setTimeout(() => {
//         callback('C');
//     }, Math.random() * 100);
// }
//
// foo(console.log)
// bar(console.log)
// baz(console.log)

// Написать функцию, чтобы починить последовательность выполнения A,B,C без использования колбэк хэлла
// в функциях foo, bar,baz запрещено что-либо менять
// подсказка: нужны промисы =))

// Исходные функции foo, bar и baz
function foo(callback) {
    setTimeout(() => {
        callback('A');
    }, Math.random() * 100);
}

function bar(callback) {
    setTimeout(() => {
        callback('B');
    }, Math.random() * 100);
}

function baz(callback) {
    setTimeout(() => {
        callback('C');
    }, Math.random() * 100);
}

function promisify(func) {
    return new Promise((resolve) => {
        func(resolve);
    });
}

function fooBarBaz() {
    Promise.all([
        promisify(foo),
        promisify(bar),
        promisify(baz)
    ])
    .then(res => res.forEach(result => console.log(result)))
    .catch(err => console.error(err));
}

fooBarBaz();

///////////////
// todo Объяснить код, рассказать какие консоли и в какой последовательности будут, а затем переписать его на промисы
// function resolveAfter2Seconds(x) { //Эта функция принимает аргумент x, выводит его в консоль и возвращает промис, который разрешается через 5 секунд с тем же значением x.

//     console.log(`Какой Х пришёл -> ${x}`)
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(x); //
//         }, 5000);
//     });
// }
// async function add1(x) {
//     console.log('add1 Hello') // выводит "add1 Hello"

//     const a = await resolveAfter2Seconds(20);//Затем ждет разрешения промиса от вызова resolveAfter2Seconds(20), который через 5 секунд возвращает 20, и присваивает это значение переменной a

//     const b = await resolveAfter2Seconds(30);// После этого ждет разрешения промиса от вызова resolveAfter2Seconds(30), который через 5 секунд возвращает 30, и присваивает это значение переменной b

//     console.log('add1 Bye') // затем выводит 'add1 Bye'
//     return x + a + b; // возвращает сумму 60
// }
// add1(10).then(console.log);

//add1 Hello, Какой Х пришёл -> 20, Через 5 секунд: Какой Х пришёл -> 30, Через 5 секунд: add1 Bye, 60 (вывод через then)


function resolveAfter2Seconds(x) {
    console.log(`Какой Х пришёл -> ${x}`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 5000);
    });
}

function add1(x) {
    console.log('add1 Hello');
    let a;
    let b;
    return resolveAfter2Seconds(20)
        .then(result => {
            a = result;
            return resolveAfter2Seconds(30);
        })
        .then(result => {
            b = result;
            console.log('add1 Bye');
            return x + a + b;
        });
}

add1(10).then(console.log);
