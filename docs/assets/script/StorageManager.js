
// Storage ���Ǘ�����N���X�ł��B
// �X�g���[�W�ɕۑ�����v�f���v���p�e�B�Ƃ��Ď����܂��B
function StorageManager(appName, storage) {
    this.appName = appName;
    this.names = [];
    this.values = [];
	this.storage = storage;
}

// �f�[�^�̃v���p�e�B��ǉ����܂��B
// �X�g���[�W�ɖ��O���Ȃ���� true ��Ԃ��A�����łȂ��ꍇ�� false ��Ԃ��܂��B
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

// �X�g���[�W����A�v�������L�[�̐擪�ɂ����v�f�����ׂč폜���܂��B
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

// ���ׂĂ̗v�f��ۑ����܂��B
StorageManager.prototype.save = function () {
    for (var i = 0; i < this.names.length; i++) {
        this.storage.setItem(this.appName + "_" + this.names[i], JSON.stringify(this.values[i]));
    }
};
