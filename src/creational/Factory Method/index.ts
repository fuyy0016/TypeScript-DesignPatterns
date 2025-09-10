// 定义产品的接口
interface Product {
  operation(): string;
}

// 创建实现相同接口的具体产品
class ConcreteProduct1 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct1}';
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct2}';
  }
}

// 创建者类声明了应该返回一个 Product 类对象的工厂方法。
// 创建者的子类通常会实现这个方法。
abstract class Creator {
  // 请注意，创建者可能还提供工厂方法的一些默认实现。
  public abstract factoryMethod(): Product;

  // 另外请注意，尽管它的名字叫“创建者”，但它的核心职责并不是创建产品。
  // 通常，它包含一些依赖于由工厂方法返回的 Product 对象的核心业务逻辑。
  // 子类可以通过重写工厂方法并从中返回不同类型的产品来间接地改变业务逻辑。
  public someOperation(): string {
    // 调用工厂方法创建一个产品对象。
    const product = this.factoryMethod();
    // 现在，使用产品。
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

// 具体创建者会重写工厂方法以改变结果产品的类型。
class ConcreteCreator1 extends Creator {
  // 请注意，方法的签名仍然使用抽象产品类型，即使具体产品实际上是从该方法返回的。
  // 这样，创建者可以独立于具体产品类。
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

// 客户端代码与具体创建者的一个实例一起工作，尽管是通过其基类接口。
// 只要客户端通过基类接口与创建者保持合作，你就可以将任何创建者的子类传递给它。
function clientCode(creator: Creator) {
  // ...
  console.log("Client: I'm not aware of the creator's class, but it still works.");
  console.log(creator.someOperation());
  // ...
}

// 应用程序似乎根据配置或环境来选择创建者的类型。
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());