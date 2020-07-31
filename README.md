# [2020]一条龙服务: 开服从入门到精通


# 零.前言

  之所以想写这一篇一条龙教程，实在是因为国人开服，功利心很重，不需要过程，只需要结果。有的人开服，喜欢网上抓一个整合包就开起来，自己不会改，但是只要能得到“结果”就好了。在这个大环境下，国内服务器圈弥漫着一股粗制滥造和模板化的问题。而真正想从零开始的小白服主，又很难找到一个精准，完全的开服教程，往往要东拼西凑，获得经验。


  本文的初衷是一条龙服务，为希望认真学习开服技术的小白服主们提供全面的服务。通过循序渐进的方式，通过夹杂着故事的技术讲解，为小白服主们揭开服务端的神秘面纱。


  本文为本人耗时多天完成，难免有一定纰漏，如有技术上或语言上的问题欢迎指正。同时，本文还会持续更新，如果您有什么不理解的开服问题需要详细了解，也欢迎回复告诉我您的想法。


请 **务必** 注意查看标注的每一个注释，他们都非常有用


本文 的 面向用户 不是 基岩版服主


本文 不讨论代理服务端


本文 不讨论如何进行端口映射，端口转发等工作


本文 已假设您的操作系统环境均已显示文件拓展名，且改名要求均包含拓展名


# 一.服务端核心介绍

  所谓`服务端核心`(简称核心，有时也被叫做服务端)是指开服时需要使用的服务端运行核心文件或是补丁安装器，他们一般以.jar后缀结尾，一般情况下，我们可以使用CMD(文件以.bat为结尾)或是Linux Shell(文件以.sh为结尾)运行这样的jar以管理服务器


## 为什么要说"服务端运行核心文件或是补丁安装器"

  一般情况下，我们都应该认为一个服务器的所有运行代码都存在那一个小小的罐子(指jar)里，但是对于某些服务端核心来说，用于运行服务器核心代码完全不在这个jar里，如果提及原因的话，时间要拉回好几年前:
  根据Mojang的最终用户许可协议(EULA)，任何人能二次分发Minecraft二进制文件，不能分发Minecraft的源代码[^1]，也不能在其项目中包含Minecraft的代码部分，因此，一切插件服务端的伊始，CraftBukkit服务端因为本体包含Minecraft代码，违反了Mojang EULA和千禧年数字版权法(DMCA)，面临被起诉的风险，最终被迫停止开发。
  于是，前来接起CraftBukkit服务端核心大旗的，是SpigotMC团队和他们开发的SpigotMC核心。SpigotMC团队很聪明，他们直接不提供编译[^2]好的核心，而是向用户分发一个叫做`BuildTools`的工具，通过BuildTools工具，我们可以在自己的计算机上在线合成Minecraft代码和Spigot代码，最终合成为Spigot核心供我们使用，以此绕开了Mojang EULA和DMCA的管辖(SpigotMC团队:我没提供源代码，是用户自己编译的，他们也没分发，就自己用用，没人犯法啊(笑))
    但这不是我们要说的补丁安装器，他是用来编译核心的，最终得到的核心属于`服务端运行核心文件`，是包含Minecraft代码的核心文件，那么补丁安装器是什么?
    大家可能已经发现了BuildTools的弊端:麻烦，为了开个服我既要准备编译环境[^3]，又要花差不多半个小时编译一遍核心，慢死了。因此，后来的PaperMC团队使用了一种更灵活的方式糅合服务端核心:`打补丁(patch)`。
    其实很容易理解所谓的打补丁，PaperMC团队会把每一次Paper的更新制作成一个个补丁文件的形式，然后我们可以在Paper官网下载到包含这些补丁的补丁安装器，然后运行补丁安装器，下载原版服务端[^4]文件，安装补丁，生成已打补丁文件并运行（如果你用过，或是即将使用Paper核心，那么可以留心paper服务端运行后会在根目录[^5]的cache文件夹内生成一个mojang_X.X.X.jar和patched.X.X.X.jar，他们便是原版服务端文件和已打补丁文件(已打补丁文件便是包含Minecraft代码的`服务端运行核心文件`)）

[^1]: 指通过某些方式，将已经编译成计算机能够识别并运行的Java字节码文件(.class)还原回Java源代码(.java)的行为
[^2]: 与反编译相反，是指将Java源代码处理为字节码文件的行为
[^3]: 指编译时需要准备的前置软件，此处指`Git`
[^4]: 有关原版服务端的内容请见下文对`Vanilla`服务端核心的介绍
[^5]: 指服务端核心所在的那一层文件夹，下文可能会以`.\`标识，如`.\cache`即指服务端根目录下的cache文件夹目录


## 什么是CMD，什么又是Linux Shell?为什么我们不能直接双击jar运行服务端核心?

  Hey，你知道吗，这个世界上有三种主流的计算机操作系统，他们分别是`Microsoft Windows`，`Mac OS`和`Linux`，在这里我们只谈论Windows和Linux。
  大部分人都使用的是Windows操作系统，他以易用和图形化著称，其缺点是系统性能消耗相对较高，且极度依赖图形界面;而Linux，以高性能和开放性著称，他是开源[^6]的，因此高度可定制，同时不依赖与图形界面，很适合服务器操作系统，缺点是对于服务器版Linux发行版[^7]操作系统，一般没有图形化界面，只有黑白的代码界面，因此需要一定Linux系统知识才能使用。
  对于新手来说，除非你有一定运维知识，否则我推荐你使用Windows操作系统(比如你正在用的这台)来开服
  CMD是Windows操作系统的命令提示符，我们可以使用CMD的.bat批处理文件在Windows上批量完成某些任务;Linux Shell则用途相同，是Linux上用于批量执行任务的东西
  那么为什么我们要使用这些东西来开服，直接双击jar运行服务端核心不行吗?
  答案是因为有时行，有时不行，而且行的那个也不是很彳亍:对于一部分服务端，当你双击运行服务端核心时，会弹出一个Minecraft官方服务端提供的原生的控制台窗口，但有些服务端是不提供的，直接双击会导致服务端运行但看不到运行状态，也不能向执行命令(而且那个原生的控制台窗口不支持显示颜色)。

[^6]: 即开放源代码，指向所有人开放软件的源代码并在一定程度上供人们修改
[^7]: 事实上，不存在Linux操作系统，Linux只是一个内核，因此你用的Linux其实是Linux的发行版，他们基于Linux内核，并实现了不同的功能供你使用(如Ubuntu,CentOS,Debian等)


## 到底有哪些服务端核心

  那么说完上面的，那么现在究竟有哪些核心，他们应该怎么区分，又有什么区别呢?
注意: 为了方便查阅，我们将会用**粗体**表示推荐使用的服务端核心，使用*斜体*表示另类，冷门，不推荐使用的服务端核心
注意:此处我们只会介绍目前还在积极更新的，或是有一定历史意义的服务端核心，对于刚出生就夭寿的，无意义的服务端，此处不多赘述


1.Vanilla
  对于Java版来说，绝大多数服务端的始祖便是Mojang提供的官方服务端了，按照习惯，我们把官服叫做Vanilla(香草，代指纯净)，其实他本身的名字应该是Minecraft_Server(但是大多数情况下我们不会用这个Server)

  Vanilla 有以下的属性

  - **不能** 安装基于任何API的模组[^8]
  - **不能** 安装基于任何API的插件[^9]
  - 原生兼容好(如命令方块，MCFunction)
  - 自带原生GUI控制台窗口
  - 即开即用
  - 性能较差


  根据以上属性，我们可以发现Vanilla基本上啥都干不了，就是原生兼容好，因此比较适合开**适合原版的服务器**(比如**玩玩命令方块小游戏地图啊，基友联机啊**之类的)


  下载Vanilla: 

    1. 前往正版启动器手动选择版本下载
    2. 前往第三方下载站下载（如GetBukkit:https://getbukkit.org/download/vanilla）

[^8]: 此处指基于ForgeAPI，LiteLoaderAPI，RiftAPI，FabricAPI等API开发的模组(Mod)。如果你无法理解，或是从未使用过该服务端所兼容的ModAPI，那么我建议你不要使用此服务端开服
[^9]: 此处指基于BukkitAPI，SpongeAPI或是其他API开发的插件(Plugin)。如果你无法理解，或是从未使用过该服务端所兼容的PluginAPI，那么也没关系，船到桥头自然直，毕竟我们讲的就是这个


*2.CraftBukkit(有时被称为Bukkit[^10])*
  这可不太好，因为仅用Vanilla我们无法快速，高效的从底层[^11]拓展游戏内容，因此，我们急需一个"窗口"，能够让有开发能力的服主通过这个窗口深入Minecraft，拓展MC内容。于是，CraftBukkit带着BukkitAPI出现在了我们的面前。
  CraftBukkit是一个包含了BukkitAPI的服务端，这意味着开发者们可以通过BukkitAPI提供的(有限的)内容来拓展服务器逻辑，增强游戏性。不同的开发者们把包含不同额外功能的拓展内容使用.jar文件包装起来，以让我们把这些文件放入CraftBukkit独有[^12]的插件文件夹(`.\plugins`)加载不同的功能。这些东西就叫做**插件**。

  CraftBukkit 有以下的属性:

  - 基于Vanilla
  - **可以** 安装基于BukkitAPI的插件
  - **基本不可以** 安装基于任何API的模组[^13]
  - 性能较差


  *为什么不推荐?:CraftBukkit虽然是跨时代性的，但他和Vanilla的性能一样差(甚至更差)，因此在后来的日子里诞生了很多自带优化的服务端，CraftBukkit对于我们来说只是一个过去时代的丰碑罢了，并不能满足实际使用需求了*
  *讲个题外话，CraftBukkit曾经的开发者现在要么离开了自己心爱的项目，要么去了SpigotMC团队，有一个人挺不寻常，他叫Searge，他最后收到了Mojang的邀请，前去开发Minecraft了。对于有的Mod开发者来说，你应当知道Mod Code Pack(MCP)也是由Searge等人发起的，而MCP使用的映射名"Srg名"，也是为了纪念Searge这位巨佬*


  下载CraftBukkit: 

    1. BukkitDev官方:~~http://dl.bukkit.org/~~ (由于Mojang EULA和DMCA的要求，已停止服务)
    2. SpigotMC官方:https://hub.spigotmc.org/jenkins/job/BuildTools/ (CraftBukkit不直接提供，你只能通过BuildTools手动构建)
    3. 使用第三方下载站下载已经构建好的CraftBukkit（如GetBukkit:https://getbukkit.org/download/craftbukkit）

[^10]: 把CraftBukkit称作Bukkit其实是不负责任的，Bukkit其实是一个规范，他仅包含接口，不包含实现，我们不应将两者划等号
[^11]: 本指原始代码，此处指从代码层面修改游戏内容
[^12]: 这里是指在当时，不是指现在
[^13]: 为什么说是`基本`呢?因为其实在1.6时代有一个叫做PlayerAPI的玩意允许你配合CraftBukkit玩一些类似于灵活动作的玩意，不过现在早已销声匿迹了


3.Spigot
  CraftBukkit是挺好，但是他性能和Vanilla一样捉急，甚至装多了插件还可能会更差，人们急切需要一个能够优化服务端处理逻辑，提升服务器性能的服务端，曾经有过多种这样的服务端，有的可能优化了TNT爆炸逻辑，有的可能优化了耕田逻辑，但是活到最后的，是包含了他们之中绝大部分优化功能的**Spigot**。
  Spigot由SpigotMC团队开发，可以说是CraftBukkit的正统续作，他不仅完全兼容BukkitAPI规范，还提供了更多独有的开发API[^14]，最重要的是，这个服务端优化很好，因此十分稳定。

  Spigot 有以下的属性:

  - 基于CraftBukkit
  - **可以** 安装基于BukkitAPI,SpigotAPI的插件
  - **不可以** 安装基于任何API的模组
  - 稳定性好
  - 性能较好


  下载Spigot:

    1. SpigotMC官方:https://hub.spigotmc.org/jenkins/job/BuildTools/ (Spigot不直接提供，你只能通过BuildTools手动构建)
    2. 使用第三方下载站下载已经构建好的Spigot（如GetBukkit:https://getbukkit.org/download/spigot）

[^14]: Spigot提供的独有API被称作SpigotAPI，其独立于CraftBukkit原生的BukkitAPI(虽然CraftBukkit现在由SpigotMC同时维护，但依然把一些API分开了)，后面要提的Paper服务端也同样提供了PaperAPI，同SpigotAPI和BukkitAPI隔离了起来。这也是服主们开服时某些插件在不同的服务端有不同的运行情况(有的能用有的不能了)的原因。此处独有也是指在当时，现在只要基于Spigot的核心都应支持SpigotAPI


**4.Paper(曾用名PaperSpigot，有时被称为PaperClip[^15])**
  一方面是认为Spigot更新太慢了，又一方面是认为Spigot的BuildTools太麻烦了，还一方面是因为Spigot的优化还 不 够 劲，因此，一群人创建了Paper。

  Paper 有以下的属性:

  - 基于Spigot
  - **可以** 安装基于BukkitAPI,SpigotAPI,PaperAPI的插件
  - **不可以** 安装基于任何API的模组
  - *部分*自带原生GUI控制台窗口[^16]
  - 稳定性较好
  - 性能好
  - 更新迅速
  - 提供了更多的优化和服务端个性化选项[^17] [^18]
  - 构建、使用方便
  - 搭载了较为先进的Aikar's Timings®性能分析系统[^19]


*为什么推荐?:Paper是一个兼具稳定，性能，拓展的服务端核心，不仅提供了很多有效的优化，更有很多自定义选项供服主选择，几乎100%兼容BukkitAPI插件也是人们选择Paper的主要原因*


  下载Paper:

    1. PaperMC官方: https://papermc.io/downloads (对于旧版本核心，你可以前往页末的`LEGACY`标签下载不受支持的旧版的Paper核心

[^15]: 此处PaperClip应当指的是Paper的**补丁安装器**，不含Paper核心本体，但因为用补丁安装器安装补丁并启动服务器基本感觉是一气呵成的所以大家总是把PaperClip当做Paper本体
[^16]: 之所以说部分支持，是因为大部分版本Spigot是把这个丑到爆炸的控制台删掉了的(即只能使用CMD或Linux Shell开服)，但自某个高于1.15的版本起，Paper又恢复了这个控制台以防你手贱双击打开了JAR但没有办法操控服务器，但这会导致在你不指定`nogui`参数时用命令行开服依然会把那个控制台给召唤出来
[^17]: 位于`.\paper.yml`。其实Spigot也是有这样的文件的，位于`.\spigot.yml`，同理，CraftBukkit也有，位于`.\bukkit.yml`，下游服务端是同时拥有上游服务端的这些文件的，因此新的服务端定义的新的文件提供了上游服务端所没有的新特性供服主们设定，而不是相互挤兑冲突。
[^18]: Hey，也许你是一个生电玩家转生的新手服主，希望开一个生电服，如果如此，请切记**不要**使用Paper，Paper内含对包括0tick等Minecraft原版"特性"的修复，可能会导致你和你的玩家感到疑惑，因此，你应当使用**Spigot**
[^19]: Timings是一种自Spigot开始自带的性能分析器，允许你通过一个网页查看一段时间内服务器的总耗能情况，据此推断出哪些插件，或是哪些世界，或是哪些生物卡服。Spigot也有Timings，但是是旧版的，一般称作Spigot Timings，虽也是由Aikar设计但是网页界面观感和功能都相差甚远。Aikar's Timings同时也搭载在Sponge核心中


5.Tuinity
  众所周知，Paper是开源的，那么这意味着，所有人都可以通过Paper所在的代码托管网站*Github*向PaperMC团队提交各种各样的漏洞修复/性能优化代码，而PaperMC团队也可以选择性的将这些代码合并到自己的项目中，完成一次协作。前往Paper的Github的 [Pull Request](https://github.com/PaperMC/Paper/pulls) 界面，你可以看到这里依然还有超过60个的代码合并请求尚在活跃状态但未被PaperMC团队合并。这些提交中可能包含着诸如视距优化这样的刚需，也包含对开发者有益的API更新。
  但Paper就是不合并，你也没办法。
  因此，一名叫做*Spottedleaf*的大佬站了出来，Fork[^20]了Paper的仓库，然后把那一堆PR[^21]全合并了，又作了一些改动，最后，Tuinity横空出世了
  曾经一段时间内，Tuinity仅支持JRE11[^22]作为其运行环境 但现在Tuinity只需JRE8+即可运行
  启动Tuinity会生成tuinity.yml，在其中可设置单玩家怪物生成，分离视距等高级参数。即使你不会设置这些参数，Tuinity自身自带的一个个优化也足以你的服务器使用。

  Tuinity 有以下的属性:

  - 基于Paper
  - **可以** 安装基于BukkitAPI,SpigotAPI,PaperAPI,TuinityAPI的插件 
  - **不可以** 安装基于任何API的模组
  - 性能极佳
  - 更新较快
  - 较为稳定


  下载Tuinity:

    1. CodeMC自动构建站: https://ci.codemc.io/job/Spottedleaf/job/Tuinity/

[^20]: 指使用Git克隆(拷贝)别人的代码仓库到自己的名下的行为
[^21]: 即Pull Request，拉取请求，就是上面说的那些希望合并的代码
[^22]: 即Java Runtime Environment(Version 11)，Java11的运行环境。同理，后文中JRE8+也指Java8以上的运行环境


6.Akarin/Torch[^23]
  用*Akarin Project*开发者们的原话来说，Akarin是一个 **"来自新纬度的服务端"** *(A server software from the 'new dimension'.)*，其本质原因是Akarin以 **多线程** *(Multi-Threaded)*著称。
  那么在此之前，我们需要了解什么是多线程。简单的来说，人一般情况下只能专心干一件事情，那么我们可以把这种行为叫做单线程;如果你能一下干多个事情，那么这就是所谓多线程——从软件或者硬件上实现多个线程并发执行的技术。
  在Akarin之前，绝大多数的服务端的核心任务都是由主线程这一条线程完成的，如果同时有很多事情要做，那么他得做完了一个再做另外一个，这就会引起卡顿，如果做的这件事情无线重复，或是要花费太长时间以至于连服务器的基本运行事件都给挡住了，那么就会引起**堵塞**，导致服务器瞬卡甚至崩溃。
  通过使用Akarin，我们可以将主线程本应完成的动作转移到其他子线程同时执行，极大的减缓了服务器压力。
  当然，因为这是一个新技术，同时让一个本不兼容多线程的东西兼容多线程是一个很难的工程，因此总会有不稳定因素。

  Akarin 有如下的属性:

  - 基于Paper/Tuinity[^24]
  - **可以** 安装基于BukkitAPI,SpigotAPI,PaperAPI，**可能可以**安装基于TuinityAPI的插件
  - **不可以** 安装基于任何API的模组
  - 性能极佳
  - 支持多线程
  - 更新不快
  - 不太稳定


  下载Akarin:

    1. Github Actions: https://github.com/Akarin-project/Akarin/actions
    2. JosephWorks Jenkins: http://josephworks.ddns.net:8080/job/Akarin-project/

[^23]: Torch，前称TorchSpigot，是一个支持1.8.8的优化核心，是Akarin服务端的前身。由于在部分代码和统计系统上，Akarin仍使用*"Torch"*表示Akarin服务端，因此这里同时将Torch写上
[^24]: 自1.14开始，Akarin开始使用*Tuinity*作为其项目前置，而不是原来的*Paper*，同时因此该服务端对不同API的插件兼容性需注意使用的服务端版本


如果你看到了这里，那么恭喜你，你已经结束了所有**主流**BukkitAPI系服务端的介绍，接下来是一些搭载ForgeAPI或FabricAPI的模组服务端，两个基于SpongeAPI的服务端和两个魔怔猎奇基于其他API的服务端介绍，如果你不需要了解这些，请直接跳到下一节。


7.VanillaForge
  让我们把视线调转回刚开始的Vanilla，如果说Bukkit让修改服务端变成了可能，那么就一定有一个技术能够让修改客户端变为可能，那么这个可能就是Forge。
  VanillaForge则是一个Vanilla+ForgeAPI的服务端，他允许你像服务端安装ForgeMod，处理自定义物品，自定义方块，自定义实体操作。

  VanillaForge 有如下的属性:

  - 基于Vanilla
  - **不可以** 安装基于任何API的插件
  - **可以** 安装基于ForgeAPI的模组
  - 稳定性较好
  - 性能较差
  - 可插拔性强，易于更新[^25]


  下载VanillaForge:

    1. 前往Forge官网下载Forge Installer，并选择install server模式，将安装目录指向运行过一次的Vanilla服务端: http://files.minecraftforge.net/

[^25]: 为什么要可以强调“可插拔性强，易于更新”呢，因为后面你将会看到，所有BukkitAPI+ForgeAPI的服务端（甚至Sponge系服务端)都需要糅合自己的API和ForgeAPI的代码，这导致Forge的部分代码和库是强制写死在服务端上的，你不能手动更新Forge版本。但VanillaForge只支持ForgeAPI，因此没有这个问题


*8.Cauldron/MCPC+*
  “但是老弟你看，你这个逻辑有问题啊，我是可以加Forge模组了，但我还想加Bukkit插件啊，你那个VanillaForge什么的搞不了插件啊”
      —— 选自 刘慈欣《三体》 我也不知道在哪反正我就是想学大史说话 页
    不管大史究竟有没有说过这话，但是这确实是一个问题——那么究竟有没有能同时兼容BukkitAPI和ForgeAPI的服务端呢?
    答案是当然，最初搞出来这个玩意的服务端叫做MCPC+，自1.7.10起改名为Cauldron。
    但是很遗憾，因为糅合代码是个技术活，而且你也看到了，“糅合”，这是不符合Mojang EULA和DMCA规定的，因此Cauldron自1.7.10起停更，不再支持后面的版本。
    同时你也将看到，由于“糅合”的复杂性和难以维护性，因此每一个BukkitAPI+ForgeAPI服务端几乎都只维护一个主流版本，这也是此类服务端遍地开花的一个主要原因。

    Cauldron 有如下的属性:
    - 已停更
    - 基于Spigot
    - **可以** 安装基于BukkitAPI,SpigotAPI的插件
    - **可以** 安装基于ForgeAPI的模组
    - 支持至最高1.7.10


*为什么不推荐?:同CraftBukkit一样，Cauldron也已然成为了一个时代的奠基人和里程碑，其原始的完整代码仓库现在甚至无法被找到，我们也只能在各式各样的第三方构建站看到他的身影。只闻其声，不闻其形。*


  下载Cauldron:

    1. 前往第三方构建站下载


9.KCauldron
  KCauldron是Cauldron的优化版/继承。

  KCauldron 有如下的属性:   

  - 已停更
  - 基于Cauldron
  - **可以** 安装基于BukkitAPI,SpigotAPI的插件
  - **可以** 安装基于ForgeAPI的模组
  - 仅支持1.7.10


  下载KCauldron:
    1.前往第三方构建站下载


10.Thermos
  Thermos是KCauldron的优化版。

  Thermos 有如下的属性:

  - 已停更
  - 基于KCauldron
  - **可以** 安装基于BukkitAPI,SpigotAPI的插件
  - **可以** 安装基于ForgeAPI的模组
  - 仅支持1.7.10


  下载Thermos:

    1. Github Releases: https://github.com/CyberdyneCC/Thermos/releases


11.Contigo
  Contigo是Thermos的优化版/继承。

  Contigo 有如下的属性:

  - 已停更
  - 基于Thermos
  - **可以** 安装基于BukkitAPI,SpigotAPI的插件
  - **可以** 安装基于ForgeAPI的模组
  - 仅支持1.7.10


  下载Contigo:

    1. Github Releases: https://github.com/djoveryde/Contigo/releases


12.Uranium
  Uranium是一款基于KCauldron的BukkitAPI+ForgeAPI服务端，其整合了部分Thermos对服务端的修复，同时进行了一些输入书与笔虚体问题的BUG修复。其最大的特点[^26]是强制使用UTF-8编码作为配置文件编码[^27]和通过UraniumPlus Mod令1.7.10客户端支持Title和Actionbar[^28]。

  Uranium 有如下的属性:

  - 基于KCauldron
  - **可以** 安装基于BukkitAPI,SpigotAPI的插件
  - **可以** 安装基于ForgeAPI的模组
  - 仅支持1.7.10


  下载Uranium:

    1. Jenkins CI: https://ci.uraniummc.cc/job/Uranium-dev/

[^26]: 仅代表个人观点
[^27]: 事实上，我们看到的所有文本，其内容都是经过编码存储在计算机上的，对于Minecraft服务端来说，在1.7.10-版本，Windows使用ANSI编码，而Linux使用UTF-8编码，这引起了诸多不便，因此Uranium强制在所有操作系统上运行该服务端，文件编码均为UTF-8，简化了使用流程
[^28]: Title是自1.8引入的，在客户端上显示大标题和副标题的功能;Actionbar是自1.8引入的，在客户端物品栏上方显示字幕的功能


**13.CatServer**
  此时聪明的网友已经发现了一个问题:怎么上面的BukkitAPI+ForgeAPI服务端都只支持1.7.10啊，有没有支持高版本的?
  答案很显然是肯定的，CatServer就是在那样的大环境下诞生的服务端，他支持1.12.2的BukkitAPI+ForgeAPI，发展至今已十分稳定，同时也拥有独特的优化和BUG修复。

  CatServer 有如下的属性:

  - 基于Spigot
  - **可以** 安装基于BukkitAPI,SpigotAPI的插件
  - **可以** 安装基于ForgeAPI的模组
  - 稳定性好
  - 性能较好
  - 更新较快
  - 仅支持1.12.2

*为什么推荐?:CatServer历经多年的打磨，其已经非常稳定，同时因为1.12.2版本从技术上讲依然是一个稳定的年轻版本，因此使用CatServer开Mod服或许是你的不二之选*
*又一个题外话:如果你刚入服主圈，那么你可能不知道，由于作为第一个支持高版本的BukkitAPI+ForgeAPI服务端，CatServer有过一段艰苦，黑暗的发展历史，从“抄袭风波”到收购风波，从付费风波再到“后门风波”，CatServer曾有过一段饱受诟病的日子，甚至还和下面某些服务端作者产生过争执......笔者作为那段时代的亲历者，只能用一句话来形容那时:
  “黑，真他妈的黑啊”*


  下载CatServer:

    1. Github Releases: https://github.com/Luohuayu/CatServer/releases

  下载CatServer-Async[^29]:

    1. Github Releases: https://github.com/Luohuayu/CatServer/releases/tag/Async-final

[^29]: 即CatServer的多线程版本，用开发者的话来说，“由于多线程版存在过多兼容性问题无法修复, 不再提供更新, 也不推荐使用.”，该版本最后停更于`Mar 19,2020`。本文笔者也不推荐使用此版本


14.Mohist(曾用名PFCraft)
  Mohist和下面的Magma一样，都有一点“另类”，他们本体基于Paper，而不是Spigot，这意味着这两个服务端不仅可以享受Paper带来的漏洞修复和优化，还可以让你轻松使用基于PaperAPI开发的插件。
  但这还没完，Mohist还支持控制台信息国际化[^30]，可选择服务端Mod语言[^31]，内置插件管理器[^32]，NMS向下兼容[^33]等等非常实用的功能！同时，其开发者正在开发的Mohist-BungeeCord可以让你在跨服使用Mohist时减少各种问题[^34]。
  但是很遗憾，由于Mohist本身工程量大难以维护，也由于Mohist开发组重组，近几个月内的Mohist稳定性并不是很好。

  Mohist 有如下的属性:

  - 基于Paper
  - **可以** 安装基于BukkitAPI,SpigotAPI,PaperAPI的插件
  - **可以** 安装基于ForgeAPI的模组
  - 稳定性较差
  - 性能较好
  - 更新较快
  - 控制台/模组本地化支持
  - 内置插件管理器
  - NMS向下兼容
  - 支持1.12.2,1.15.2[^35]


*说个题外话:笔者曾有幸参与了Mohist控制台信息的简体中文、繁体中文本地化工作，并亲眼见证了Mohist从使用高峰到现在的开发过程。Mohist的原开发者Mgazul是个好人，而且能在家庭条件十分有限的情况下，开发出Mohist并开源供大家使用，可以说是我们这个圈子的幸运。*


  下载Mohist-1.12.2:

    1. CodeMC Jenkins CI: https://ci.codemc.io/job/Mohist-Community/job/Mohist-1.12.2/

  下载Mohist-1.15.2:

    1. CodeMC Jenkins CI: https://ci.codemc.io/job/Mohist-Community/job/Mohist-1.15.2/


[^30]: 该功能会自动本地化控制台信息，为你展示你能看得懂文字(Mohist现支持简体中文和繁体中文的控制台本地化)，效果大约如下:

![Mohist-控制台本地化](https://i.loli.net/2019/05/25/5ce8f8ca8abef72303.png)

[^31]: 在一般服务端下，在服务端安装的Mod仅能限制默认的美式英文(en_US)本地化语言文本，这导致客户端无法按照本地语言显示文本，即使有汉化也没法看。但Mohist通过这项功能解决了这个问题
[^32]: 一般来说，服务端插件在服务器启动以后便不能，安装、卸载、更新，要想那么做，得先关闭服务器，这很耗时，插件管理器允许你通过执行指令，在服务器开启的情况下热配置插件。著名的插件管理器PlugMan和Yum两个插件，而Mohist自带了他们的部分功能
[^33]: NMS是指net.minecraft.server包，是Minecraft服务器底层的代码实现，在BukkitAPI没有包装对应方法的情况下，开发者需要调用NMS来实现内容。由于不同版本服务器的NMS包的包名也不同，因此一般开发者开发的这类插件只能兼容一个版本。Mohist可以使部分原仅兼容1.8-1.12间版本的此类插件兼容Mohist
[^34]: 有关BungeeCord等跨服代理的内容超出了本文的范围，故不多赘述
[^35]: 有消息称Mohist开发组正在研发/测试1.16.x版本的Mohist，且Mohist代码仓库中确实存在标签为"1.16.x"的代码分支(空仓库)


15.Magma
  Magma同样是一个基于Paper[^36]的BukkitAPI+ForgeAPI服务端。

  Magma 有如下的属性:

  - 基于Paper
  - **可以** 安装基于BukkitAPI,SpigotAPI,PaperAPI[^36]的插件
  - **可以** 安装基于ForgeAPI的模组
  - 稳定性较好
  - 性能较好
  - 更新较快
  - 支持1.12.2,1.15.2[^37]


  下载Magma-1.12.2:

    1. Github Releases: https://github.com/magmafoundation/Magma/releases (稳定版，请下载-server结尾的版本，-installer结尾的版本暂无法使用)
    2. Jenkins CI: https://ci.hexeption.dev/job/Magma%20Foundation/job/Magma/job/master/ (开发版)

  下载Magma-1.12.2-全Paper特性支持版:

    1. Jenkins CI: https://ci.hexeption.dev/job/Magma%20Foundation/job/Magma/job/feature%252Ffull-paper-support/ (开发版)

  下载Magma-1.15.2:

    1. Jenkins CI: https://ci.hexeption.dev/job/Magma%20Foundation/job/Magma-1.15.x/job/1.15.x/lastSuccessfulBuild/ (开发版)

[^36]: Magma的主要发行版本并未应用所有PaperAPI和Paper的补丁，这可能会带来一些问题
[^37]: 根据Magma项目说明，Magma尚在积极开发对1.16版本的支持，同时，Magma-1.15.2目前仅处于Beta测试版阶段，可能尚不稳定


16.Arclight
  Arclight是一款由 @海螺螺 开发的“在 Forge 上使用 Mixin 实现的 Bukkit 服务端”，提供了1.14.4和1.15.2两个高版本的BukkitAPI+ForgeAPI支持

  Arclight 有如下的属性:

  - 基于Spigot
  - **可以** 安装基于BukkitAPI,SpigotAPI的插件
  - **可以** 安装基于ForgeAPI的模组
  - 稳定性相对较好
  - 性能较好
  - 更新较快
  - 支持1.14.4,1.15.2


  下载Arclight(1.14.4,1.15.2):

    1. Github Releases: https://github.com/IzzelAliz/Arclight/releases
    2. AppVeyor CI: https://ci.appveyor.com/project/IzzelAliz/arclight/build/artifacts


如果你看到了这里，那么恭喜你已经结束了所有**主流**BukkitAPI+ForgeAPI服务端的学习，接下来是一些搭载FabricAPI的模组服务端，两个基于SpongeAPI的服务端和两个魔怔猎奇基于其他API的服务端介绍，如果你不需要了解这些，请直接跳到下一节。


17.SpongeVanilla&SpongeForge
  让我们再将目光转回CraftBukkit时期。一群人做出BukkitAPI以后，发现这个东西实在是太垃圾了:对Mod兼容性差，没有开发文档，代码规范随意，这不是他们想要的那个API。于是，一群人离开了Bukkit开发团队，转而开始制作他们心目中的那个完美的API框架——幸运的是，他们做出来了，这就是SpongeAPI和他的服务端实现:Sponge
  Sponge分为SpongeVanilla和SpongeForge两个版本:前者需要与Vanilla一起使用，他通过注入[^38]的方式，允许你在Vanilla服务端上安装基于SpongeAPI的插件；后者实现在Forge上，允许你在VanillaForge上安装基于SpongeAPI的插件（同时享受安装基于ForgeAPI的模组），需要提到的是，在SpongeForge中，其其实是作为一个**ForgeMod**来使用（即将其放入`.\mods`中并启动服务端），而非作为一个完整的服务端运行核心文件。
  很遗憾的是，由于生不逢时，Sponge并没有得到大多数开发者的支持，因此基于SpongeAPI开发的插件少之甚少，主流BukkitAPI插件迁移至SpongeAPI的更是屈指可数，因此对于普通服主来说，使用Sponge会导致在插件支持上落后于Bukkit使用者。
  同时，由于自1.13起，由于Minecraft源代码的大幅度改动导致ForgeAPI大幅度改动其代码，致使Sponge始终难以兼容1.13+版本，直到最近才发布了对*1.14.4*版本的支持

  SpongeVanilla 有如下属性:

  - **可以** 安装基于Sponge的插件
  - **不可以** 安装基于任何API的模组
  - 性能相对很好
  - 更新较快
  - 稳定性很好
  - 社区支持友好
  - 插件生态较差
  - 支持至最高1.14.4


    SpongeForge 有如下属性:

  - 基于ForgeAPI
  - **可以** 安装基于SpongeAPI的插件
  - **可以** 安装基于ForgeAPI的模组  
  - 性能相对很好
  - 更新较快
  - 稳定性很好
  - 社区支持友好
  - 插件生态较差
  - 对模组兼容性极佳
  - 支持至最高1.14.4


  下载SpongeVanilla:

    1. SpongePowered官方: https://www.spongepowered.org/downloads/spongevanilla/stable/

  下载SpongeForge: 

    1. SpongePowered官方: https://www.spongepowered.org/downloads/spongeforge/stable/

*题外话:曾经有一段时间，Sponge是市面上唯一一个支持1.8+高版本插件+模组的服务端，当Bukkit阵营始终停留在1.7.10时，已经支持之1.12.2的Sponge收到了大部分神奇宝贝服服主的欢迎——直到CatServer的发布*

[^38]: 是一种将自定义代码导入到已有的计算机程序内，从而改变原程序的行为的行为


18.VanillaFabric
  前面我们提到了`由于自1.13起，Minecraft源代码的大幅度改动`，这导致了CraftBukkit/Spigot，Sponge，Forge等项目分别出现了时常不同的窗口期，这段时间内这些项目都没有发布对新版本的支持。Sponge最为严重，直至今日还未发布对1.13版本的支持，其次是Forge，直至Minecraft发布1.14版本Forge都没有发布甚至是一个预览版本的Forge1.13，且当后来Forge1.13(.2)终于发布后，直至今日，Forge1.13(.2)都未发布一个稳定版。
  回归原题，在这段长达半年的窗口期中，涌现了几个新的ModAPI，抛去因为夹带私货和停止支持的RiftAPI，便只剩下了在当时乃至现在最流行的新生代ModAPI——Fabric[^39]
  Fabric和Rift不同，他不是在那段窗口期诞生的替代产品，他早自1.12时代就已出现，只不过和Sponge一样同样生不逢时，虽然设计先进，但大多数开发者当时依然只依赖于Forge开发模组而不是Fabric，知道窗口期的来临，Fabric才得以重获新生，得到了一部分开发者的支持[^40]。
  Fabric是**模块化**[^41]的，这意味着他不想高耦合的Forge，每次Minecraft源代码更新就要折腾一阵子推倒重来，他完全可以拆出不兼容的模块，并更换上兼容新版本的模块以快速发布更新，这也是Fabric甚至有针对每一个Minecraft预览版(Snapshot)的支持的原因。
  VanillaFabric则和VanillaForge类似，是基于Vanilla的实现了FabricAPI支持的服务端，他允许你安装FabricMod。

  VanillaFabric 有以下属性:

  - 基于 Vanilla
  - **不可以** 安装基于任何 API 的插件
  - **可以** 安装基于 FabricAPI 的模组
  - 稳定性较好
  - 性能相对较好
  - 可插拔性强，易于更新


  下载VanillaFabric:

    1. 前往Fabric官网下载Fabric Installer，并选择install server模式，将安装目录指向运行过一次的Vanilla服务端: https://fabricmc.net/use/

[^39]: 此处很显然不严谨，Fabric本体是一个模组加载器（Mod Loader），不是一个ModAPI，Fabric的ModAPI是FabricAPI，但因为Fabric的模块化设计，FabricAPI作为FabricMod与Fabric本体（Fabric Loader）分离，不默认提供，因此FabricAPI又不能代表Fabric，故如此表示
[^40]: 虽然设计确实先进，但随着Forge发布对新版本的支持，Fabric又逐渐趋向没落，只留下来了一些或是小型的，或是客户端向模组的青睐，比如ReplayMod
[^41]: 是指将一整个代码项目设计成由多个互不相关又互相联系的模块，方便维护的代码设计模式


*19.Fukkit*
  Fukkit是一款实现了BukkitAPI+FabricAPI支持的服务端，现已停更归档，因此不多赘述，也不提供下载地址。


*为什么不推荐?:已归档，不稳定*


如果你看到了这里，那么恭喜你已经结束了所有**主流**服务端的介绍，接下来是两个*看看就好*的魔怔服务端的介绍，如果你不需要了解这些，请直接跳到下一节。


*20.Glowstone*
  如果你是个聪明人，你会发现上面的所有服务端都基于Mojang提供的官方服务端Vanilla，那么有没有不依赖于Vanilla的服务端呢，答案是有，这就是Glowstone。
  Glowstone完全不依赖任何Mojang的源码，因此他非常的自由，不会受到Mojang EULA和DMCA的管控。

  Glowstone 有如下属性:

  - 少更新
  - **可以** 安装基于BukkitAPI,SpigotAPI,PaperAPI,GlowstoneAPI的插件
  - **不可以** 安装基于任何API的模组
  - 稳定性不好 
  - 性能较好
  - 缺少很多原版内容
  - 缺少NMS支持
  - 仅支持1.12.2


*为什么不推荐?:由于Glowstone不基于Vanilla，所有Vanilla负责的游戏行为都由其自行处理，因此Vanilla提供的一些功能（比如NMS，一些游戏逻辑）未在Glowstone中提供，同时他也不支持OBC[^42]，这会导致一些基于NMS的插件无法在Glowstone运行，因此对于绝大多数服主都不友好，故不推荐使用*


  下载Glowstone:

    1. Glowstone官方: https://glowstone.net/#downloads

[^42]: （谁起的怪名字根本没听过）即`org.bukkit.craftbukkit`包，某些Bukkit插件需要使用该包内提供的代码具体实现


*21.Cuberite*
  如果你还是个聪明人，你会发现上面所有的服务端都基于Java开发，那么有没有不基于Java的服务端呢，答案是依然有，这就是Cuberite。
  Cuberite同样完全不依赖任何Mojang的源码，因此他非常的自由，不会受到Mojang EULA和DMCA的管控。
  而且，Cuberite支持跨版本运行，1.8-1.12.2的客户端均能加入到你的Cuberite服务器中
  说起来你可能不信，Cuberite甚至还能在Android™️上运行。

  Cuberite 有如下属性:

  - 少更新
  - Android™️跨平台支持
  - **可以** 安装基于CuberiteAPI的插件
  - **不可以** 安装基于任何API的模组
  - 稳定性不好 
  - 性能较好
  - 缺少很多原版内容
  - 缺少NMS支持
  - 同时支持1.8-1.12.2[^43]

*为什么不推荐?:一个由C++制作的服务端虽然可以通过内存管理在理论上无限调优性能，但他不基于Vanilla，甚至不基于Minecraft的开发语言——Java，这导致了一系列兼容问题，因此不推荐使用*

  下载Cuberite:

    1. Cuberite官方: https://cuberite.org/


[^43]: 来自其官网说明，但根据其开源项目提交日志，Cuberite应已支持1.14版本的连接，并正在尝试对1.15的特性进行兼容


最后，以上服务端的迭代关系大致如下:
![anMron.png](https://s1.ax1x.com/2020/07/30/anMron.png)


至此，你已经完成第一节的所有学习，并基本了解了所有主流服务端以及其迭代关系


# 二.服务端核心的安装与使用

由于篇幅原因，本节仅介绍上文中**非不推荐**核心的安装和使用方式，其他服务端的安装方式请自行查阅文档或自行探索

## 安装Java

### 确定操作系统架构

  对于新手来说，下载了不适合与自己服务器/计算机的操作系统的Java是非常难过的，为了最大化利用计算机性能，一般情况下服主们都会为服务端设置最大内存，但因为支持x86架构（32位系统）的Java最大只能为服务端分配1024MB的内存，超出这个数值会导致无法开服。只有支持x86_64架构（64位系统）的Java才能支持更大的最大内存。
  对于Windows操作系统（家用操作系统），请右击您桌面上的`计算机/此电脑`(Win7,Win8,Win8.1,Win10)图标，选择`属性`，查看操作系统为32位还是64位;如果您没有看到以上图标，而是看到了`我的电脑`(WinXP)，那么您的操作系统一般应为32位。
  对于Windows操作系统（服务器），您可通过服务器管理器或是通过其他方式查看您的操作系统架构

### 下载并安装Java8

  对于1.8+服务端，他们均需要Java8或以上版本[^44]以运行，因此您可前往[Java官方网站的下载页](https://www.java.com/zh_TW/download/manual.jsp)[^45]下载Java8的运行环境（JRE8）以支持启动您的服务端
  如果您是32位的Windows操作系统，请选择`Windows`栏目下的`Windows 離線`安装包;如果您是64位的Windows操作系统，请选择`Windows`栏目下的`Windows 離線（64位元）`;对于Mac OS X和Linux系统，请自行按照各自的档案类型下载对应的安装包。
  下载完成后，请自行打开文件进行安装操作。

### 下载并安装Java7

  对于1.7.10或更低版本的服务端，您可能需要下载已不受支持的Java7以运行。您需要前往[Oracle官网](https://www.oracle.com/java/technologies/javase/javase7-archive-downloads.html)下载已被归档的Java7。
  您需要前往该网站下方的`Java SE Runtime Environment 7u80`下载Java运行环境，而非下载上方的`Java SE Development Kit 7u80`Java开发工具包。
  如果您是32位的Windows操作系统，请选择`Windows x86`安装包;如果您是64位的Windows操作系统，请选择`Windows x64`;对于Mac OS X和Linux系统，请自行按照各自的档案类型下载对应的安装包。
  您可能需要注册并登录Oracle账号以下载Java7。
  下载完成后，请自行打开文件进行安装操作。

### 关于OpenJ9

  有一种非官方的JVM[^46]实现，他的名字叫做OpenJ9，其以`高性能，可拓展`著称，此处我们不介绍OpenJ9的详细安装方式，但有需要的服主可前往[AdoptOpenJDK](https://adoptopenjdk.net/)网站了解并下载OpenJ9 JVM

[^44]: Minecraft使用的开发环境也是Java8，且截止目前，Java8仍然是Oracle公司指定的长期支持版本，因此使用Java8十分稳定
[^45]: 此处提供了繁体中文版的`下載適用於所有作業系統的 Java`界面，简体中文版的界面因)为不明原因长期无法连接
[^46]: 指Java虚拟机，运行Java应用程序的中间人

## 安装服务端

此处我们已假设您已正确安装Java运行环境（JRE）并已完成您所需要的服务端核心的下载
为了方便和美观起见，您应当创建一个新的文件夹，并放入您的服务端核心，以此文件夹作为根目录开始您的开服旅程

### 适用于Vanilla,CraftBukkit,Spigot的安装和使用教程

    1. 对于Windows用户，您可通过直接双击`minecraft_server_1.x.x.jar`运行服务端，当服务器完全就绪[^47]后即可通过默认的连接地址[^48]连接到服务器。
    2. 对于希望使用CMD控制台的Windows用户来说，您可通过`Shift+右键`在服务端根目录启动命令行，或是直接创建一个以.bat结尾的批处理文件，并写入:

```cmd
@echo off
java -Xmx1024M -jar minecraft_server_1.x.x.jar -nogui
pause
```

  其中的`-Xmx1024M`用于指定最大内存，您可将`1024M`更换为您需要指定的最大内存，例如`-Xmx2048M`，`-Xmx4G`。
  核心名称中的1.x.x代表你的服务器版本

    3. 对于Linux用户，您可通过`cd`指令进入服务端根目录，或是直接在服务端根目录创建一个以.sh结尾的Linux shell文件，并写入

```shell
java -Xmx1024M -jar .\minecraft_server_1.x.x.jar -nogui
```

  其中，你应将`java`替换为`"您的Java JRE存放位置\bin\java.exe"`


  自1.8起，当你第一次启动服务端时，服务器会先在根目录生成一个`eula.txt`，随后服务器会自动关闭。
  请打开`eula.txt`，届时您会看到这样的文字：

```yaml
#By changing the setting below to TRUE you are indicating your agreement to our EULA (https://account.mojang.com/documents/minecraft_eula).
#Fri Jul 31 12:26:16 CST 2020
eula=false
```


请将其中的`eula=false`修改为`eula=true`[^49]，然后重新启动服务器，服务器才会正式启动。
  最后，您可通过在控制台[^50]内输入stop或在游戏内输入/stop关闭服务器。

[^47]: 一般来说，服务端完全就绪的标志是一段以`Done!`开头的句子，但是有的服务端插件可能因为完全就绪后要发送检查更新报告等信息，这段话很容易被忽略，因此您可尝试通过试探性的输入一段存在或不存在的指令，如果控制台反馈了该指令的帮助或是提示类似于`Unknown Command. Type /help or ? for help.`的未知指令信息，那么大致可认定为服务端已就绪
[^48]: 默认连接地址为`你的IP地址:25565`，通过本地连接可使用`localhost:25565`，如果您的服务商为您设置了指定端口访问或您只是想单纯不用`25565`这个端口，那么您可参见下一节设置服务端端口
[^49]: `false`和`true`是布尔值，他们分别代表`假`(否)和`真`(是)。设置`eula=true`即代表您同意Minecraft的最终用户许可协议(EULA)和Minecraft商业化使用条例，您可在[这里](https://account.mojang.com/documents/minecraft_eula)详细阅读Minecraft EULA
[^50]: 我们把那个能够执行指令，输出服务器后台信息的窗口叫作控制台

### 适用于Paper,Tuinity,Akarin的安装和使用教程

  基本同上，只需将核心名称替换为你的核心名称即可。但请注意，`Paper,Tuinity,Akarin`等衍生于Paper的核心第一次启动都需要下Vanilla文件以完成打补丁操作，对于某些网络不稳定的地方，你可能会一直卡在`Downloading cache`上。对于这种问题，你可以通过上方提供的或其他渠道先下载对应版本的Vanilla，然后将核心改名为`mojang_1.x.x.jar`(1.x.x代表你的服务器版本)，放入`·\cache`文件夹内，开启服务器即可开始打补丁操作

### 适用于VanillaForge,VanillaFabric的安装和使用教程

  请先按照第一则教程安装并完全启动一次Vanilla，随后关闭服务端。
  打开Forge或Fabric的安装器，选择`install server`，并将目录选择至服务器根目录，点击`安装(install)`，在自动下载libraries(需保持网络畅通，不然可能会导致下载失败)完成后，ForgeVanilla或FabricVanilla的核心便会出现在根目录上，此时将启动参数的jar指向新的核心，即可开始开服。

### 适用于SpongeVanilla的安装和使用教程

  与第一则教程相同，只需将核心名称替换为你的核心名称即可。请注意Forge的版本必须于SpongeVanilla下载页上标注的Forge版本相同，否则可能会引发兼容性问题。

### 适用于SpongeForge的安装和使用教程

  请先按照第三则教程安装并完全启动一次与SpongeForge下载页上标注的Forge版本相同的VanillaForge，随后关闭服务端。
  将SpongeForge的jar文件**直接拖入**`.\mods`文件夹，之后启动服务器即可开服[^51]。

[^51]: 您可通过在控制台输入`/sponge plugins`查看是否有反馈以确认Sponge是否正常安装至VanillaForge

### 适用于Thermos,Contigo的安装和使用教程

  请在下载这两种服务端核心时注意需要同时下载`libraries.zip`[^52]。
  将您下载到的`libraries.zip`内的`libraries`文件夹(包括文件夹)解压至服务端根目录，然后按照第一则教程的启动方式启动服务器。

[^52]: 需要注意的是，Thermos提供了两个版本的核心，分别对应着包含了稳定版本(文件名中包含`-1558`，代表`Forge1.7.10 - 10.13.4.1558`)和最新版本(文件名中包含`-1614`，代表`Forge1.7.10 - 10.13.4.1614`)的Forge1.7.10。对于现在来说，我们只需直接选择使用`Forge1.7.10 - 10.13.4.1614`的最新版本即可。

### 适用于Uranium的安装和使用教程

  基本同上一则教程，前往下载核心时请下载结尾为`-server`的jar，下载libraries时请下载[#271构建打包的libraries](https://ci.uraniummc.cc/job/Uranium-dev/271/artifact/build/distributions/Uranium-1710-dev-5-B271-31d6587-libraries.zip)。
  对于使用显示Title和Actionbar的功能，请自行前往[此处](https://github.com/UraniumMC/UraniumPlus/releases/tag/v1.1)下载UraniumPlus，并将其作为mod安装至客户端(`.minecraft\mods`)和服务端(`.\mods`)。

### 适用于CatServer/Mohist/Magma/Arclight的安装和使用教程

   基本同第一则教程。运行所需的Libraries应当会自动被下载。

至此，你已经完成第二节的所有学习，并应已经启动过一次服务器并通过`stop`指令安全的关闭服务器。


# 三.服务端核心的配置

由于篇幅原因，本节仅介绍**Spigot**核心的**主要**配置文件的**主要**配置项

本配置对应的服务器版本为`1.16.1`

## on `server.properties`

```properties
#Minecraft server properties
#Fri Jul 31 12:30:46 CST 2020
spawn-protection=16
max-tick-time=60000
query.port=25565
generator-settings=
sync-chunk-writes=true
force-gamemode=false
allow-nether=true
enforce-whitelist=false
gamemode=survival
broadcast-console-to-ops=true
enable-query=false
player-idle-timeout=0
difficulty=easy
spawn-monsters=true
broadcast-rcon-to-ops=true
op-permission-level=4
pvp=true
entity-broadcast-range-percentage=100
snooper-enabled=true
level-type=default
hardcore=false
enable-status=true
enable-command-block=false
max-players=20
network-compression-threshold=256
resource-pack-sha1=
max-world-size=29999984
function-permission-level=2
rcon.port=25575
server-port=25565
debug=false
server-ip=
spawn-npcs=true
allow-flight=false
level-name=world
view-distance=10
resource-pack=
spawn-animals=true
white-list=false
rcon.password=
generate-structures=true
max-build-height=256
online-mode=true
level-seed=
use-native-transport=true
prevent-proxy-connections=false
enable-jmx-monitoring=false
enable-rcon=false
motd=A Minecraft Server
```

`online-mode=true` 表示是否启用正版验证，默认值为开启。设置为开启即**代表只有Minecraft正版玩家才能连接到您的服务器**，一般的“盗版服”均需要将此处设置为关闭

`spawn-protection=16` 表示出生点保护边长[^53]，默认值为`16`。**在该范围内的所有方块将会被禁止交互（如破坏，放置，触发插件监听[^54]）**。设置为0即代表关闭出生点保护

`sync-chunk-writes=false` 自1.16加入，表示是否开启**同步**区块读写，默认为关闭[^55]。将此项目关闭即代表开启异步区块读写，可以加快区块加载速度，但有很大几率导致区块数据损坏[^56]。

`force-gamemode=false` 表示是否强制游戏模式，默认为关闭。开启后每当玩家重新加入服务器都会自动将玩家的游戏模式设置为默认的游戏模式。

`allow-nether=true` 表示是否生成地狱，默认为开启。关闭后地狱世界将不会被生成和加载，玩家也不能进入地狱。

`gamemode=survival` 表示默认游戏模式，默认为`survival`（生存模式）。玩家第一次进入服务器的时候便会被设置成此游戏模式。可选的游戏模式还有`creative`（创造模式），`adventure`（冒险模式），`spectator`（观察模式）[^57]

`player-idle-timeout=0` 表示玩家AFK踢出时间，单位为分钟，默认为0，代表关闭。设置为非0自然数即代表当玩家超过X分钟没有进行任何活动时，他将会被自动踢出服务器

`difficulty=easy `表示游戏难度，默认为`easy`（简单）。可选的游戏难度还有`peaceful`（和平），`normal`（简单），`hard`（困难）[^58]

`spawn-npcs=true` 表示是否生成NPC，默认为开启。关闭后将不会自然生成诸如村民这样的NPC生物

`spawn-animals=true` 表示是否生成动物，默认为开启。关闭后将不会自然生成动物

`spawn-monsters=true` 表示是否生成怪物，默认为开启。关闭后将不会自然生成怪物

`generate-structures=true` 表示是否生成结构，默认为开器。关闭后将不会在地图中生成诸如沙漠神庙，废弃矿道这样的结构

`op-permission-level=4` 表示默认OP权限，默认为4。代表了当你使用`/op`命令时OP的默认权限等级[^60]。设置为1即代表OP仅能绕过出生点保护限制；设置为2即代表OP可以使用单人模式作弊指令（比如`/execute`）；设置为3即代表OP可以使用多人游戏作弊指令（比如`/ban`）；设置为4即代表OP可以使用所有指令，包括`/stop`,`/save-all`,`/save-on`,`/save-off`

`pvp=true` 表示是否允许PVP，默认为开启。设置为关闭玩家与玩家便无法相互攻击

`level-type=default` 表示主世界类型，默认为默认。设置为`flat`即代表超平坦

`hardcore=false` 表示是否开启极限模式，默认为关闭。开启后当玩家死亡便会被服务器自动封禁

`enable-status=true`  自1.16加入，表示是否在服务器列表中显示为在线，默认为开启。关闭后客户端的服务器列表中将将此服务器显示为**离线**，但玩家仍可连接到服务器

`enable-command-block=false` 表示是否启用命令方块，默认为关闭。开启后才可以使用命令方块

`max-players=20` 表示最大玩家数，默认为20。表示了该服务器能够容纳的同时在线玩家数

`resource-pack=` 表示资源包地址，默认为空。在此处填写直链[^61]后玩家进服便可以选择是否安装资源包

`server-port=25565` 表示服务器端口号，默认为25565

`allow-flight=false` 表示是否允许玩家飞行，默认为关闭。开启后服务端自带的反作弊系统将不会拦截并踢出使用飞行作弊的玩家[^62]

`view-distance=10` 表示服务器最大视距，默认为10，允许的值为3-32。

`level-seed=` 表示地图种子号，默认为空

`prevent-proxy-connections=false` 表示是否阻止代理连接，默认为关闭。开启后服务端将会尽可能的禁止被判定为使用代理的连接

`motd=A Minecraft Server` 表示服务器标语，默认为`A Minecraft Server`。代表了玩家在多人游戏列表上看到的服务器标语，您可以使用`\u00A7`表示分节符表示创建颜色代码，使用\n表示换行

`white-list=false` 表示是否启用白名单，默认为关闭。开启后只有在服务器白名单内的玩家才能进入服务器，您可通过`/whitelist`指令管理您的白名单

`enforce-whitelist=false` 表示是否强制踢出非白名单玩家，默认为关闭。开启后当你在服务器运行中通过`/whitelist on`指令手动开启白名单后，未处于白名单内的在线玩家将会被踢出



有关server.properties的更多信息请见https://minecraft.gamepedia.com/Server.properties

[^53]: 边长的计算公式为2x+1，如设置为1则代表将会以出生点为中心3x3边长的出生点
[^54]: 某些插件可能会通过让你右键/左键某个方块触发特定的行为，比如右键木牌加入起床战争小游戏，当这样的方块位于出生点保护半径内时，行为将不会被触发
[^55]: 此项目在Windows操作系统上默认为开启
[^56]: Mojang代码力太弱了就是调不好异步区块读写
[^57]: 在1.12.2-版本中，这项设置的默认值为0，代表生存模式。而`1`，`2`，`3`分别代表创造模式，冒险模式，观察模式
[^58]: 在1.12.2-版本中，这项设置的默认值为1，代表简单，而0，2，3分别嗲表和平，简单，困难
[^59]: 只代表不会自然生成怪物，刷怪笼依然能生成怪物
[^60]: 您可以前往ops.json手动指定这些OP的权限等级
[^61]: 指一个直接指向资源包文件，能够直接下载的网络地址，例如`https://www.excample.com/resourcepack.zip`
[^62]: 笔者建议服主们开启这一项，因为这个自带的反飞行在笔者的服务器中从来没有拦截过一次开飞行作弊的人，倒是用飞行背包的几个玩家被服务端认定为飞行给踢出去了

## on `bukkit.yml`[^63]

```yaml
# This is the main configuration file for Bukkit.
# As you can see, there's actually not that much to configure without any plugins.
# For a reference for any variable inside this file, check out the Bukkit Wiki at
# https://www.spigotmc.org/go/bukkit-yml
# 
# If you need help on this file, feel free to join us on irc or leave a message
# on the forums asking for advice.
# 
# IRC: #spigot @ irc.spi.gt
#    (If this means nothing to you, just go to https://www.spigotmc.org/go/irc )
# Forums: https://www.spigotmc.org/
# Bug tracker: https://www.spigotmc.org/go/bugs


settings:
  allow-end: true
  warn-on-overload: true
  permissions-file: permissions.yml
  update-folder: update
  plugin-profiling: false
  connection-throttle: 4000
  query-plugins: true
  deprecated-verbose: default
  shutdown-message: Server closed
  minimum-api: none
spawn-limits:
  monsters: 70
  animals: 10
  water-animals: 15
  water-ambient: 20
  ambient: 15
chunk-gc:
  period-in-ticks: 600
ticks-per:
  animal-spawns: 400
  monster-spawns: 1
  water-spawns: 1
  water-ambient-spawns: 1
  ambient-spawns: 1
  autosave: 6000
aliases: now-in-commands.yml

```

`allow-end: true` 表示是否生成末地，默认为开启。关闭后末地世界将不会被生成和加载，玩家也不能进入末地。

`warn-on-overload: true` 表示是否提示服务器过载，默认为开启

`spawn-limits:` 表示每个世界能够生成的最大生物多少。下方分别表示了怪物，动物，水生动物，水生环境生物和环境生物的最大自然生成数

`ticks-per:` 表示每多少Tick[^64]能够生成一个生物。除和上方相同的项目外，`autosave`代表了地图自动保存的时间



有关bukkit.yml的更多信息请见https://bukkit.gamepedia.com/Bukkit.yml[^65]


[^63]: 此处使用了一种和上面的`server.properties`完全不同的文件格式，名为`YAML`，文件名一般以`.yml`结尾。在Bukkit系服务端中，我们会经常见到此种文件格式，因此，您需要熟悉这种文件格式以编辑更多的文件
[^64]: Minecraft以滴答(tick)为服务器计时，一般情况下，1tick等于1/20秒，当服务器TPS下降时，这一秒数将可能变大
[^65]: 此处的信息可能极度滞后，请辨别查看

## on `spigot.yml`

```yaml
# This is the main configuration file for Spigot.
# As you can see, there's tons to configure. Some options may impact gameplay, so use
# with caution, and make sure you know what each option does before configuring.
# For a reference for any variable inside this file, check out the Spigot wiki at
# http://www.spigotmc.org/wiki/spigot-configuration/
# 
# If you need help with the configuration or have any questions related to Spigot,
# join us at the IRC or drop by our forums and leave a post.
# 
# IRC: #spigot @ irc.spi.gt ( http://www.spigotmc.org/pages/irc/ )
# Forums: http://www.spigotmc.org/

config-version: 12
settings:
  debug: false
  save-user-cache-on-stop-only: false
  moved-wrongly-threshold: 0.0625
  log-villager-deaths: true
  bungeecord: false
  timeout-time: 60
  restart-on-crash: true
  restart-script: ./start.sh
  moved-too-quickly-multiplier: 10.0
  sample-count: 12
  player-shuffle: 0
  user-cache-size: 1000
  netty-threads: 4
  attribute:
    maxHealth:
      max: 2048.0
    movementSpeed:
      max: 2048.0
    attackDamage:
      max: 2048.0
messages:
  whitelist: You are not whitelisted on this server!
  unknown-command: Unknown command. Type "/help" for help.
  server-full: The server is full!
  outdated-client: Outdated client! Please use {0}
  outdated-server: Outdated server! I'm still on {0}
  restart: Server is restarting
commands:
  silent-commandblock-console: false
  log: true
  tab-complete: 0
  send-namespaced: true
  spam-exclusions:
  - /skill
  replace-commands:
  - setblock
  - summon
  - testforblock
  - tellraw
advancements:
  disable-saving: false
  disabled:
  - minecraft:story/disabled
stats:
  disable-saving: false
  forced-stats: {}
world-settings:
  default:
    verbose: true
    enable-zombie-pigmen-portal-spawns: true
    item-despawn-rate: 6000
    view-distance: default
    wither-spawn-sound-radius: 0
    hanging-tick-frequency: 100
    end-portal-sound-radius: 0
    arrow-despawn-rate: 1200
    trident-despawn-rate: 1200
    zombie-aggressive-towards-villager: true
    nerf-spawner-mobs: false
    dragon-death-sound-radius: 0
    seed-village: 10387312
    seed-desert: 14357617
    seed-igloo: 14357618
    seed-jungle: 14357619
    seed-swamp: 14357620
    seed-monument: 10387313
    seed-shipwreck: 165745295
    seed-ocean: 14357621
    seed-outpost: 165745296
    seed-endcity: 10387313
    seed-slime: 987234911
    seed-bastion: 30084232
    seed-fortress: 30084232
    seed-mansion: 10387319
    seed-fossil: 14357921
    seed-portal: 34222645
    mob-spawn-range: 6
    max-tnt-per-tick: 100
    hopper-amount: 1
    entity-tracking-range:
      players: 48
      animals: 48
      monsters: 48
      misc: 32
      other: 64
    merge-radius:
      item: 2.5
      exp: 3.0
    growth:
      cactus-modifier: 100
      cane-modifier: 100
      melon-modifier: 100
      mushroom-modifier: 100
      pumpkin-modifier: 100
      sapling-modifier: 100
      beetroot-modifier: 100
      carrot-modifier: 100
      potato-modifier: 100
      wheat-modifier: 100
      netherwart-modifier: 100
      vine-modifier: 100
      cocoa-modifier: 100
      bamboo-modifier: 100
      sweetberry-modifier: 100
      kelp-modifier: 100
    entity-activation-range:
      animals: 32
      monsters: 32
      raiders: 48
      misc: 16
      tick-inactive-villagers: true
    hunger:
      jump-walk-exhaustion: 0.05
      jump-sprint-exhaustion: 0.2
      combat-exhaustion: 0.1
      regen-exhaustion: 6.0
      swim-multiplier: 0.01
      sprint-multiplier: 0.1
      other-multiplier: 0.0
    max-tick-time:
      tile: 50
      entity: 50
    squid-spawn-range:
      min: 45.0
    ticks-per:
      hopper-transfer: 8
      hopper-check: 1

```

`spigot.yml`中与`bukkit.yml`可能会有部分选项有所冲突，此时请以spigot.yml为准

有关spigot.yml的更多信息请见https://www.spigotmc.org/wiki/spigot-configuration/

## For Sponge

  SpongePowered团队为Sponge提供了非常详细的入门教程和配置文件示意，且文档支持简体中文，您可以直接前往SpongePowered的[SpongeDocumentation](https://docs.spongepowered.org/stable/zh-CN/)了解更多Sponge的入门知识

至此，你已经完成第三节的所有学习，并应已掌握部分服务端的配置。

# 四.插件和模组的下载与使用

## 对于Bukkit系服务端

### 下载插件

  您可前往以下网站获取兼容Bukkit系服务端的插件

1. [BukkitDev](https://dev.bukkit.org/bukkit-plugins)（英文） ——Bukkit论坛下属的一个插件发布平台，很多老牌Bukkit插件都在此处发布

2. [SpigotMC Forum](https://www.spigotmc.org/resources/)（英文）——SpigotMC团队管理的论坛，现在大部分Bukkit插件都在此处发布
3. [PaperMC Forum](https://papermc.io/forums/c/plugin-releases/paper)（英文）——PaperMC团队管理的论坛，一小部分只兼容PaperAPI的插件会在此处发布

4. [MCBBS](https://www.mcbbs.net/forum-servermod-1.html)（中文）——国内著名MC交流论坛，拥有一部分优秀的国人原创插件和搬运自国外的插件

### 安装插件

  将您下载到的以`.jar`结尾的插件放入`.\plugins`文件夹，重启服务器后即可加载。届时，您可通过输入`/plugins`指令查看插件安装状态。您可前往`.\plugins\插件名称`文件夹查看插件提供的配置文件（如果有）。

## 对于Sponge系服务端

### 下载插件

  您可前往以下网站获取兼容Sponge系服务端的插件

1. [SpongePowered Ore](https://ore.spongepowered.org/)（英文）——SpongePowered团队管理的一个插件发布平台，几乎所有的Sponge插件都会在此平台发布

2. [MCBBS](https://www.mcbbs.net/forum-servermod-1.html)（中文）——国内著名MC交流论坛，拥有一部分优秀的国人原创插件和搬运自国外的插件。对于Sponge，您可在服务端插件版中部的筛选栏中仅选择`Sponge`以过滤掉其他类型的插件

### 安装插件

  Sponge对插件兼容有严格的要求，请务必确保您的Sponge插件兼容您的Sponge服务端兼容的插件API版本（这些版本会在SpongePowered Ore上有显著声明，如`API7`，请在下载Sponge服务端时注意该服务端支持的API版本）

  将您下载到的以`.jar`结尾的插件放入`.\mods文件夹，重启服务器后即可加载。届时，您可通过输入`/sponge plugins`指令查看插件安装状态。您可前往`.\config\插件名称`文件夹查看插件提供的配置文件（如果有）。

## 对于搭载了ForgeAPI或是FabricAPI的模组服务端

### 下载模组

  您可前往以下网站获取兼容ForgeAPI或是FabricAPI的Mod

1. [CurseForge](https://www.curseforge.com/minecraft/modpacks)（英文）——国外著名游戏Mods和Addons发布平台，几乎所有模组都会在此平台发布
2. [MC百科](https://www.mcmod.cn)（中文）——国内著名Mod百科，包含了详细的Mod介绍

### 安装模组

  将您下载到的以`.jar`结尾的插件放入`.\mods文件夹，重启服务器后即可加载。您可前往`.\config`文件夹查看模组提供的配置文件（如果有）。

至此，你已经完成第四节的所有学习，并应已学会安装插件或模组

# X.一个真正的服主应该怎样定位错误

请记住一句话：**有报错看报错没报错先二分法确定问题**

待更新
