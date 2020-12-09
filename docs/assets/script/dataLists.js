
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

function Grade(grade, jmRank, kgkRank, kgkPoints) {
    this.grade = grade;
    this.jmRank = jmRank;
    this.jmPoints = jmRankList[jmRank];
    this.kgkRank = kgkRank;
    this.kgkPoints = kgkPoints;
}

var organizerList = {
    zenkokyo: new Organizer("全国工業高等学校長協会"),
    eiken: new Organizer("日本英語検定協会"),
    kogyoEigo: new Organizer("日本工業英語協会"),
    kanken: new Organizer("日本漢字能力検定協会"),
    suken: new Organizer("日本数学検定協会"),
    denkiGijutsusha: new Organizer("電気技術者試験センター"),
    shoboShiken: new Organizer("消防試験研究センター"),

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
    kogyoKisoGakuryoku: new Qualification("高等学校工業基礎学力テスト", "zenkokyo", 109, 0, [
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

    denkiShunin: new Qualification("電気主任技術者", "denkiGijutsusha", 151, 202, [
        new Grade("３種", "S", "a", 15),
    ]),
    denkiKoji: new Qualification("電気工事士", "denkiGijutsusha", 152, 201, [
        new Grade("１種", "A", "a", 15),
        new Grade("２種", "C", "b", 10),
    ]),

    kikembutsu: new Qualification("危険物取扱者", "shoboShiken", 181, 501, [
        new Grade("甲種", "A", "a", 15),
        new Grade("乙種４類", "D", "b", 8),
        new Grade("丙種", "E", "c", 3),
    ]),
    kikembutsuOtsu1: new Qualification("危険物取扱者　乙種１類", "shoboShiken", 182, 501, [
        new Grade("", "E", "c", 3),
    ]),
    kikembutsuOtsu2: new Qualification("危険物取扱者　乙種２類", "shoboShiken", 183, 501, [
        new Grade("", "E", "c", 3),
    ]),
    kikembutsuOtsu3: new Qualification("危険物取扱者　乙種３類", "shoboShiken", 184, 501, [
        new Grade("", "E", "c", 3),
    ]),
    kikembutsuOtsu5: new Qualification("危険物取扱者　乙種５類", "shoboShiken", 185, 501, [
        new Grade("", "E", "c", 3),
    ]),
    kikembutsuOtsu6: new Qualification("危険物取扱者　乙種６類", "shoboShiken", 186, 501, [
        new Grade("", "E", "c", 3),
    ]),

};
