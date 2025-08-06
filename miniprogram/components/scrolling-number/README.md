# 滚动数字组件 (Scrolling Number Component)

一个支持数字滚动动画效果的微信小程序组件，每位数字都可以独立滚动。

## 功能特性

- ✅ 支持任意位数的数字显示
- ✅ 每位数字独立滚动动画
- ✅ 可自定义动画时长和样式
- ✅ 支持波浪式滚动效果
- ✅ 响应式设计，适配不同屏幕

## 使用方法

### 1. 引入组件

在页面的 `index.json` 中引入组件：

```json
{
  "usingComponents": {
    "scrolling-number": "/components/scrolling-number/index"
  }
}
```

### 2. 在模板中使用

```html
<!-- 基础用法 -->
<scrolling-number number="{{123}}" />

<!-- 指定位数 -->
<scrolling-number number="{{42}}" digits="4" />

<!-- 自定义样式 -->
<scrolling-number 
  number="{{789}}" 
  fontSize="48" 
  color="#ff6b6b" 
  spacing="12"
  duration="1500"
/>
```

### 3. 在JavaScript中控制

```javascript
Page({
  data: {
    number: 123
  },
  
  updateNumber() {
    this.setData({
      number: Math.floor(Math.random() * 10000)
    });
  }
})
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| number | Number/String | 0 | 要显示的数字 |
| digits | Number | 0 | 数字位数，0表示自动计算 |
| duration | Number | 1000 | 滚动动画时长（毫秒） |
| fontSize | Number | 32 | 数字大小（rpx） |
| color | String | '#000000' | 数字颜色 |
| spacing | Number | 8 | 数字间距（rpx） |

## 示例效果

- **基础效果**: 数字从0滚动到目标值
- **波浪效果**: 每位数字依次开始滚动
- **自定义样式**: 支持字体大小、颜色、间距等自定义

## 注意事项

1. 组件会自动补齐指定位数，不足的用0填充
2. 动画时长建议设置在500-2000ms之间
3. 字体大小会影响滚动距离的计算
4. 组件支持数字的动态更新

## 更新日志

- v1.0.0: 初始版本，支持基础滚动功能 