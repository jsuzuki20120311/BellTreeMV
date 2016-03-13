// 名前空間
var BellTreeMV = BellTreeMV || {};


/**
 * prototypeを継承するための関数
 * @param {Object} childPrototype  
 * @param {Object} parentPrototype 
 */
BellTreeMV.inheritPrototype = function (childPrototype, parentPrototype) {
	var parentPrototypeCopy = Object.create(parentPrototype);
	for (property in parentPrototypeCopy) {
		if (!childPrototype.hasOwnProperty(property)) {
			childPrototype[property] = parentPrototypeCopy[property];
		}
	}
};


/**
 * オブザーバインタフェース
 * @throws {Error}
 */
BellTreeMV.Observer = function () {
	'use strict';
	if (!this.render) {
		throw new Error('Please implement render method.');
	}
};


/**
 * View基底クラス
 */
BellTreeMV.View = function () {
	'use strict';
	BellTreeMV.Observer.call(this);
};


/**
 * Subject(監視対象)クラス
 * @param {[[Type]]} state [[Description]]
 */
BellTreeMV.Subject = function (state) {
	'use strict';
	this.state = state || {};
	this.observerArray = [];
};


/**
 * オブザーバ(監視者)を追加するメソッド
 * @param {Observer} observer 
 */
BellTreeMV.Subject.prototype.addObserver = function (observer) {
	'use strict';
	this.observerArray.push(observer);
};


/**
 * オブザーバ(監視者)を削除するメソッド
 * @param {Observer} observer 
 */
BellTreeMV.Subject.prototype.removeObserver = function (observer) {
	'use strict';
	var targetIndex = this.observerArray.indexOf(observer);
	if (targetIndex >= 0) {
		this.observerArray.splice(targetIndex, 1);
	}
};


/**
 * オブザーバ全てに通知を行うメソッド
 * @param {Object} state         [[Description]]
 * @param {boolean} executeNotify [[Description]]
 */
BellTreeMV.Subject.prototype.notify = function (observer) {
	'use strict';
	var callBack = function (observer) {
		observer.render(this.state);
	};
	this.observerArray.forEach(callBack, this);
};


/**
 * 状態を取得します。
 * @param {[[Type]]} state         [[Description]]
 * @param {[[Type]]} executeNotify [[Description]]
 */
BellTreeMV.Subject.prototype.getState = function (key) {
	'use strict';
	if (typeof key === 'undefined') {
		return this.state;
	}
	return this.state[key];
};


/**
 * [[Description]]
 * @param {[[Type]]} state         [[Description]]
 * @param {[[Type]]} executeNotify [[Description]]
 */
BellTreeMV.Subject.prototype.setState = function (state, executeNotify) {
	'use strict';
	this.state = state;
	if (executeNotify === false) {
		return;
	}
	this.notify();
}


/**
 * Subjectクラス
 * @param {[[Type]]} state         [[Description]]
 * @param {[[Type]]} executeNotify [[Description]]
 */
BellTreeMV.Subject.prototype.setStateValue = function (key, value, executeNotify) {
	'use strict';
	this.state[key] = value;
	if (executeNotify === false) {
		return;
	}
	this.notify();
}


/**
 * Modelの基底クラス
 */
BellTreeMV.Model = function () {
	'use strict';
	BellTreeMV.Subject.call(this);
};

BellTreeMV.inheritPrototype(BellTreeMV.Model.prototype, BellTreeMV.Subject.prototype);


// requireできるようにする。
if (typeof module != 'undefined') {
	module.exports = BellTreeMV;
}
