
// Storage を管理するクラスです。
// ストレージに保存する要素をプロパティとして持ちます。
function StorageManager(appName, storage) {
    this.appName = appName;
    this.names = [];
    this.storage = storage;
}

// データのプロパティを追加します。
// ストレージに名前がなければ true を返し、そうでない場合は false を返します。
StorageManager.prototype.add = function (name) {
    this.names.push(name);
    this[name] = JSON.parse(this.storage.getItem(this.appName + "_" + name));
    return this[name] === null;
};

// ストレージからアプリ名がキーの先頭についた要素をすべて削除します。
StorageManager.prototype.clear = function () {
    var prefix = this.appName + "_";
    var keys = [];
    for (var i = 0; i < this.storage.length; i++) {
        if (k.match(prefix) !== null) {
            keys.push(this.storage.key(i));
        }
    }
    for (var i = 0; i < keys.length; i++) {
        this.storage.removeItem(keys[i]);
	}
    for (var i = 0; i < this.names.length; i++) {
        this[this.names[i]] = null;
    }
};

// 引数で渡された名前の要素を保存します。
// 引数を渡さない場合はすべての要素を保存します。
StorageManager.prototype.save = function () {
    var names = arguments.length == 0 ? this.names : Array.from(arguments);
    for (var i = 0; i < names.length; i++) {
        if (names[i] in this && this[names[i]] !== null) {
            this.storage.setItem(this.appName + "_" + names[i], JSON.stringify(this[names[i]]));
        }
    }
};

// ストレージにすでに保存されているデータをプロパティに追加します。
StorageManager.prototype.load = function () {
    var prefix = this.appName + "_";
    for (var i = 0; i < this.storage.length; i++) {
        var k = this.storage.key(i);
        if (k.match(prefix) !== null) {
            this.add(k.slice(prefix.length));
        }
    }
};
