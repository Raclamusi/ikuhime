
// Storage を管理するクラスです。
// ストレージに保存する要素をプロパティとして持ちます。
function StorageManager(appName, storage) {
	this.appName = appName;
	this.storage = storage;
}

// データのプロパティを追加します。
// ストレージに名前がなければ true を返し、そうでない場合は false を返します。
StorageManager.prototype.add = function (name) {
	var value = JSON.parse(this.storage.getItem(this.appName + "_" + name));
	Object.defineProperty(this, name, {
		get: function () {
			return value;
		},
		set: function (v) {
			value = v;
			this.storage.setItem(this.appName + "_" + name, JSON.stringify(v));
		},
		enumerable: true,
		configurable: true,
	});
	return value === null;
};

// ストレージからアプリ名がキーの先頭についた要素をすべて削除します。
StorageManager.prototype.clear = function () {
	for (var i = 0; i < this.storage.length;) {
		var k = this.storage.key(i);
		if (k.startsWith(this.appName + "_")) {
			this.storage.removeItem(k);
		}
		else {
			i++;
		}
	}
};
