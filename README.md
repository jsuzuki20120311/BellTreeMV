# BellTreeMV

[![Code Climate](https://codeclimate.com/github/jsuzuki20120311/bell-tree-mv/badges/gpa.svg)](https://codeclimate.com/github/jsuzuki20120311/bell-tree-mv)

## 概要
クライアントサイドのMVCのうちMとVの枠組みを提供するライブラリです。
Modelのインスタンスに対し、Modelを監視するViewインスタンスを追加/削除できる機能を持ちます。
jQueryやunderscoreに依存していません。

## 使い方

### scriptタグを使用するの場合

```html
<script src="./js/BellTreeMV.js"></script>
```

### install
```sh
npm install bell-tree-mv --save
```

### require する場合

```javascript
var BellTreeMV = require('bell-tree-mv');
```


### Modelの定義方法

```javascript
/**
 * サンプルModel(ボタンが押された回数を保持するModel)
 */
var Counter = function () {
  'use strict';
  BellTreeMV.Model.call(this);
  this.state = {
    count: 0
  };
};
BellTreeMV.inheritPrototype(Counter.prototype, BellTreeMV.Model.prototype);
```

### Viewの定義方法

```javascript
/**
 * サンプルView(ボタンが押された回数を表示するView)
 */
var CounterView = function (element) {
	'use strict';
	BellTreeMV.View.call(this);
	this.element = element
};

BellTreeMV.inheritPrototype(CounterView.prototype, BellTreeMV.View.prototype);

CounterView.prototype.render = function (state) {
	'use strict';
	this.element.value = state.count;
};
```

### ModelとViewの関連付け

```javascript

// ModelとViewのインスタンスを作成
var counter = new Counter();
var counterView1 = new CounterView(document.getElementById('input_1'));
var counterView2 = new CounterView(document.getElementById('input_2'));

// ModelにViewを紐付ける
counter.addObserver(counterView1);
counter.addObserver(counterView2);

```

### Modelの更新

```javascript

document.getElementById('test_button').addEventListener('click', function () {
  'use strict';
  var updateValue = counter.getState('count') + 1;
  counter.setState({count: updateValue});
});

```
