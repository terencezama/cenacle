let chapter = "5";
let bookId = "fra-LSG:Gen";

let root = 'https://audio.emcitv.com/audio/bible/fr/audio-bible/AT/'
let book = 
{
    "fra-LSG:Gen"   :"genese",
    "fra-LSG:Exod"  :"exode",
    "fra-LSG:Lev"   :"levitique",
    "fra-LSG:Num"   :"nombres",
    "fra-LSG:Deut"  :"deuteronome",
    "fra-LSG:Josh"  :"josue",
    "fra-LSG:Judg"  :"juges",
    "fra-LSG:Ruth"  :"ruth",
    "fra-LSG:1Sam"  :"1-samuel",
    "fra-LSG:2Sam"  :"2-samuel",
    "fra-LSG:1Kgs"  :"1-rois",
    "fra-LSG:2Kgs"  :"2-rois",
    "fra-LSG:1Chr"  :"1-chroniques",
    "fra-LSG:2Chr"  :"2-chroniques",
    "fra-LSG:Ezra"  :"esdras",
    "fra-LSG:Neh"   :"nehemie",
    "fra-LSG:Esth"  :"esther",
    "fra-LSG:Job"   :"job",
    "fra-LSG:Ps"    :"psaumes",
    "fra-LSG:Prov"  :"proverbes",
    "fra-LSG:Eccl"  :"ecclesiaste",
    "fra-LSG:Song"  :"cantique-des-cantiques",
    "fra-LSG:Isa"   :"esaie",
    "fra-LSG:Jer"   :"jeremie",
    "fra-LSG:Lam"   :"lamentations",
    "fra-LSG:Ezek"  :"ezechiel",
    "fra-LSG:Dan"   :"daniel",
    "fra-LSG:Hos"   :"osee",
    "fra-LSG:Joel"  :"joel",
    "fra-LSG:Amos"  :"amos",
    "fra-LSG:Obad"  :"abdias",
    "fra-LSG:Jonah" :"jonas",
    "fra-LSG:Mic"   :"michee",
    "fra-LSG:Nah"   :"nahum",
    "fra-LSG:Hab"   :"habakuk",
    "fra-LSG:Zeph"  :"sophonie",
    "fra-LSG:Hag"   :"aggee",
    "fra-LSG:Zech"  :"zacharie",
    "fra-LSG:Mal"   :"malachie",
    "fra-LSG:Matt"  :"matthieu",
    "fra-LSG:Mark"  :"marc",
    "fra-LSG:Luke"  :"luc",
    "fra-LSG:John"  :"jean",
    "fra-LSG:Acts"  :"actes",
    "fra-LSG:Rom"   :"romains",
    "fra-LSG:1Cor"  :"1-corinthiens",
    "fra-LSG:2Cor"  :"2-corinthiens",
    "fra-LSG:Gal"   :"galates",
    "fra-LSG:Eph"   :"ephesiens",
    "fra-LSG:Phil"  :"philippiens",
    "fra-LSG:Col"   :"colossiens",
    "fra-LSG:1Thess":"1-thessaloniciens",
    "fra-LSG:2Thess":"2-thessaloniciens",
    "fra-LSG:1Tim"  :"1-timothee",
    "fra-LSG:2Tim"  :"2-timothee",
    "fra-LSG:Titus" :"tite",
    "fra-LSG:Phlm"  :"philemon",
    "fra-LSG:Heb"   :"hebreux",
    "fra-LSG:Jas"   :"jacque",
    "fra-LSG:1Pet"  :"1-pierre",
    "fra-LSG:2Pet"  :"2-pierre",
    "fra-LSG:1John" :"1-jean",
    "fra-LSG:2John" :"2-jean",
    "fra-LSG:3John" :"3-jean",
    "fra-LSG:Jude"  :"jude",
    "fra-LSG:Rev"   :"apocalypse"
}

let chapterString = "";
let chapterNum = parseInt(chapter);
if(chapterNum < 10){
    chapterString = "0"+chapterNum;
}else{
    chapterString = chapterNum;
}
let bookString = book[bookId];
let url = root+bookString+"/"+bookString+"-"+chapterString+".mp3"

console.log(url)