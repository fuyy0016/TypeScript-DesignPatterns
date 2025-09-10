#### 工厂方法 (Factory Method)

工厂方法是一种创建型设计模式， 它在父类中提供一个创建对象的接口， 允许子类决定实例化哪一个类。

**适用场景:**

*   当一个类不知道它所必须创建的对象的类的时候。
*   当一个类希望由它的子类来指定它所创建的对象的时候。
*   当类将创建对象的职责委托给多个帮助子类中的某一个，并且你希望将哪一个帮助子类是代理者这一信息局部化的时候。

**优缺点**

**优点:**

*   **开闭原则**：你可以在不破坏现有客户端代码的情况下，轻松地向程序中添加新类型的产品。
*   **单一职责原则**：你可以将产品创建代码从使用产品的代码中分离出来。
*   **松耦合**：创建者和具体产品之间的耦合度降低。

**缺点:**

*   **代码复杂性**：为了实现该模式，你需要引入许多新的子类，这会使代码变得更加复杂。

**代码讲解**

`index.ts` 文件中的代码展示了一个经典的工厂方法实现。

1.  **Product (产品) 接口**:
    ```typescript
    interface Product {
      operation(): string;
    }
    ```
    `Product` 接口定义了所有具体产品必须实现的方法。

2.  **ConcreteProduct (具体产品)**:
    ```typescript
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
    ```
    `ConcreteProduct1` 和 `ConcreteProduct2` 是 `Product` 接口的具体实现。

3.  **Creator (创建者) 抽象类**:
    ```typescript
    abstract class Creator {
      public abstract factoryMethod(): Product;

      public someOperation(): string {
        const product = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
      }
    }
    ```
    `Creator` 声明了工厂方法 `factoryMethod`，它返回一个 `Product` 对象。`Creator` 还包含一些核心业务逻辑 (`someOperation`)，这些逻辑依赖于由工厂方法创建的产品。

4.  **ConcreteCreator (具体创建者)**:
    ```typescript
    class ConcreteCreator1 extends Creator {
      public factoryMethod(): Product {
        return new ConcreteProduct1();
      }
    }

    class ConcreteCreator2 extends Creator {
      public factoryMethod(): Product {
        return new ConcreteCreator2();
      }
    }
    ```
    `ConcreteCreator1` 和 `ConcreteCreator2` 继承自 `Creator` 并实现了 `factoryMethod`，分别用于创建 `ConcreteProduct1` 和 `ConcreteProduct2` 的实例。

5.  **客户端代码**:
    ```typescript
    function clientCode(creator: Creator) {
      console.log("Client: I'm not aware of the creator's class, but it still works.");
      console.log(creator.someOperation());
    }

    console.log('App: Launched with the ConcreteCreator1.');
    clientCode(new ConcreteCreator1());

    console.log('App: Launched with the ConcreteCreator2.');
    clientCode(new ConcreteCreator2());
    ```
    客户端代码通过 `Creator` 的接口与具体创建者进行交互。这使得客户端代码与具体产品类解耦。根据不同的配置或环境，应用程序可以传递不同的具体创建者给客户端，从而改变创建的产品类型。