
function Organizer(name) {
    this.name = name;
}

function Qualification(name, organizer, jmClass, kgkClass, grades) {
    this.name = name;
    this.organizer = organizerList[organizer];
    this.jmClass = jmClass;
    this.kgkClass = kgkClass;
    this.grades = grades;
}

function Grade(name, jmRank, kgkRank, kgkPoint) {
    this.name = name;
    this.jmRank = jmRank;
    this.jmPoint = jmRankList[jmRank];
    this.kgkRank = kgkRank;
    this.kgkPoint = kgkPoint;
}

var organizerList = {
    zenkokyo: new Organizer("全国工業高等学校長協会"),
    eiken: new Organizer("日本英語検定協会"),
    kogyoEigo: new Organizer("日本工業英語協会"),
    kanken: new Organizer("日本漢字能力検定協会"),
    suken: new Organizer("日本数学検定協会"),
    anzenEisei: new Organizer("安全衛生技術試験協会"),
    denkiGijutsusha: new Organizer("電気技術者試験センター"),
    shoboShiken: new Organizer("消防試験研究センター"),
    musen: new Organizer("日本無線協会"),

};

var jmRankList = {
    S: 30, A: 20, B: 12, C: 7, D: 4, E: 2, F: 1, "": 0,
};

var qualificationList = {
    keisanGijutsu: new Qualification("計算技術検定", "zenkokyo", 101, 601, [
        new Grade("１級", "A", "a", 10),
        new Grade("２級", "C", "b", 8),
        new Grade("３級", "E", "c", 5),
        new Grade("４級", "F", "d", 3),
    ]),
    johoGijutsu: new Qualification("情報技術検定", "zenkokyo", 102, 304, [
        new Grade("１級（特別表彰）", "A", "a", 10),
        new Grade("１級", "B", "a", 10),
        new Grade("２級", "D", "b", 5),
        new Grade("３級", "E", "c", 3),
    ]),
    kisoSeizu: new Qualification("基礎製図検定", "zenkokyo", 103, 101, [
        new Grade("", "E", "b", 3),
    ]),
    kikaiSeizu: new Qualification("機械製図検定", "zenkokyo", 104, 101, [
        new Grade("特別賞", "B", "a", 8),
        new Grade("", "C", "a", 8),
    ]),
    pcRiyo: new Qualification("パソコン利用技術検定", "zenkokyo", 105, 308, [
        new Grade("１級", "B", "a", 10),
        new Grade("２級", "D", "b", 5),
        new Grade("３級", "E", "c", 3),
    ]),
    listeningEiken: new Qualification("リスニング英語検定", "zenkokyo", 106, 702, [
        new Grade("１級", "B", "a", 5),
        new Grade("２級", "C", "b", 3),
        new Grade("３級", "E", "c", 1),
    ]),
    shokyuCad: new Qualification("初級ＣＡＤ検定", "zenkokyo", 107, 103, [
        new Grade("", "E", "a", 3),
    ]),
    graphicDesign: new Qualification("グラフィックデザイン検定", "zenkokyo", 108, 312, [
        new Grade("１級", "A", "", 10),
        new Grade("準１級", "B", "", 10),
        new Grade("２級", "C", "a", 8),
        new Grade("３級", "D", "b", 5),
    ]),
    kogyoKisoGakuryoku: new Qualification("高等学校工業基礎学力テスト", "zenkokyo", 109, "", [
        new Grade("95以上", "B", "", 0),
        new Grade("90以上", "C", "", 0),
        new Grade("85以上", "D", "", 0),
        new Grade("80以上", "E", "", 0),
        new Grade("70以上", "F", "", 0),
    ]),
    eiken: new Qualification("実用英語技能検定", "eiken", 111, 701, [
        new Grade("準１級以上", "A", "", 15),
        new Grade("２級", "C", "a", 15),
        new Grade("準２級", "D", "b", 8),
        new Grade("３級", "F", "c", 5),
        new Grade("４級", "", "d", 3),
    ]),
    kogyoEiken: new Qualification("工業英語能力検定", "kogyoEigo", 112, 604, [
        new Grade("１級", "B", "", 15),
        new Grade("２級", "C", "a", 10),
        new Grade("３級", "D", "b", 8),
        new Grade("４級", "E", "c", 5),
    ]),
    kanken: new Qualification("日本漢字能力検定", "kanken", 113, 704, [
        new Grade("１級", "B", "", 15),
        new Grade("準１級", "C", "a", 15),
        new Grade("２級", "D", "b", 10),
        new Grade("準２級", "E", "c", 8),
        new Grade("３級", "F", "d", 5),
        new Grade("４級", "", "e", 3),
    ]),
    suken: new Qualification("実用数学技能検定", "suken", 114, 703, [
        new Grade("１級", "B", "", 15),
        new Grade("準１級", "C", "a", 10),
        new Grade("２級", "D", "b", 8),
        new Grade("準２級", "E", "c", 5),
        new Grade("３級", "F", "d", 3),
    ]),

    boira: new Qualification("ボイラー技士", "anzenEisei", 141, 115, [
        new Grade("１級学科", "A", "", 15),
        new Grade("２級", "C", "a", 15),
        new Grade("実技講習", "", "b", 3),
        new Grade("小規模・小型ボイラ", "", "c", 3),
    ]),

    denkiShunin: new Qualification("電気主任技術者", "denkiGijutsusha", 151, 202, [
        new Grade("３種", "S", "a", 15),
    ]),
    denkiKoji: new Qualification("電気工事士", "denkiGijutsusha", 152, 201, [
        new Grade("１種", "A", "a", 15),
        new Grade("２種", "C", "b", 10),
    ]),

    kikembutsu: new Qualification("危険物取扱者", "shoboShiken", 181, 501, [
        new Grade("甲種", "A", "a", 15),
        new Grade("乙種１類", "E", "b", 8),
        new Grade("乙種２類", "E", "b", 8),
        new Grade("乙種３類", "E", "b", 8),
        new Grade("乙種４類", "D", "b", 8),
        new Grade("乙種５類", "E", "b", 8),
        new Grade("乙種６類", "E", "b", 8),
        new Grade("丙種", "E", "c", 3),
    ]),

    musen: new Qualification("アマチュア無線技士", "musen", 226, 224, [
        new Grade("第一級", "C", "a", 10),
        new Grade("第二級", "D", "b", 8),
        new Grade("第三級", "E", "c", 5),
        new Grade("第四級", "F", "d", 3),
    ]),

};



function Avatar(name, content, url) {
    this.name = name;
    this.content = content;
    this.url = "/ikuhime/assets/image/" + url + ".png";
}

function Achievement(title, equip, condition) {
    this.title = title;
    this.equip = equip;
    this.condition = condition;
}

function LevelCond(level) {
    this.level = level;
}

LevelCond.prototype.check = function () {
    return userdata.level >= this.level;
};

function QualifCond(qualif, grade) {
    this.qualif = qualif;
    this.grade = grade;
}

QualifCond.prototype.check = function () {
    for (var i = 0; i < userdata.quals.length; i++) {
        var v = userdata.quals[i];
        if (v.id == this.qualif && v.gradeId <= this.grade) {
            return true;
		}
    }
    return false;
};

function JmPointCond(point) {
    this.point = point;
}

JmPointCond.prototype.check = function () {
    var p = 0;
    for (var i = 0; i < userdata.quals.length; i++) {
        p += userdata.quals[i].grade.jmPoint;
    }
    return p >= this.point;
};

function KgkPointCond(point) {
    this.point = point;
}

KgkPointCond.prototype.check = function () {
    var p = 0;
    for (var i = 0; i < userdata.quals.length; i++) {
        p += userdata.quals[i].grade.kgkPoint;
    }
    return p >= this.point;
};


var avatarList = [
    new Avatar("制服 男", "", "seifuku"),
    new Avatar("制服 女", "", "seifuku-g"),
    new Avatar("バドミントン", "", "badominntonn"),
    new Avatar("バレー", "バレー部員", "bare-"),
    new Avatar("バスケ", "大概顧問は鬼笑", "basuke"),
    new Avatar("白衣 男", "", "hakui"),
    new Avatar("白衣 女", "", "hakui-girl"),
    new Avatar("柔道 黒帯", "", "jyuudoukuroobi"),
    new Avatar("柔道 白帯", "", "jyudousiroobi"),
    new Avatar("空手", "", "karate"),
    new Avatar("剣道", "剣道部員<br>僕たちは竹刀だけで十分だ！！", "kenndo"),
    new Avatar("水着", "", "mizugi"),
    new Avatar("ラグビー", "五郎丸しか勝たん！！<br>ボールの形がやば谷園", "ragube"),
    new Avatar("陸上", "どこまでも走り続ける", "rikujyou"),
    new Avatar("茶華道", "お茶とお花でもどうぞ！", "sakadou"),
    new Avatar("山岳", "運動部の中で最もイケてる部活！", "sanngaku"),
    new Avatar("作業服 D 男", "", "sdb"),
    new Avatar("作業服 D 女", "", "sdg"),
    new Avatar("作業服 E 男", "", "seb"),
    new Avatar("作業服 E 女", "", "seg"),
    new Avatar("作業服 M 男", "", "smb"),
    new Avatar("作業服 M 女", "", "smg"),
    new Avatar("サッカー", "サッカー部員", "soccer"),
    new Avatar("作業服 R 男", "", "srb"),
    new Avatar("作業服 R 女", "", "srg"),
    new Avatar("作業服 W 男", "", "swb"),
    new Avatar("作業服 W 女", "", "swg"),
    new Avatar("体操服 緑 男", "", "t1b"),
    new Avatar("体操服 緑 女", "", "t1g"),
    new Avatar("体操服 赤 男", "", "t2b"),
    new Avatar("体操服 赤 女", "", "t2g"),
    new Avatar("体操服 青 男", "", "t3b"),
    new Avatar("体操服 青 女", "", "t3g"),
    new Avatar("卓球", "", "takkyuu"),
    new Avatar("テニス", "テニス部員", "tennis"),
    new Avatar("チア", "", "tia"),
    new Avatar("野球1", "僕を支えてくれるのは、100人を超える部員のみんな！", "yakyuu"),
    new Avatar("野球2", "みんなで力を合わせて全国制覇だ！！", "yakyuu2"),
];

var equipList = [
    new Avatar("アヒル", "ただのアヒル（余命4か月）", "ahirucyann"),
    new Avatar("無線機", "なんでも聞こえる", "amacyuamusenn"),
    new Avatar("スライム", "スライムが調子に乗ってこちらを見ている。", "aosuraimu"),
    new Avatar("圧着ペンチ", "あなたと私を圧着しちゃうぞ", "attyakupennti"),
    new Avatar("バナナ", "太く長くおいしいバナナ！！！", "banana"),
    new Avatar("バスケットボール", "ただのバスケットボール", "basketb"),
    new Avatar("バット", "大河内のバット", "bat"),
    new Avatar("ファイヤー", "ファイヤー", "boira"),
    new Avatar("本", "本", "bunngeibu"),
    new Avatar("電卓", "昔はスパーコンピュター", "denntaku"),
    new Avatar("銅メダル1", "おしい！！！<br>1位まであとちょっと！！！", "doumedaru"),
    new Avatar("銅メダル2", "おしい！！！<br>1位まであとちょっと！！！", "doumedarug"),
    new Avatar("筆", "スプラトゥーンやりますか", "fude"),
    new Avatar("三角フラスコ", "どんなもんでもこいつにぶち込んどき", "furasuko"),
    new Avatar("銀メダル1", "すごい！！！<br>もう実質1位！！！", "ginnmetaru"),
    new Avatar("銀メダル2", "すごい！！！<br>もう実質1位！！！", "ginnmedarug"),
    new Avatar("エレキギター", "金属製の弦の振動をピックアップで（微弱な）電気信号に変えるギター", "guitar"),
    new Avatar("花", "それぞれの花には花言葉がある。<br>香りや豊かな色彩にはリラックス効果があるとか…", "hana"),
    new Avatar("ホルン", "美しい音色が鳴る", "horunn"),
    new Avatar("一万円", "一万円、親父からの生活費<br>ああもう貧乏神に取りつかれてるのかな", "itimannenn"),
    new Avatar("自転車", "通学のメインツール。<br>片道20ｋｍを漕ぐ猛者も歴代姫工生にいるらしい。", "jitennsya"),
    new Avatar("かばん", "たくさん入るかばん", "kabann"),
    new Avatar("カメラ", "語源であるラテン語のcameraは「小さな部屋」を意味し、これはのちに政治や財政を司る「部屋」（官房・国庫）などと意味が拡大した。これで大事な思い出をのこしてね♪", "kamera"),
    new Avatar("カスタネット", "カッカカカカ", "kasutanetto"),
    new Avatar("金メダル1", "堂々の第一位！！！<br>これからも活躍期待してるよ！", "kinnmedaru"),
    new Avatar("金メダル2", "堂々の第一位！！！<br>これからも活躍期待してるよ！", "kinnmedarug"),
    new Avatar("黒板消し", "今までの軌跡を無に帰すことができる。<br>原点にして頂点。", "kokubannkesi"),
    new Avatar("コンパス", "上から見るか、下から見るか。<br>丸書くか、刺すか。", "konnpasu"),
    new Avatar("公衆電話", "姫工生のライフライン", "kousyuudennwa"),
    new Avatar("車", "かっけーーーーー！！！！", "kuruma"),
    new Avatar("教官室の鍵", "体育教師の秘密を握れるチャンス！", "kyoukannsitunokagi"),
    new Avatar("きゅうり", "みずみずしいきゅうり", "kyuuri"),
    new Avatar("マイク", "このマイクで歌うと米津玄師のように高音も難なく歌える！", "maiku"),
    new Avatar("メジャー", "端っこまで使ったことないよね？<br>今日は端っこまで使ってね！", "mejya"),
    new Avatar("日本刀", "切り刻め！！！！！", "nihonntou"),
    new Avatar("日輪刀", "陽光以外で人食いの鬼を倒す事ができる唯一の武器!<br>鬼殺隊隊士達の基本装備", "nitirinntou"),
    new Avatar("日輪刀（火）", "つよい！", "nitirinntouhi"),
    new Avatar("二刀流", "starパースとすとりゅーむ", "nitouryuu"),
    new Avatar("ノギス", "これでなんでも測ることができる。<br>あの人との心の距離も。", "nogisu"),
    new Avatar("お茶", "粗茶ですが", "ocha"),
    new Avatar("置く花", "きれい", "okuhana"),
    new Avatar("パソコン", "ネトゲ廃人大量生産機。魔性のアイテム。<br>あと、実習や資格検定の必須アイテム", "pasokonn"),
    new Avatar("スライムピンク", "ピンクスライムがこちらに恋に落ちている。", "pinksuraimu"),
    new Avatar("ラグビーボール", "形が特徴的", "ragubeboll"),
    new Avatar("ラインカー", "白線を引くための必須アイテム", "rainnka"),
    new Avatar("りんご", "キティはりんご３個分！！！", "rinngo"),
    new Avatar("ロボット", "ボクトナカヨクシテネ", "robot"),
    new Avatar("ロケラン", "すべてをチリにする破壊兵器。", "rokerann"),
    new Avatar("旋盤", "緻密な加工ができる機械<br>１個120万円ぐらいらしい", "sennbann"),
    new Avatar("扇風機", "猛暑克服の切り札！この夏はこれしか勝たん！", "sennpuki"),
    new Avatar("新聞", "とりあえずこれを毎日読んどきな", "sinnbunn"),
    new Avatar("サッカーボール", "ただのサッカーボール", "soccerball"),
    new Avatar("シャチホコ", "姫路城からもぎ取ってきた", "syatihoko"),
    new Avatar("シャトル", "これで羽子板もできないことはない。", "syatoru"),
    new Avatar("宝箱", "inガイモン（分からない人はゴムピース参照）", "takarabako"),
    new Avatar("卓球ラケット", "このラケットはラバーが痛みません。", "takkyuuracket"),
    new Avatar("テニスボール", "テニスコートの付近によく転がっている。", "tennisball"),
    new Avatar("テニスラケット", "よし、テニスをしよう！！！", "tennisracket"),
    new Avatar("ティッシュ", "男子高校生の必須アイテム<br>濡れても丈夫だから安心してね♪", "thissyu"),
    new Avatar("跳び箱", "久しぶりにやると思たより飛べなさそう。", "tobibako"),
    new Avatar("トマト", "世界一おいしいと言われているかもしれないトマト<br>これを食べて今日も元気100％", "tomato"),
    new Avatar("トロフィー", "黄金に輝くトロフィー！<br>伝説ここにあり！！", "torofy"),
    new Avatar("トランペット", "音楽部のトランペット", "tranpet"),
    new Avatar("野球ボール", "かっ飛ばせー", "yakyuuball"),
    new Avatar("雑草", "今日の晩飯！", "zassou"),
];

var achievementList = [
    new Achievement("アマチュア無線技士", 1, new QualifCond("musen", 9)),
    new Achievement("電気工事士", 3, new QualifCond("denkiKoji", 9)),
    new Achievement("ボイラー技士", 7, new QualifCond("boira", 9)),
    new Achievement("計算技術ビギナー", 9, new QualifCond("keisanGijutsu", 2)),
    new Achievement("機械製図マスター", 27, new QualifCond("kikaiSeizu", 9)),
    new Achievement("パソコン使い", 41, new QualifCond("pcRiyou", 9)),
    new Achievement("ジュニアマイスターブロンズ", 10, new JmPointCond(20)),
    new Achievement("ジュニアマイスターブロンズ", 11, new JmPointCond(20)),
    new Achievement("ジュニアマイスターシルバー", 14, new JmPointCond(30)),
    new Achievement("ジュニアマイスターシルバー", 15, new JmPointCond(30)),
    new Achievement("ジュニアマイスターゴールド", 24, new JmPointCond(45)),
    new Achievement("ジュニアマイスターゴールド", 25, new JmPointCond(45)),
    new Achievement("工業技術顕彰", 34, new KgkPointCond(20)),
    new Achievement("工業技術顕彰銀賞", 35, new KgkPointCond(40)),
    new Achievement("工業技術顕彰金賞", 36, new KgkPointCond(60)),
    new Achievement("レベル2", 63, new LevelCond(2)), 
    new Achievement("レベル2", 6, new LevelCond(2)),
    new Achievement("レベル3", 0, new LevelCond(3)),
    new Achievement("レベル3", 51, new LevelCond(3)),
    new Achievement("レベル4", 56, new LevelCond(4)),
    new Achievement("レベル4", 57, new LevelCond(4)),
    new Achievement("レベル5", 18, new LevelCond(5)),
    new Achievement("レベル5", 4, new LevelCond(5)),
    new Achievement("レベル6", 22, new LevelCond(6)),
    new Achievement("レベル6", 17, new LevelCond(6)),
    new Achievement("レベル7", 5, new LevelCond(7)),
    new Achievement("レベル7", 43, new LevelCond(7)),
    new Achievement("レベル8", 53, new LevelCond(8)), 
    new Achievement("レベル8", 55, new LevelCond(8)),
    new Achievement("レベル9", 21, new LevelCond(9)),
    new Achievement("レベル9", 2, new LevelCond(9)),
    new Achievement("レベル10！", 62, new LevelCond(10)),
    new Achievement("レベル10！", 16, new LevelCond(10)),
    new Achievement("レベル10！", 54, new LevelCond(10)),
    new Achievement("レベル11", 12, new LevelCond(11)),
    new Achievement("レベル11", 13, new LevelCond(11)),
    new Achievement("レベル12", 20, new LevelCond(12)),
    new Achievement("レベル12", 28, new LevelCond(12)),
    new Achievement("レベル13", 31, new LevelCond(13)),
    new Achievement("レベル13", 32, new LevelCond(13)),
    new Achievement("レベル14", 30, new LevelCond(14)),
    new Achievement("レベル14", 33, new LevelCond(14)),
    new Achievement("レベル15", 59, new LevelCond(15)),
    new Achievement("レベル15", 44, new LevelCond(15)),
    new Achievement("レベル16", 46, new LevelCond(16)),
    new Achievement("レベル16", 47, new LevelCond(16)),
    new Achievement("レベル17", 49, new LevelCond(17)),
    new Achievement("レベル17", 50, new LevelCond(17)),
    new Achievement("レベル18", 30, new LevelCond(18)),
    new Achievement("レベル18", 40, new LevelCond(18)),
    new Achievement("レベル19", 39, new LevelCond(19)),
    new Achievement("レベル19", 38, new LevelCond(19)),
    new Achievement("レベル20!!", 19, new LevelCond(20)),
    new Achievement("レベル20!!", 52, new LevelCond(20)),
    new Achievement("レベル21", 8, new LevelCond(21)),
    new Achievement("レベル22", 23, new LevelCond(22)),
    new Achievement("レベル23", 26, new LevelCond(23)),
    new Achievement("レベル24", 42, new LevelCond(24)),
    new Achievement("レベル25", 29, new LevelCond(25)),
    new Achievement("レベル26", 45, new LevelCond(26)),
    new Achievement("レベル27", 48, new LevelCond(27)),
    new Achievement("レベル28", 58, new LevelCond(28)),
    new Achievement("レベル29", 60, new LevelCond(29)),
    new Achievement("レベル30!!!", 61, new LevelCond(30)),
    new Achievement("レベル30!!!", 64, new LevelCond(30)),
    new Achievement("レベル30!!!", 37, new LevelCond(30)),
];
