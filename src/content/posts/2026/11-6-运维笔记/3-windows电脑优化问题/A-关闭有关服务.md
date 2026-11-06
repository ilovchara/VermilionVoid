---
title: 优化windows
published: 2026-11-06
description: "对于windows电脑的优化"
tags: [运维]
category: IT问题
draft: false
---



## 使用DG查看硬盘

有可能会出现转速损坏的情况

![img](https://picx.zhimg.com/v2-43f0e48a7f53ece4eb54e4bf08d46d17_r.jpg?source=1def8aca)

## 关闭服务遥测

关闭这个`Connected Used Experiences and Telemetry` 这个是windows检测本地数据的会造成数据的读取频繁

![image-20261015082347868](./A-关闭有关服务.assets/image-20261015082347868.png)

## 修复windows系统镜像

右键开始菜单 → Windows终端(管理员)

输入：

```shell
· sfc /scannow
· DISM /Online /Cleanup-Image /RestoreHealth
```

