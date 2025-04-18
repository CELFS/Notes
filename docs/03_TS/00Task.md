---
sidebar_label: "00 Task TypeScript"
---

## 00 Task TypeScript

Date：2024/07/15 17:01:36

------



[TOC]



------



### 00 进度

* 开始课程（2024/07/15）--> 完成课程（2024/07/15）



* 2024/07/15 19:25:53 P1-14，2h26min
* 2024/07/15 20:55:57 P15-17，41min

------



## 01 TypeScript 核心

### 01 核心概念

* [TS 官网](https://www.typescriptlang.org/)
* [TS 中文网](https://typescript.p2hp.com/) 

* 背景
  * JS 是一门弱类型语言，使用上十分灵活，但当项目体量较大时，过于灵活的方式不便于后期维护，以及开发过程可能导致意外。
* 理解
  * 浏览器不能直接识别 TS 语法，而 TS 编译将生成 JS 代码；
  * 引入的大部分语法，都很像 C++。
* 安装 --> 初始化配置文件 --> 严格模式
  * `tsconfig.json` 

```bash
npm install -g typescript

# 初始化配置文件
tsc --init
```



------



### 02 类型推断（不推荐，不够直观）

* TS 根据变量给定的初始值，进行变量类型限定。

```typescript
let str = 'abc';

str = 10; // typeError
```

### 03 类型注解

```typescript
let str: string; // 预声明

str = 10; // typeError
str = 'abc';
```

### 04 类型断言（谨慎，需人工干预）

```typescript
let numArr = [1, 2, 3];
const result = numArr.find(item => item > 2) as number;
result * 5; // 什么语法会这么写？是否有更标准的演示？
```

### 05 基础类型和联合类型

```typescript
let v1: string    = 'abc';
let v2: number    = 10;
let v3: boolean   = true;
let nu: null      = null; 	   // 多用于联合类型
let un: undefined = undefined; // 多用于联合类型

let v4: string | null = null;  // 联合类型
let v5: 1 | 2 | 3 = 5; 		   // error
let v5: 1 | 2 | 3 = 2; 		   // 建议配合类型别名使用
```

### 06 数组、元组、枚举等

* 数组
  * JS 支持单一数组内元素不同类型，但实际开发非常不建议使用；
  * TS 可结合类型约束，提高数据规范。
* 元组
  * 可限定存储数据的个数，以及每个数据的类型。
* 枚举
  * 类似 C++ 的枚举类型；
  * 可将其转换为 JS 代码进行语法理解。

```typescript
// 数组
let arr: number[] = [1, 2, 3];
let arr: number[] = [1, 2, 3, '10']; // error

let arr1: Array<string> = ['a', 'b', 'c'];

// 元组
let t1: [number, string, number] = [1, 'a', 2];
let t1: [number, string, number?] = [1, 'a'];   // ?-可选参
t1[0] = 100;
t1[0] = 'a'; // typeError

// 枚举
enum MyEnum {
    A,
    B,
    C
}

console.log(MyEnum.A);
console.log(MyEnum[0]);
```

### 07 函数

* TS 中的 `void` 通常用于函数；
* 注意可选参数放在必须参数后面，但除了默认值可选参。

```typescript
function MyFn (a = 10, b: string, c?: boolen, ...rest: number[]): void {
    return;
}

const f = MyFn(20, 'abc', true, 1, 2, 3);
```

### 08 接口

* 通常用于对象的定义。
* 自定义的对象，相当于自定义了一种数据类型，而 `interface` 可用于创建这种自定义类型的约束方式（规定好了接口，即是规定好了一种对象的格式）。
* 便于在创建实例时，有类型检查。

```typescript
interface Obj {
    name: string,
    age: number
}

const obj: Obj = {
    name: 'a',
    ago: 10		// nameError
}

const obj2: OBJ = {
    name: 'b',
    age: 10
}
```

### 09 类型别名

* `type` 相当于 C++ 的 `typeof`，但注意，`typeof` 在 TS 或 JS 中有不同定义，用以返回数据的类型。

```typescript
let a: string | number = 'abc';

type MyUserName = string | number;
let b: MyUserName = 'cde';
```

### 10 泛型（最常用）

* 避免直接在函数参数上使用联合类型，导致交叉使用的问题。
* 实际上就是 C++ 的模板类型。

```typescript
function myFn (a: number, b: number): number[] {
    return [a, b];
}

function myFn<T> (a: T, b: T): T[] {
    return [a, b];
}

myFn<number>(1, 2);   	// 调用时传入类型
myFn<string>('a', 'b');
myFn('a', 'b');			// TS 支持类型推断，因此可省略，不直观
```

* 疑问
  * 在设计 TS 元组功能的时候，是如何设想其适用范围，以及衡量这个设计的价值的呢？
    * 这个提问的角度，好像有点本末倒置，因为通常是否要设计一个语法机制，是由生产环境存在的有一定规模和影响力的问题而决定的，如果仅仅从设计的角度提问，就有一种 “空降” 的孤立感，这是不应该的。
    * 因此，应当问这个元组的设计，实际解决了什么业务、生产问题，又从使用当中获得哪些反馈，从而发掘了更多的用法？
  * 元组具有数组类似的性质，那么其定义时，是否能使用扩展运算符？



------



## 02 TypeScript 进阶（上）



### 11 函数重载

* 伪重载

```typescript
function hello (name: string): string;
function hello (name: number): string;
function hello (value: string | number): string {
    if (typeof value === 'string') {
        return 'Hello, my name is' + value;
    } else if (typeof value === 'number') {
        return 'Hello, my age is' + value;
    } else {
        return 'invalid value';
    }
}

hello(10);
hello('Cuber');
```

### 12 接口继承

* 疑问
  * `interface` 相比于 `Class` 有何优势？它们的侧重点不同？或者理解为类的新功能？或者仅仅是一种接口或语法结构统一上的另一种语言功能？

```typescript
interface Parent {
    prop1: string;
    prop2: number;
}

interface Child extends Parent {
    prop3: string;
}

const myObj: Child = {
    prop1: '',
    prop2: 1,
    prop3: ''
}
```

### 13 类的修饰符

* 私有属性命名，建议使用下划线 `_Name` 

```typescript
class Article {
    public title: string;   // 必选属性，默认 public，可在构造器中初始化，但后者不够直观
    content: string;
    aaa?: string;           // 可选属性
    bbb = 100;              // 属性默认值

    private tempData?: string;    // 私有属性
    protected innerData?: string; // 保护属性，可由子类访问

    // static author: string;           // 静态属性，设置给类本身，而不是给类的实例
    // private static author: string;   // 私有静态属性，只能类内部访问，注意修饰符的顺序要求
    private static readonly author: string = 'Cuber';  // 只读私有静态属性

    constructor (title: string, content: string) {
        this.title = title;
        this.content = content;
        // Article.author = 'Cuber123'; // 私有静态属性（非只读）
    }
}

const a = new Article('标题', '内容');
// a.tempData = 'tempData';      // 私有属性不能被外部实例访问
// a.innerData = 'innerData';    // 保护属性不能被外部实例访问
// Article.author = 'Cube123';   // 非私有的静态属性只能用类本身访问

class B extends Article {
    different: string;
    constructor (title: string, content: string, different: string) {
        super(title, content);                 // 继承父类属性
        this.different = different;            // 子类自定义属性
        this.innerData = 'innerData in child'; // 保护属性可以被子类访问
    }
}
```

### 14 存取器

* 类似 `getter` 和 `setter`，在 TS 提供了一些单独设置方式。
* 私有属性设置，建议使用下划线命名 `_password`，具体看业务规范。
* 私有属性名称，一般对应一个存取器名称。

```typescript
class User {
    private _password: string = ''; // 私有属性命名建议使用下划线

    get password(): string {
        return '******';
    }

    set password(newPassword: string) {
        this._password = newPassword;
    }
}

const u = new User();
console.log(u.password);
```

### 15 抽象类

* 抽象类，用作子类的基类。例如创建一个 Animal 类，派生出小狗小猫类，而真正使用的是小狗小猫类，Animal 类不具有实例化的需求，因此，可以将抽象类看作是一种用于规范格式的类。
* 使用 `abstract` 关键字创建类，内部可使用抽象的属性、方法、存取器，也可包括一些普通成员和方法。而抽象的成员，必须在抽象类的内部使用。
* 抽象的成员本身不需要初始化，只是为了在子类使用时，提示需要哪些属性。
* 疑问
  * 抽象类的意义和接口的意义很相似，为什么不统一为一个语法？

```typescript
abstract class Animal {
    abstract name: string;      // 抽象属性
    abstract maskSound(): void; // 抽象方法
    move (): void {             // 普通方法
        console.log('移动');
    }
}

class Cat extends Animal {
    name: string = '小猫';
    maskSound(): void {
        console.log('汪!!!');
    }
}
```

### 16 类实现接口

* 类操作的一种常用方式。可使用 `interface` 定义类的行为。
* 使用 `implements`，类不可能继承自接口，而是具体地实现接口的功能。
* 实验发现，TS 可自动读取当前目录下的其他文件，就像有记忆一样，导致报错信息，于是下面接口命后面加2。

```typescript
interface Animal2 {
    name: string;
    get sound(): string;
    maskSound(): void;
}

interface B2 {
    age: number;
}

class Dog implements Animal2, B2 {
    name: string = '小狗';
    age: number = 10;
    
    get sound() {
        return '';
    }
    maskSound() {
        console.log('汪汪汪');
    }
}
```

### 17 泛型类

* 类 + 泛型

```typescript
class MyClass {
    value: string;
    constructor (value: string) {
        this.value = value;
    }

    do () {
        console.log('Processing Data:', this.value);
    }
}

// 泛型写法
class MyClass<T> {
    value: T;
    constructor (value: T) {
        this.value = value;
    }

    do (input: T) {
        console.log('Processing Data:', this.value);
        return input;
    }
}

const myStr = new MyClass<string>('hello');
myStr.do('abc');

const myNum = new MyClass<number>(123);
myNum.do(456);
```



------

## 本篇完