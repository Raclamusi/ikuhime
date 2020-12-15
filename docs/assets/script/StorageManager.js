
// Storage ���Ǘ�����N���X�ł��B
// �X�g���[�W�ɕۑ�����v�f���v���p�e�B�Ƃ��Ď����܂��B
function StorageManager(appName, storage) {
	this.appName = appName;
	this.storage = storage;
}

// �f�[�^�̃v���p�e�B��ǉ����܂��B
// �X�g���[�W�ɖ��O���Ȃ���� true ��Ԃ��A�����łȂ��ꍇ�� false ��Ԃ��܂��B
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
