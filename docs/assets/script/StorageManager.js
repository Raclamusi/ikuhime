
// Storage を管理するクラスです。
// ストレージに保存する要素をプロパティとして持ちます。
const StorageManager = function (appName, storage) {
    this.appName = appName;
    this.names = [];
    this.storage = storage;
};

// 引数で渡された名前の要素の値を設定します。
// その要素のプロパティが存在しない場合は追加します。
StorageManager.prototype.set = function (name, value) {
    if (!this.names.includes(name)) {
        this.names.push(name);
    }
    this[name] = value;
};

// 引数で渡された名前の要素の値を取得します。
StorageManager.prototype.get = function (name) {
    return this[name];
};

// ストレージからアプリ名がキーの先頭についた要素をすべて削除します。
StorageManager.prototype.clear = function () {
    const self = this;
    Array.from(self.storage, function (_, i) {
        return self.storage.key(i);
    }).filter(function (key) {
        return key.startsWith(self.appName + "_");
    }).forEach(function (key) {
        self.storage.removeItem(key);
    });
    self.names.forEach(function (name) {
        self[name] = null;
    });
};

// 引数で渡された名前の要素を保存します。
// 引数を渡さない場合はすべての要素を保存します。
StorageManager.prototype.save = function () {
    const self = this;
    (arguments.length === 0 ?
        self.names :
        Array.from(arguments)
    ).filter(function (name) {
        return name in self && self[name] !== null;
    }).forEach(function (name) {
        self.storage.setItem(self.appName + "_" + name, JSON.stringify(self[name]));
    });
};

// 引数で渡された名前のストレージに保存されている要素をプロパティに追加します。
// 引数を渡さない場合はすべての保存されている要素をプロパティに追加します。
StorageManager.prototype.load = function () {
    const self = this;
    (arguments.length === 0 ?
        Array.from(self.storage, function (_, i) {
            return self.storage.key(i);
        }).filter(function (key) {
            return key.startsWith(self.appName + "_");
        }) :
        Array.from(arguments)
    ).forEach(function (key) {
        const name = key.slice(self.appName.length + 1);
        self.names.push(name);
        self[name] = JSON.parse(self.storage.getItem(key));
    });
};

// 要素のプロパティが空ならば true を返し、そうでない場合は false を返します。
StorageManager.prototype.isEmpty = function () {
    return this.names.length === 0;
};
