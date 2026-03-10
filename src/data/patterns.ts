export type Category = "creational" | "structural" | "behavioral";

export interface PatternRole {
  name: string;
  desc: string;
}

export interface Pattern {
  id: string;
  name: string;
  nameEn: string;
  category: Category;
  icon: string;
  brief: string;
  analogy: string;
  explain: string;
  roles: PatternRole[];
  pros: string[];
  cons: string[];
  usage: string[];
  code: string;
}

export interface CategoryInfo {
  id: Category;
  name: string;
  nameEn: string;
  icon: string;
  desc: string;
}

export const categories: CategoryInfo[] = [
  {
    id: "creational",
    name: "创建型模式",
    nameEn: "Creational Patterns",
    icon: "🏗️",
    desc: "关注对象的创建过程。把「怎么造对象」这件事变得更灵活、更解耦，让你不需要直接 new，就能拿到想要的对象。",
  },
  {
    id: "structural",
    name: "结构型模式",
    nameEn: "Structural Patterns",
    icon: "🧩",
    desc: "关注类和对象的组合方式。像搭积木一样，把小零件拼成更大更强的结构，同时保持灵活性。",
  },
  {
    id: "behavioral",
    name: "行为型模式",
    nameEn: "Behavioral Patterns",
    icon: "🎭",
    desc: "关注对象之间的交互和职责分配。解决「谁来干什么」以及「怎么配合」的问题，让协作变得优雅。",
  },
];

export const patterns: Pattern[] = [
  {
    id: "simple-factory",
    name: "简单工厂模式",
    nameEn: "Simple Factory",
    category: "creational",
    icon: "🏭",
    brief: "一个工厂类根据参数决定创建哪种产品，调用者不需要知道具体的创建逻辑。",
    analogy: "就像去自动售货机买饮料 —— 你按下「可乐」的按钮，机器就吐出一瓶可乐。你不需要知道可乐是怎么装瓶的，也不需要知道机器里还有雪碧和果汁。你只管选，机器帮你搞定。",
    explain: `想象你开了一家饮料店。顾客进来说「我要可乐」或者「我要果汁」，你不需要让顾客自己去仓库找瓶子、灌装、贴标签，你只需要一个店员（工厂）根据顾客说的话，去后厨把饮料做好端上来就行。

这就是简单工厂的核心思想：**把「造东西」这件事交给一个专门的类来做**，调用者只需要告诉工厂「我要什么类型的」，工厂就返回对应的对象。

好处是显而易见的：客户端代码变得很干净，不需要到处 new 各种具体类。但缺点也很明显：如果要加新产品，你得去改工厂的代码（违反了开闭原则）。当产品越来越多时，工厂类会变得臃肿不堪。

所以简单工厂适合产品种类比较少、变化不频繁的场景。它是最简单的创建型模式，也是理解后续工厂模式的基础。`,
    roles: [
      { name: "Factory（工厂）", desc: "包含创建逻辑，根据参数返回不同产品实例" },
      { name: "Product（抽象产品）", desc: "所有产品的共同接口或父类" },
      { name: "ConcreteProduct（具体产品）", desc: "工厂实际创建的具体对象" },
    ],
    pros: ["客户端与具体产品类解耦，只需知道参数即可", "集中管理对象创建逻辑，便于维护", "可通过配置文件动态切换产品，无需改代码"],
    cons: ["新增产品必须修改工厂类，违反开闭原则", "工厂类职责过重，产品多了会变得复杂", "使用静态方法，无法通过继承扩展"],
    usage: ["产品种类较少且不会频繁变化", "客户端不关心创建细节，只需要获取结果", "需要集中管理对象创建的场景"],
    code: `// 抽象产品
interface Button {
  render(): string;
}

// 具体产品
class RoundButton implements Button {
  render() { return "⭕ 圆形按钮"; }
}
class RectButton implements Button {
  render() { return "⬜ 矩形按钮"; }
}

// 工厂
class ButtonFactory {
  static create(type: "round" | "rect"): Button {
    switch (type) {
      case "round": return new RoundButton();
      case "rect":  return new RectButton();
    }
  }
}

// 使用：不需要知道具体类名
const btn = ButtonFactory.create("round");
console.log(btn.render()); // ⭕ 圆形按钮`,
  },
  {
    id: "factory-method",
    name: "工厂方法模式",
    nameEn: "Factory Method",
    category: "creational",
    icon: "🔧",
    brief: "定义创建对象的接口，但由子类决定实例化哪个类。让类的实例化延迟到子类。",
    analogy: "就像不同品牌的 4S 店 —— 宝马 4S 店卖宝马，奔驰 4S 店卖奔驰。每家店都有「卖车」这个能力，但具体卖什么车，由每家店自己决定。",
    explain: `简单工厂有个问题：所有创建逻辑都塞在一个工厂里，新增产品就得改工厂代码。工厂方法的解决方案是：**不要一个万能工厂，而是给每种产品配一个专门的工厂**。

具体来说，先定义一个「工厂接口」（或抽象工厂类），里面有一个「创建产品」的方法。然后每种产品对应一个具体工厂，各自实现这个方法。

这样，想加新产品？写一个新的产品类 + 新的工厂类就行了，完全不用动已有代码。这就是符合「开闭原则」的好处：对扩展开放，对修改关闭。

打个比方：简单工厂像是一个什么都做的大厨房，工厂方法则像是每道菜都有专门的厨师。虽然厨师多了，但每个人各司其职，互不干扰。`,
    roles: [
      { name: "Creator（抽象工厂）", desc: "声明工厂方法，返回 Product 类型" },
      { name: "ConcreteCreator（具体工厂）", desc: "实现工厂方法，创建具体产品" },
      { name: "Product（抽象产品）", desc: "所有产品的公共接口" },
      { name: "ConcreteProduct（具体产品）", desc: "被具体工厂创建的实际产品" },
    ],
    pros: ["符合开闭原则，新增产品不用修改已有代码", "每个工厂只负责一种产品，职责单一", "客户端面向接口编程，解耦彻底"],
    cons: ["每新增一个产品就要新增一个工厂类，类数量膨胀", "增加了系统的抽象层次和理解成本", "对于简单场景可能过度设计"],
    usage: ["不确定将来需要创建什么具体类的对象", "希望用户能通过子类化来扩展功能", "框架和库的设计中非常常见"],
    code: `// 抽象产品
interface Logger {
  log(msg: string): void;
}
// 具体产品
class FileLogger implements Logger {
  log(msg: string) { console.log("📁 写入文件: " + msg); }
}
class ConsoleLogger implements Logger {
  log(msg: string) { console.log("🖥️ 控制台: " + msg); }
}
// 抽象工厂
abstract class LoggerFactory {
  abstract createLogger(): Logger;
  writeLog(msg: string) {
    const logger = this.createLogger();
    logger.log(msg);
  }
}
// 具体工厂
class FileLoggerFactory extends LoggerFactory {
  createLogger() { return new FileLogger(); }
}
class ConsoleLoggerFactory extends LoggerFactory {
  createLogger() { return new ConsoleLogger(); }
}
// 使用
const factory = new FileLoggerFactory();
factory.writeLog("Hello!"); // 📁 写入文件: Hello!`,
  },
  {
    id: "abstract-factory",
    name: "抽象工厂模式",
    nameEn: "Abstract Factory",
    category: "creational",
    icon: "🏢",
    brief: "提供一个创建一系列相关对象的接口，而无需指定它们的具体类。",
    analogy: "就像宜家的「系列家具」—— 你选了北欧风系列，从沙发、茶几到台灯全都是北欧风的。换成工业风系列，又是另一套完整的搭配。你不需要自己一件件去凑。",
    explain: `工厂方法解决的是「创建一种产品」的问题，但如果你要创建的是**一整套产品**呢？

比如你在做一个跨平台 UI 框架。在 Windows 上要用 Windows 风格的按钮和输入框，在 Mac 上要用 Mac 风格的。这些控件必须是成套的 —— 你不能用 Windows 的按钮配 Mac 的输入框，那样会很违和。

抽象工厂就是干这个的：它定义了一组「创建产品」的方法（创建按钮、创建输入框），然后每个具体工厂负责生产一个「全家桶」。

你可以把它想象成装修公司的「套餐服务」：选了中式套餐，从墙纸到灯具到家具全是中式的；选了欧式套餐，就全换成欧式的。你只需要选一个套餐（工厂），里面的东西都是配好的。`,
    roles: [
      { name: "AbstractFactory（抽象工厂）", desc: "声明一组创建产品的方法" },
      { name: "ConcreteFactory（具体工厂）", desc: "实现这组方法，生产一套配套的产品" },
      { name: "AbstractProduct（抽象产品）", desc: "每一类产品的公共接口" },
      { name: "ConcreteProduct（具体产品）", desc: "属于某个产品族的具体实现" },
    ],
    pros: ["保证同一产品族的对象一起使用，不会搭配错误", "切换产品族只需更换工厂，客户端代码不用改", "符合开闭原则和单一职责原则"],
    cons: ["新增一种产品（而非产品族）需要修改所有工厂类", "类的数量大幅增加，结构变得复杂", "对于只有少量产品的场景过度设计"],
    usage: ["需要创建一系列相关或相互依赖的产品", "系统需要支持多套产品族的切换（如跨平台 UI、多主题皮肤）", "希望提供一致的产品族，避免搭配错误"],
    code: `// 抽象产品
interface Button { click(): string; }
interface Input  { type(): string; }
// Mac 产品族
class MacButton implements Button {
  click() { return "🍎 Mac 圆角按钮"; }
}
class MacInput implements Input {
  type() { return "🍎 Mac 输入框"; }
}
// Windows 产品族
class WinButton implements Button {
  click() { return "🪟 Win 方角按钮"; }
}
class WinInput implements Input {
  type() { return "🪟 Win 输入框"; }
}
// 抽象工厂
interface UIFactory {
  createButton(): Button;
  createInput(): Input;
}
// 具体工厂
class MacFactory implements UIFactory {
  createButton() { return new MacButton(); }
  createInput()  { return new MacInput(); }
}
class WinFactory implements UIFactory {
  createButton() { return new WinButton(); }
  createInput()  { return new WinInput(); }
}
// 使用：切换工厂就切换整套 UI
const factory: UIFactory = new MacFactory();
console.log(factory.createButton().click());`,
  },
  {
    id: "builder",
    name: "建造者模式",
    nameEn: "Builder",
    category: "creational",
    icon: "👷",
    brief: "将一个复杂对象的构建与其表示分离，使得同样的构建过程可以创建不同的表示。",
    analogy: "就像去 Subway 点三明治 —— 先选面包，再选肉，加蔬菜，最后选酱料，一步一步组装出你想要的三明治。流程是固定的，但每一步的选择可以不同。",
    explain: `有些对象太复杂了，构造函数要传十几个参数，有些参数还是可选的，写起来让人头大。

建造者模式的思路是：**把复杂对象的创建过程拆成一步一步的**，每一步都有一个专门的方法。最后调用一个 build() 方法把它们拼起来。

就像组装电脑：先选 CPU，再选主板，再选内存和硬盘，最后组装。每一步可以有不同选择（Intel 或 AMD 的 CPU），但组装流程是固定的。

在实际开发中，你可能见过 new UserBuilder().setName("张三").setAge(25).build() 这样的链式调用，这就是建造者模式最常见的应用。`,
    roles: [
      { name: "Builder（抽象建造者）", desc: "定义构建产品各部分的接口" },
      { name: "ConcreteBuilder（具体建造者）", desc: "实现构建步骤，组装具体产品" },
      { name: "Director（指挥者）", desc: "定义构建顺序，调用建造者的方法" },
      { name: "Product（产品）", desc: "被建造的复杂对象" },
    ],
    pros: ["可以精细控制对象的创建过程", "同样的构建流程可以创造不同的产品", "建造过程与表示分离，代码更清晰"],
    cons: ["需要额外创建建造者类，增加代码量", "产品内部发生变化时，建造者也要修改", "对简单对象来说是杀鸡用牛刀"],
    usage: ["对象有很多可选参数", "创建过程需要多个步骤且步骤可复用", "需要创建不同表示的同类产品"],
    code: `class Computer {
  cpu = ""; gpu = ""; ram = ""; storage = "";
  toString() {
    return "💻 " + this.cpu + " | " + this.gpu
      + " | " + this.ram + " | " + this.storage;
  }
}

class ComputerBuilder {
  private computer = new Computer();
  setCPU(cpu: string)   { this.computer.cpu = cpu; return this; }
  setGPU(gpu: string)   { this.computer.gpu = gpu; return this; }
  setRAM(ram: string)   { this.computer.ram = ram; return this; }
  setStorage(s: string) { this.computer.storage = s; return this; }
  build() { return this.computer; }
}

// 链式调用，一步步构建
const pc = new ComputerBuilder()
  .setCPU("i9-13900K")
  .setGPU("RTX 4090")
  .setRAM("64GB DDR5")
  .setStorage("2TB NVMe")
  .build();
console.log(pc.toString());`,
  },
  {
    id: "singleton",
    name: "单例模式",
    nameEn: "Singleton",
    category: "creational",
    icon: "☝️",
    brief: "确保一个类仅有一个实例，并提供一个全局访问点。",
    analogy: "就像一个国家只有一位总统 —— 不管你是谁、从哪里来，找的都是同一个人。不可能同时存在两个总统。",
    explain: `有些东西天然只需要一个：操作系统的任务管理器、应用的配置中心、数据库连接池……如果被创建了多个实例，不仅浪费资源，还可能导致数据不一致。

单例模式就是解决这个问题的：**一个类只能创建一个实例，并且提供一个全局入口来获取它**。

实现思路很简单：把构造函数设为私有的（不让别人 new），然后提供一个静态方法 getInstance()，第一次调用时创建实例，以后每次调用都返回同一个。

这是最简单也最常用的设计模式之一。但要小心它被滥用 —— 全局状态太多会让代码难以测试和维护。在现代开发中，依赖注入往往是更好的选择。`,
    roles: [
      { name: "Singleton（单例类）", desc: "持有自身唯一实例的引用，提供全局获取入口" },
    ],
    pros: ["保证全局唯一实例，节约资源", "提供全局访问点，方便使用", "可以在第一次使用时才创建（懒加载）"],
    cons: ["全局状态难以测试（不好 mock）", "违反单一职责原则（既管业务又管实例化）", "多线程环境需要额外考虑线程安全"],
    usage: ["系统中某个类只需要一个实例（配置管理、日志系统）", "需要频繁创建销毁的重量级对象（数据库连接池）", "需要全局唯一的协调者（ID 生成器）"],
    code: `class AppConfig {
  private static instance: AppConfig;
  private settings = new Map<string, string>();

  private constructor() {
    this.settings.set("theme", "dark");
    this.settings.set("lang", "zh-CN");
  }

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  get(key: string) { return this.settings.get(key); }
  set(key: string, val: string) { this.settings.set(key, val); }
}

// 不管获取多少次，都是同一个实例
const a = AppConfig.getInstance();
const b = AppConfig.getInstance();
console.log(a === b); // true ✅`,
  },
  {
    id: "adapter",
    name: "适配器模式",
    nameEn: "Adapter",
    category: "structural",
    icon: "🔌",
    brief: "将一个类的接口转换成客户端期望的另一个接口，使原本不兼容的类可以一起工作。",
    analogy: "就像出国旅行带的电源转换插头 —— 你的中国电器是两脚插头，到了英国是三脚的，加个转换插头就能用了。插头变了，电器本身没变。",
    explain: `你对接过第三方 API 吗？他们返回的数据格式跟你系统里用的格式完全不一样。怎么办？写个转换层呗。这就是适配器模式。

**适配器就是一个「翻译官」**，它把一个接口「翻译」成另一个接口。原来两个不兼容的类，通过适配器就能愉快地合作了。

有两种实现方式：一是「类适配器」（通过继承），二是「对象适配器」（通过组合）。实际开发中对象适配器用得更多，因为更灵活。

你在工作中其实经常在用适配器，只是可能没意识到：比如把 XML 数据转成 JSON，把旧接口包装成新接口，把第三方库的 API 封装成自己项目统一的格式。`,
    roles: [
      { name: "Target（目标接口）", desc: "客户端期望使用的接口" },
      { name: "Adaptee（被适配者）", desc: "已有的、接口不兼容的类" },
      { name: "Adapter（适配器）", desc: "把 Adaptee 的接口转换为 Target 接口" },
    ],
    pros: ["让不兼容的类可以协同工作", "不需要修改原有代码，符合开闭原则", "可以复用已有的类"],
    cons: ["多一层包装，增加系统复杂度", "过多的适配器会让系统变得零碎", "有时可能不如直接重构原有代码"],
    usage: ["想使用一个已有的类，但它的接口不符合你的需求", "对接第三方系统或遗留系统", "想统一多个类似但接口不同的类"],
    code: `// 旧系统：返回 XML 格式
class OldApi {
  getXmlData(): string {
    return "<user><name>张三</name></user>";
  }
}
// 新系统期望 JSON 格式
interface DataProvider {
  getJsonData(): { name: string };
}
// 适配器：把 XML 转成 JSON
class ApiAdapter implements DataProvider {
  constructor(private oldApi: OldApi) {}
  getJsonData() {
    const xml = this.oldApi.getXmlData();
    const name = xml.match(/<name>(.*?)<\\/name>/)?.[1] ?? "";
    return { name };
  }
}
// 新代码感知不到旧系统的存在
const adapter = new ApiAdapter(new OldApi());
console.log(adapter.getJsonData()); // { name: "张三" }`,
  },
  {
    id: "bridge",
    name: "桥接模式",
    nameEn: "Bridge",
    category: "structural",
    icon: "🌉",
    brief: "将抽象部分与实现部分分离，使它们都可以独立地变化。",
    analogy: "就像遥控器和电视机是分开的 —— 不同牌子的遥控器可以配不同牌子的电视。遥控器的「操作方式」和电视机的「品牌实现」是两个独立维度。",
    explain: `当一个事物有**两个或多个独立变化的维度**时，如果用继承来处理，类的数量会爆炸式增长。

比如「形状」有圆形和方形，「颜色」有红色和蓝色。如果用继承，你需要：红色圆形、蓝色圆形、红色方形、蓝色方形……4 个类。维度一多就炸了。

桥接模式的解法是：**把这两个维度拆开，用组合代替继承**。让「形状」持有一个「颜色」的引用，两边独立变化，互不影响。

「桥」就是那个连接两个维度的引用关系。这样不管形状怎么加、颜色怎么变，都不需要修改对方。类的数量从 M×N 降到了 M+N。`,
    roles: [
      { name: "Abstraction（抽象层）", desc: "定义高层接口，持有实现层的引用" },
      { name: "RefinedAbstraction（扩展抽象）", desc: "对抽象层的扩展" },
      { name: "Implementor（实现层接口）", desc: "定义实现层的接口" },
      { name: "ConcreteImplementor（具体实现）", desc: "实现层接口的具体实现" },
    ],
    pros: ["分离抽象和实现，两者可以独立扩展", "类的数量从 M×N 降低到 M+N", "符合开闭原则，扩展灵活"],
    cons: ["增加了系统的理解难度", "需要正确识别系统中独立变化的维度", "设计初期需要花时间分析抽象层次"],
    usage: ["一个类存在两个或多个独立变化的维度", "不希望使用多层继承导致类爆炸", "需要在运行时切换实现方式"],
    code: `// 实现层：渲染方式
interface Renderer {
  renderShape(shape: string): string;
}
class SVGRenderer implements Renderer {
  renderShape(shape: string) { return "🎨 SVG 渲染 " + shape; }
}
class CanvasRenderer implements Renderer {
  renderShape(shape: string) { return "🖼️ Canvas 渲染 " + shape; }
}
// 抽象层：形状
abstract class Shape {
  constructor(protected renderer: Renderer) {}
  abstract draw(): string;
}
class Circle extends Shape {
  draw() { return this.renderer.renderShape("圆形"); }
}
class Square extends Shape {
  draw() { return this.renderer.renderShape("方形"); }
}
// 两个维度自由组合
console.log(new Circle(new SVGRenderer()).draw());
// 🎨 SVG 渲染 圆形
console.log(new Square(new CanvasRenderer()).draw());
// 🖼️ Canvas 渲染 方形`,
  },
  {
    id: "decorator",
    name: "装饰器模式",
    nameEn: "Decorator",
    category: "structural",
    icon: "🎀",
    brief: "动态地给对象添加额外的职责，比继承更灵活的功能扩展方式。",
    analogy: "就像给手机加壳、贴膜、挂绳 —— 手机本身没变，但一层层加上去，功能越来越丰富。每个配件独立存在，可以自由组合搭配。",
    explain: `假设你有一个基础的咖啡类，现在要加各种配料：牛奶、糖、奶油。如果用继承来做：牛奶咖啡、糖咖啡、牛奶+糖咖啡……排列组合下来类会爆炸。

装饰器的思路是：**像穿衣服一样，一层层往外套**。每个「装饰器」包裹住原来的对象，在保持原有功能的基础上，额外添加新功能。

关键在于：装饰器和被装饰的对象实现相同的接口，所以对外界来说它们是透明的。你可以随意组合多个装饰器，想加什么功能就套一层。

Java 的 I/O 流就是经典例子：new BufferedReader(new InputStreamReader(new FileInputStream("file"))) —— 每层装饰器加一种能力。`,
    roles: [
      { name: "Component（组件接口）", desc: "定义对象的基本接口" },
      { name: "ConcreteComponent（具体组件）", desc: "被装饰的原始对象" },
      { name: "Decorator（装饰器基类）", desc: "持有 Component 引用，实现相同接口" },
      { name: "ConcreteDecorator（具体装饰器）", desc: "添加额外职责的装饰器" },
    ],
    pros: ["比继承更灵活，可以动态添加/移除功能", "装饰器可以自由组合，避免类爆炸", "符合开闭原则"],
    cons: ["多层装饰嵌套会导致代码可读性下降", "排查问题时需要层层剥离，调试困难", "对于简单功能扩展可能过度设计"],
    usage: ["需要在运行时动态添加功能", "不能或不想用继承来扩展", "需要透明地添加功能（调用者不感知）"],
    code: `// 组件接口
interface Coffee {
  cost(): number;
  desc(): string;
}
// 基础咖啡
class Espresso implements Coffee {
  cost() { return 15; }
  desc() { return "☕ 浓缩咖啡"; }
}
// 装饰器：加牛奶
class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  cost() { return this.coffee.cost() + 5; }
  desc() { return this.coffee.desc() + " + 🥛牛奶"; }
}
// 装饰器：加糖
class SugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  cost() { return this.coffee.cost() + 2; }
  desc() { return this.coffee.desc() + " + 🍬糖"; }
}
// 自由组合
let coffee: Coffee = new Espresso();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(coffee.desc());  // ☕ 浓缩咖啡 + 🥛牛奶 + 🍬糖
console.log("价格: ¥" + coffee.cost()); // 价格: ¥22`,
  },
  {
    id: "facade",
    name: "外观模式",
    nameEn: "Facade",
    category: "structural",
    icon: "🏛️",
    brief: "为复杂的子系统提供一个统一的、简化的高层接口。",
    analogy: "就像汽车的「一键启动」—— 按一个按钮就搞定了点火、通电、预热、启动引擎等一堆事情。你不需要了解引擎盖下面发生了什么。",
    explain: `你有没有用过一堆 API 完成一个功能？比如下单：要检查库存、验证用户、计算价格、创建订单、发送通知……每次下单都要调一堆接口，太麻烦了。

外观模式就是在这堆复杂操作前面**放一个「门面」**，只暴露一个简单的方法。调用者只需要 orderFacade.placeOrder()，背后的复杂逻辑全部封装好了。

这就像酒店的前台 —— 不管你要订房、叫车、订餐，找前台就行了，前台帮你协调各个部门。你不需要知道酒店有多少个部门、每个部门在哪。

外观模式不是要隐藏子系统（有需要你仍然可以直接调用），它只是提供了一个更方便的入口。`,
    roles: [
      { name: "Facade（外观类）", desc: "提供简化的接口，知道哪些子系统负责什么" },
      { name: "SubSystem（子系统）", desc: "实现具体功能的各个模块" },
    ],
    pros: ["简化客户端的使用，降低学习成本", "减少了客户端与子系统之间的依赖", "子系统内部变化不影响客户端"],
    cons: ["外观类可能变成「上帝类」，啥都管", "不能完全阻止客户端直接使用子系统", "增加了一个新的抽象层"],
    usage: ["为复杂子系统提供简单入口", "解耦客户端和底层系统", "分层架构中，定义每层的入口点"],
    code: `// 子系统们
class Inventory {
  check(item: string) { console.log("📦 检查库存: " + item); return true; }
}
class Payment {
  process(amount: number) { console.log("💳 支付: ¥" + amount); return true; }
}
class Shipping {
  arrange(addr: string) { console.log("🚚 发货到: " + addr); }
}
// 外观类：一个方法搞定所有事
class OrderFacade {
  private inv = new Inventory();
  private pay = new Payment();
  private ship = new Shipping();

  placeOrder(item: string, amount: number, addr: string) {
    if (!this.inv.check(item)) return false;
    if (!this.pay.process(amount)) return false;
    this.ship.arrange(addr);
    return true;
  }
}
new OrderFacade().placeOrder("键盘", 299, "北京");`,
  },
  {
    id: "flyweight",
    name: "享元模式",
    nameEn: "Flyweight",
    category: "structural",
    icon: "🪶",
    brief: "通过共享技术来有效地支持大量细粒度的对象，减少内存消耗。",
    analogy: "就像共享单车 —— 街上几千辆单车不是给每个人造一辆专属的，而是大家共用。每辆车的「骑行记录」不同，但「车」本身是共享的。",
    explain: `假设你在做一个文本编辑器，文档有几百万个字符。每个字符都是一个对象，存储了字体、大小、颜色等信息。这得占多少内存？

但你仔细想想，其实大部分字符用的字体、大小、颜色都是一样的。**享元模式就是把这些「相同的部分」提取出来共享**。

关键概念有两个：**内部状态**（intrinsic）是共享的、不变的部分（如字体、大小）；**外部状态**（extrinsic）是不能共享的、每个对象不同的部分（如位置）。

通过一个「享元工厂」来管理共享对象：需要时先查查有没有现成的，有就直接复用，没有才创建新的。游戏开发中特别常见。`,
    roles: [
      { name: "Flyweight（享元接口）", desc: "定义共享对象的接口" },
      { name: "ConcreteFlyweight（具体享元）", desc: "存储内部状态的共享对象" },
      { name: "FlyweightFactory（享元工厂）", desc: "创建和管理享元对象池" },
      { name: "Client（客户端）", desc: "维护外部状态，使用享元对象" },
    ],
    pros: ["大幅减少相似对象的内存占用", "当对象数量巨大时效果显著", "外部状态独立，使用灵活"],
    cons: ["增加了系统复杂度（需要区分内外部状态）", "读取外部状态需要额外时间（用时间换空间）", "需要仔细设计哪些是可以共享的"],
    usage: ["系统中有大量相似对象，造成内存浪费", "对象的大部分状态可以外部化", "使用享元后能显著减少对象数量"],
    code: `// 享元：存储共享的「内部状态」
class TreeType {
  constructor(
    public name: string,
    public color: string,
    public texture: string
  ) {}
  draw(x: number, y: number) {
    console.log("🌲 " + this.name + "(" + this.color + ") 在 (" + x + "," + y + ")");
  }
}
// 享元工厂
class TreeFactory {
  private static pool = new Map<string, TreeType>();
  static getTreeType(name: string, color: string, texture: string) {
    const key = name + "_" + color;
    if (!this.pool.has(key)) {
      this.pool.set(key, new TreeType(name, color, texture));
    }
    return this.pool.get(key)!;
  }
  static get count() { return this.pool.size; }
}
// 10000 棵树，但只需要几个 TreeType 对象
const oak = TreeFactory.getTreeType("橡树", "绿色", "oak.png");
oak.draw(10, 20);
oak.draw(50, 80); // 复用同一个对象
console.log("享元对象总数: " + TreeFactory.count); // 1`,
  },
  {
    id: "proxy",
    name: "代理模式",
    nameEn: "Proxy",
    category: "structural",
    icon: "🛡️",
    brief: "为其他对象提供一种代理以控制对这个对象的访问。",
    analogy: "就像明星的经纪人 —— 想找明星拍戏？先找经纪人谈。经纪人帮明星筛选请求、谈价格、安排档期，你不能直接绕过经纪人。",
    explain: `有时候你不能或不想让客户端直接访问一个对象。可能是因为这个对象创建起来很贵、需要做权限控制、需要记录日志、或者对象在远程服务器上。

这时候就在目标对象前面放一个**「代理人」**。代理和目标对象实现相同的接口，所以客户端用起来感觉一样。但代理可以在转发请求之前或之后做额外的事情。

常见的代理类型：**虚拟代理**（延迟加载）、**保护代理**（权限控制）、**远程代理**（访问远程对象）、**缓存代理**（缓存结果）。

前端开发中，Vue 3 的响应式系统就是用 JavaScript Proxy 实现的。ES6 的 Proxy 对象让代理模式变得更加优雅。`,
    roles: [
      { name: "Subject（主题接口）", desc: "定义代理和真实对象的公共接口" },
      { name: "RealSubject（真实对象）", desc: "被代理的实际对象" },
      { name: "Proxy（代理）", desc: "持有真实对象的引用，控制其访问" },
    ],
    pros: ["在不修改目标对象的前提下增强功能", "可以控制对象的访问（权限、缓存、延迟加载）", "客户端无感知，符合开闭原则"],
    cons: ["多了一层代理，可能影响性能", "增加系统复杂度", "某些代理模式实现起来较复杂"],
    usage: ["需要延迟加载重量级对象（虚拟代理）", "需要控制对象访问权限（保护代理）", "需要缓存请求结果（缓存代理）", "需要记录访问日志（日志代理）"],
    code: `// 接口
interface ImageLoader {
  display(): void;
}
// 真实对象（加载很慢）
class HighResImage implements ImageLoader {
  constructor(private filename: string) {
    console.log("⏳ 加载高清图片: " + filename);
  }
  display() { console.log("🖼️ 显示: " + this.filename); }
}
// 代理：延迟加载
class ImageProxy implements ImageLoader {
  private image: HighResImage | null = null;
  constructor(private filename: string) {}
  display() {
    if (!this.image) {
      this.image = new HighResImage(this.filename);
    }
    this.image.display();
  }
}
// 创建代理很快，不会立即加载图片
const img = new ImageProxy("photo.jpg");
console.log("代理已创建，图片还没加载");
img.display(); // 此时才真正加载`,
  },
  {
    id: "command",
    name: "命令模式",
    nameEn: "Command",
    category: "behavioral",
    icon: "📋",
    brief: "将请求封装成对象，从而可以用不同的请求来参数化客户端，并支持撤销操作。",
    analogy: "就像餐厅的订单系统 —— 服务员把客人的点单写在纸上，交给厨师。这张订单可以排队、可以取消、可以记录。如果没有订单，服务员得跑到厨房喊，那就乱套了。",
    explain: `通常我们调用方法都是直接的：light.turnOn()。但如果你需要把操作存起来以后执行、支持撤销/重做、记录操作日志、把操作放进队列呢？

命令模式的做法是：**把「做什么」封装成一个对象**。每个命令对象都有一个 execute() 方法。

你可以把命令存进列表（实现撤销历史），可以把命令放进队列（延迟执行），可以记录命令（操作日志）。

最常见的应用就是「撤销/重做」功能。每执行一个命令就入栈，撤销就弹出来调 undo()。文本编辑器、PS、IDE 里的 Ctrl+Z 基本都是这个思路。`,
    roles: [
      { name: "Command（命令接口）", desc: "声明 execute() 和可选的 undo() 方法" },
      { name: "ConcreteCommand（具体命令）", desc: "绑定了接收者和具体操作" },
      { name: "Invoker（调用者）", desc: "触发命令执行（如遥控器、按钮）" },
      { name: "Receiver（接收者）", desc: "实际执行操作的对象" },
    ],
    pros: ["解耦请求发送者和接收者", "方便实现撤销/重做、日志、队列", "可以组合多个命令为宏命令"],
    cons: ["每个操作都要一个命令类，可能导致类膨胀", "简单操作也要封装，有一定 overhead", "命令的参数传递可能比较麻烦"],
    usage: ["需要撤销/重做功能", "需要将操作排队或延迟执行", "需要记录操作日志", "需要支持事务"],
    code: `// 命令接口
interface Command {
  execute(): void;
  undo(): void;
}
// 接收者
class TextEditor {
  content = "";
  insert(text: string) { this.content += text; }
  deleteLast(n: number) { this.content = this.content.slice(0, -n); }
}
// 具体命令
class InsertCommand implements Command {
  constructor(private editor: TextEditor, private text: string) {}
  execute() { this.editor.insert(this.text); }
  undo()    { this.editor.deleteLast(this.text.length); }
}
// 调用者：支持撤销
class History {
  private stack: Command[] = [];
  execute(cmd: Command) { cmd.execute(); this.stack.push(cmd); }
  undo() { this.stack.pop()?.undo(); }
}
const editor = new TextEditor();
const history = new History();
history.execute(new InsertCommand(editor, "Hello "));
history.execute(new InsertCommand(editor, "World"));
console.log(editor.content); // "Hello World"
history.undo();
console.log(editor.content); // "Hello "  ← 撤销成功！`,
  },
  {
    id: "mediator",
    name: "中介者模式",
    nameEn: "Mediator",
    category: "behavioral",
    icon: "🗼",
    brief: "用一个中介对象来封装一系列对象的交互，使各对象不需要互相引用。",
    analogy: "就像机场的控制塔台 —— 所有飞机不互相联系，全部通过塔台协调。塔台知道每架飞机的状态，统一调度起降。如果飞机直接互相喊话，天空就乱了。",
    explain: `当系统中多个对象需要互相通信时，如果让它们直接引用彼此，就会形成一张复杂的「网状关系」。每加一个对象，要修改好多其他对象。

中介者模式的解法是：**加一个「中间人」，所有通信都通过它中转**。这样「网状关系」就变成了「星状关系」，每个对象只需要认识中介者就行了。

最经典的例子是聊天室：用户不直接给其他用户发消息，而是把消息发到聊天室（中介者），聊天室再转发给其他人。

另一个例子是表单验证：多个输入框之间有联动关系，如果让它们直接互相控制会很混乱。加个中介者来统一协调就清爽多了。`,
    roles: [
      { name: "Mediator（中介者接口）", desc: "定义组件间通信的接口" },
      { name: "ConcreteMediator（具体中介者）", desc: "实现协调逻辑，持有各组件引用" },
      { name: "Colleague（同事类）", desc: "各个参与者，只认识中介者" },
    ],
    pros: ["把网状关系简化为星状关系，降低耦合", "新增参与者只需要修改中介者，不影响其他人", "交互逻辑集中管理，便于理解和维护"],
    cons: ["中介者本身可能变得非常复杂", "中介者成为系统的单点故障", "可能隐藏了不合理的设计"],
    usage: ["多个对象之间有复杂的相互依赖", "想通过一个中心点来控制交互", "一组对象通信方式定义良好但方式复杂"],
    code: `// 中介者：聊天室
class ChatRoom {
  private users = new Map<string, (msg: string) => void>();

  register(name: string, cb: (msg: string) => void) {
    this.users.set(name, cb);
  }
  send(from: string, to: string, msg: string) {
    const receiver = this.users.get(to);
    if (receiver) receiver("[" + from + "]: " + msg);
  }
  broadcast(from: string, msg: string) {
    this.users.forEach((cb, name) => {
      if (name !== from) cb("[" + from + "]: " + msg);
    });
  }
}

const room = new ChatRoom();
room.register("Alice", msg => console.log("Alice 收到 " + msg));
room.register("Bob",   msg => console.log("Bob 收到 " + msg));
room.register("Carol", msg => console.log("Carol 收到 " + msg));

room.send("Alice", "Bob", "你好！");
// Bob 收到 [Alice]: 你好！
room.broadcast("Bob", "大家好！");
// Alice 收到 [Bob]: 大家好！
// Carol 收到 [Bob]: 大家好！`,
  },
  {
    id: "observer",
    name: "观察者模式",
    nameEn: "Observer",
    category: "behavioral",
    icon: "👁️",
    brief: "定义对象间的一对多依赖关系，当一个对象状态改变时，所有依赖者都会自动收到通知。",
    analogy: "就像订阅 B站UP主 —— 你关注了一个UP主，每次他发新视频你都会收到通知。你随时可以取关。UP主不需要知道粉丝都是谁，只管发内容就好。",
    explain: `想象你在做一个天气应用。天气数据变了，首页要更新、通知栏要更新、小组件也要更新。如果在天气服务里写一堆 update 调用，每加一个展示位就要改天气服务的代码，太糟糕了。

观察者模式的做法是：天气服务（被观察者）维护一个「订阅者列表」。**谁想收到通知就来订阅，天气一变就自动通知所有订阅者**。

这就是「发布-订阅」机制。被观察者不需要知道观察者的具体类型，只需要知道它们都有一个 update() 方法。

在前端开发中你几乎每天都在用观察者模式：DOM 事件监听、React 的 useState、Vue 的响应式系统、Redux 的状态管理、Node.js 的 EventEmitter。它是最重要、最常用的行为型模式之一。`,
    roles: [
      { name: "Subject（被观察者）", desc: "维护观察者列表，状态变化时通知所有观察者" },
      { name: "Observer（观察者接口）", desc: "定义 update() 方法" },
      { name: "ConcreteObserver（具体观察者）", desc: "实现 update()，根据通知做出响应" },
    ],
    pros: ["发布者和订阅者松耦合", "可以动态添加和移除观察者", "支持广播通信，一对多通知"],
    cons: ["观察者过多时通知耗时", "如果观察者和被观察者有循环依赖，可能导致死循环", "通知顺序不确定"],
    usage: ["一个对象的状态变化需要通知其他对象", "不知道有多少对象需要被通知（动态订阅）", "事件驱动系统"],
    code: `// 发布者
class EventEmitter<T> {
  private listeners: ((data: T) => void)[] = [];

  subscribe(fn: (data: T) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }
  emit(data: T) {
    this.listeners.forEach(fn => fn(data));
  }
}

const weather = new EventEmitter<{ temp: number }>();

const unsub = weather.subscribe(
  data => console.log("🏠 首页: " + data.temp + "°C")
);
weather.subscribe(
  data => console.log("🔔 通知: " + data.temp + "°C")
);

weather.emit({ temp: 28 });
// 🏠 首页: 28°C
// 🔔 通知: 28°C

unsub(); // 取消首页的订阅
weather.emit({ temp: 30 });
// 🔔 通知: 30°C  ← 只有通知栏收到了`,
  },
  {
    id: "state",
    name: "状态模式",
    nameEn: "State",
    category: "behavioral",
    icon: "🚦",
    brief: "允许对象在内部状态改变时改变它的行为，看起来就像换了一个类。",
    analogy: "就像红绿灯 —— 红灯时车要停，绿灯时可以走，黄灯时要减速。同一个信号灯，不同状态下发出的「指令」完全不同。状态切换是自动的。",
    explain: `你写过这样的代码吗？一个对象有多种状态，每个方法里都是一大堆 if-else 来判断当前状态该怎么做。每加一个状态，所有方法都要改。噩梦。

状态模式的思路是：**把每种状态封装成一个独立的类**，每个状态类实现相同的接口。对象的行为委托给当前的状态对象来执行。

当状态发生切换时，就把对象内部的状态对象换成新的。这样对象的行为自然就变了，但代码很干净 —— 没有 if-else 丛林。

状态模式和策略模式长得很像，区别在于：策略模式是客户端主动选策略，状态模式是对象自己根据条件切换状态。`,
    roles: [
      { name: "Context（上下文）", desc: "持有当前状态的引用，将行为委托给状态对象" },
      { name: "State（状态接口）", desc: "定义每个状态的行为接口" },
      { name: "ConcreteState（具体状态）", desc: "实现特定状态下的行为" },
    ],
    pros: ["消除了大量 if-else / switch 语句", "每个状态是独立的类，职责清晰", "新增状态不用修改已有状态类"],
    cons: ["状态少的时候可能过度设计", "状态类数量可能较多", "状态转换逻辑分散在各个状态类中，不易总览"],
    usage: ["对象行为取决于当前状态，且状态数目较多", "代码中有大量基于状态的条件判断", "状态之间有明确的转换规则"],
    code: `// 状态接口
interface PhoneState {
  pressButton(phone: Phone): void;
  name: string;
}
class LockedState implements PhoneState {
  name = "🔒 锁屏";
  pressButton(phone: Phone) {
    console.log("解锁屏幕");
    phone.setState(new UnlockedState());
  }
}
class UnlockedState implements PhoneState {
  name = "🔓 解锁";
  pressButton(phone: Phone) {
    console.log("锁定屏幕");
    phone.setState(new LockedState());
  }
}
class Phone {
  private state: PhoneState = new LockedState();
  setState(s: PhoneState) { this.state = s; }
  getState() { return this.state.name; }
  pressPowerButton() {
    console.log("当前: " + this.state.name);
    this.state.pressButton(this);
  }
}
const phone = new Phone();
phone.pressPowerButton(); // 🔒 锁屏 → 解锁
phone.pressPowerButton(); // 🔓 解锁 → 锁定`,
  },
  {
    id: "strategy",
    name: "策略模式",
    nameEn: "Strategy",
    category: "behavioral",
    icon: "🧭",
    brief: "定义一组算法，将每个算法封装起来，使它们可以互相替换。",
    analogy: "就像导航软件选路线 —— 「最快路线」「最短路线」「避开高速」，目的地都一样，但走法不同。你可以随时切换策略，导航软件本身不用改。",
    explain: `假设你在做一个电商系统的价格计算模块。普通用户原价，VIP 打 8 折，SVIP 打 6 折，节日再叠加满减……如果把这些逻辑全写在一个方法里用 if-else 判断，代码会越来越臃肿。

策略模式的做法是：**每种算法（策略）是一个独立的类，它们实现相同的接口**。使用时把策略「注入」到上下文中，需要切换时换一个策略对象就行了。

和状态模式的区别是：策略模式是**你来选**用哪个策略，状态模式是**对象自己判断**该怎么做。

策略模式在实际开发中用得非常多。React 中的 sort 函数传比较器、Express 中间件、不同支付方式的处理……记住：当你发现一堆 if-else 在选择「用哪种方式做同一件事」时，就该考虑策略模式了。`,
    roles: [
      { name: "Strategy（策略接口）", desc: "定义算法的公共接口" },
      { name: "ConcreteStrategy（具体策略）", desc: "实现某种具体算法" },
      { name: "Context（上下文）", desc: "持有策略对象的引用，调用策略方法" },
    ],
    pros: ["避免大量 if-else，代码干净", "策略可以自由切换，互相替换", "新增策略不用修改已有代码"],
    cons: ["客户端必须了解所有策略才能选择", "策略很多时类的数量也会增加", "策略之间无法共享数据（各自独立）"],
    usage: ["多种算法/规则/行为可以互换", "需要在运行时动态切换算法", "代码中有大量 if-else 选择算法"],
    code: `// 策略接口
interface PriceStrategy {
  calculate(price: number): number;
  name: string;
}
class NormalPrice implements PriceStrategy {
  name = "普通用户";
  calculate(price: number) { return price; }
}
class VIPPrice implements PriceStrategy {
  name = "VIP 八折";
  calculate(price: number) { return price * 0.8; }
}
class SVIPPrice implements PriceStrategy {
  name = "SVIP 六折";
  calculate(price: number) { return price * 0.6; }
}
// 上下文
class PriceCalculator {
  constructor(private strategy: PriceStrategy) {}
  setStrategy(s: PriceStrategy) { this.strategy = s; }
  getPrice(price: number) {
    const final = this.strategy.calculate(price);
    console.log(this.strategy.name + ": ¥" + price + " → ¥" + final);
    return final;
  }
}
const calc = new PriceCalculator(new NormalPrice());
calc.getPrice(100);  // 普通用户: ¥100 → ¥100
calc.setStrategy(new VIPPrice());
calc.getPrice(100);  // VIP 八折: ¥100 → ¥80
calc.setStrategy(new SVIPPrice());
calc.getPrice(100);  // SVIP 六折: ¥100 → ¥60`,
  },
];

export function getPatternsByCategory(category: Category): Pattern[] {
  return patterns.filter((p) => p.category === category);
}

export function searchPatterns(query: string): Pattern[] {
  const q = query.toLowerCase();
  return patterns.filter(
    (p) =>
      p.name.includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.brief.includes(q) ||
      p.analogy.includes(q)
  );
}
