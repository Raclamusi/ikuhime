
// Storage を管理するクラスです。
// ストレージに保存する要素をプロパティとして持ちます。
function StorageManager(appName, storage) {
    this.appName = appName;
    this.names = [];
    this.values = [];
	this.storage = storage;
}

// データのプロパティを追加します。
// ストレージに名前がなければ true を返し、そうでない場合は false を返します。
StorageManager.prototype.add = function (name) {
    var i = this.names.length;
    this.names.push(name);
	this.values.push(JSON.parse(this.storage.getItem(this.appName + "_" + name)));
	Object.defineProperty(this, name, {
		get: function () {
			return this.values[i];
		},
		set: function (v) {
			this.values[i] = v;
            this.storage.setItem(this.appName + "_" + name, JSON.stringify(v));
		},
		enumerable: true,
		configurable: true,
	});
	return this.values[i] === null;
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

// すべての要素を保存します。
StorageManager.prototype.save = function () {
    for (var i = 0; i < this.names.length; i++) {
        this.storage.setItem(this.appName + "_" + this.names[i], JSON.stringify(this.values[i]));
    }
};
