
var request = require('request')
var fs = require('fs');
var mkdirp = require('mkdirp');
const Realm = require('realm')
var schema = require('../schema')
var fs_ex = require('fs-extra')

const version = "fra-LSG"
const username = "bhouNU2wkiTEIv6sTrHZRDkTBMuFn6XXbg0l1InP"
const password = "X"
const path = "data"

const url = {
    books: `https://${username}:${password}@bibles.org/v2/versions/${version}/books.js`,
    chapters: (bookId) => `https://${username}:${password}@bibles.org/v2/books/${bookId}/chapters.js`,
    verse: (chapterId) => `https://${username}:${password}@bibles.org/v2/chapters/${chapterId}/verses.js`

}

//region utils
const asyncRequest = async (value) =>
    new Promise((resolve, reject) => {
        request(value, (error, response, data) => {
            if (error) reject(error)
            else resolve(data)
        })
    })
const asyncWrite = async (file, jsonString) => new Promise((resolve, reject) => {
    fs.writeFile(file, jsonString, function (err) {
        if (err) reject(err)
        else resolve()
    }
    );
})
const asyncRead = async (file) => new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
        if (err) reject(err)
        else resolve(data)
    })
})
const asyncMkdir = async (path) => new Promise((resolve, reject) => {
    mkdirp(path, function (err) {
        if (err) reject(err)
        else resolve()
    });
})
//endregion


const fetchBooks = async () => {
    // console.log('checking if book json exists')
    // Read books.json
    const file = `${path}/${version}-books.json`
    let json = ''
    try {
        json = await asyncRead(file)
        return JSON.parse(json)
    } catch (err) {
        // console.log(err)
        console.log('fetching books')
        let res = await asyncRequest({ url: url.books })
        await asyncWrite(file, res)
        console.log('fetched')
        return await fetchBooks()
    }
}

const fetchChapters = async (bookId) => {
    console.log(`checking if ${bookId} chapters json exists`)
    // Read chapters.json
    const s = bookId.split(':')
    const ver = s[0]
    const book = s[1]
    await asyncMkdir(`${path}/${ver}/${book}`)


    const file = `${path}/${ver}/chapters/${bookId}-chapters.json`
    let json = ''
    try {
        json = await asyncRead(file)
        return JSON.parse(json)
    } catch (err) {
        // console.log(err)
        console.log(`fetching chapters ${bookId}`)
        let res = await asyncRequest({ url: url.chapters(bookId) })
        await asyncWrite(file, res)
        console.log('fetched')
        return await fetchChapters(bookId)
    }
}

const fetchVerse = async (chapterId) => {
    // console.log(`checking if ${chapterId} verse json exists`)
    const s = chapterId.split(':')
    const ver = s[0]
    const book = s[1].split('.')[0]
    // Read verse.json
    const file = `${path}/${ver}/${book}/${chapterId}.json`
    let json = ''
    try {
        json = await asyncRead(file)
        return JSON.parse(json)
    } catch (err) {
        // console.log(err)
        console.log(`fetching verse ${chapterId} ${url.verse(chapterId)}`)
        let res = await asyncRequest({ url: url.verse(chapterId) })
        await asyncWrite(file, res)
        console.log('fetched')
        return await fetchVerse(chapterId)
    }
}

const parseVerseToHtml = async (chapterId, versesJson) => {
    const s = chapterId.split(':')
    const ver = s[0]
    const book = s[1].split('.')[0]

    await asyncMkdir(`html/${ver}/${book}`)
    let file = `html/${ver}/${book}/${chapterId}.html`
    const text = parseVerses(versesJson)
    await asyncWrite(file, text)


}
const parseVerseToJson = async (chapterId, versesJson) => {
    const s = chapterId.split(':')
    const ver = s[0]
    const book = s[1].split('.')[0]

    await asyncMkdir(`json/${ver}/${book}`)
    let file = `json/${ver}/${book}/${chapterId}.json`
    let text = parseVerses(versesJson)
    text = escape(text)
    await asyncWrite(file, `{"data":"${text}"}`)


}
const parseVerses = (versesJson) => {
    const { response: { verses } } = versesJson
    let text = ""
    const versesLength = verses.length

    for (let i = 0; i < versesLength; i++) {
        const verse = verses[i]
        text += parseVerse(verse)
    }
    return text

}

const parseVerse = verse => {
    let vhtml = verse.text

    //add space to all verse number sup>6
    vhtml = vhtml.replace('</sup>', ' </sup>')

    //Remove all begining whitespace characters
    const regex = /(?<=\/sup>)\s*.*(?=<\/p>)/gm;
    const vtext = regex.exec(vhtml)
    if (vtext != null) {
        const ntext = vtext[0].replace(/^\s+/, '') //trim all whitespace characters
        vhtml = vhtml.replace(vtext[0], ntext)
    }

    
    //Convert all p tag to verse tag
    // vhtml = vhtml.replace(/<p class="p">/g, `<span class="verse" data-verse="${verse.id}">`)
    // vhtml = vhtml.replace(/<p class=".".*?>/g, `<span class="verse" data-verse="${verse.id}">`)
    // vhtml = vhtml.replace(/<p class=".".*?>/g, `<span>`)
    //<p class=".".*?>
    // vhtml = vhtml.replace("<p class=\"b\"></p>","<br><br>")

    // vhtml = `<span class="verse" data-verse="${verse.id}">`+vhtml

    vhtml = vhtml.replace("<p class=\"b\"></p>","<h2></h2>")
    vhtml = vhtml.replace(/<p class="(p|q)">/, `<div class="verse" data-verse="${verse.id}"><p class="p">`)
    vhtml = vhtml.replace(/<p class="(p|q)">/g, `<span>`)
    vhtml = vhtml.replace(/<\/p>/g, '</span>')
    vhtml = vhtml+ "</div>"
    // <\/p>$
    // vhtml = vhtml.replace(/<\/p>$/, '</span>')

    return vhtml
}

const generateJsonIndex = async () => {
    /*
           const books = {
            "1Chr" : {
                "fra-LSG:1Char.1": require('./1Chr/fra-LSG:1Char.1.json')
            }
            */
    let text = `const books = {\n`
    const booksJson = await fetchBooks()
    const { response: { books } } = booksJson
    const booksLength = books.length
    for (let i = 0; i < booksLength; i++) {
        const book = books[i]
        let chaptersJson = await fetchChapters(book.id)
        const { response: { chapters } } = chaptersJson

        const bookIdOnly = book.id.split(':')[1]
        text += `"${bookIdOnly}" : {\n`

        const chaptersLength = chapters.length
        for (let j = 0; j < chaptersLength; j++) {
            const chapter = chapters[j]
            const chapterIdOnly = chapter.id.split('.')[1]
            text += `\r"${chapterIdOnly}":require('./${bookIdOnly}/${chapter.id}.json'),\n`
        }
        text += `},\n`
    }
    text += `}\n`
    text += `export default books`
    console.log(text)
    await asyncWrite(`json/${version}/index.js`, text)
}


const main = async () => {
    await asyncMkdir(`${path}/${version}/chapters`)
    const booksJson = await fetchBooks()
    const { response: { books } } = booksJson
    // books.forEach(book => {
    //     // console.log(book.id)
    //     // let chaptersJson = await fetchChapters(book.id)
    //     // const {response:{chapters}} = chaptersJson
    //     console.log(book.id)
    //     let chaptersJson = fetchChapters(book.id)
    //     console.log(chaptersJson)

    // });

    const booksLength = books.length
    for (let i = 0; i < booksLength; i++) {
        const book = books[i]
        let chaptersJson = await fetchChapters(book.id)
        const { response: { chapters } } = chaptersJson

        const chaptersLength = chapters.length
        for (let j = 0; j < chaptersLength; j++) {
            const chapter = chapters[j]

            // REMOVE AWAIT FOR DOWNLOAD
            let verseJson = await fetchVerse(chapter.id)
            // console.log(verseJson)

            //HTML PARSING
            parseVerseToHtml(chapter.id, verseJson)

            //JSON PARSING
            parseVerseToJson(chapter.id, verseJson)
        }
    }
    console.log('completed iteration')
}


const test = async () => {
    let chapterId = 'fra-LSG:Gen.1'
    let verseJson = await fetchVerse(chapterId)
    parseVerseToHtml(chapterId, verseJson)
}

const saveRealm = async () => {
    await fs_ex.remove('default.realm')
    await fs_ex.remove('default.realm.lock')
    await fs_ex.remove('default.realm.management')
    await fs_ex.remove('../local_modules/react-native-bible-realm/android/src/main/res/raw/bible.realm')
    await fs_ex.remove('../local_modules/react-native-bible-realm/android/src/main/res/raw/bible.realm.lock')
    await fs_ex.remove('../local_modules/react-native-bible-realm/android/src/main/res/raw/bible.realm.note')
    const zrealm = await Realm.open({ schema: [schema.BookSchema, schema.ChapterSchema, schema.VerseSchema, schema.HistorySchema, schema.HighlightSchema] });
    const booksJson = await fetchBooks()
    const { response: { books } } = booksJson
    const booksLength = books.length
    for (let i = 0; i < booksLength; i++) {
        const book = books[i]
        let chaptersJson = await fetchChapters(book.id)
        const { response: { chapters } } = chaptersJson
        const chaptersLength = chapters.length
        let chaptersData = []
        for (let j = 0; j < chaptersLength; j++) {
            const chapter = chapters[j]
            let versesJson = await fetchVerse(chapter.id)
            // const text = parseVerses(verseJson)
            const { response: { verses } } = versesJson
            let text = ""
            const versesLength = verses.length

            const vwrite = await zrealm.write(() => {
                for (let i = 0; i < versesLength; i++) {
                    const verse = verses[i]
                    const vtext = parseVerse(verse)
                    text += vtext
                    const verseData = {
                        id: verse.id,
                        data: vtext,
                        ord: parseInt(verse.id.split('.')[2]),
                        bookId: book.id,
                        chapterId: chapter.id
                    }
                    zrealm.create('Verse', verseData, true)

                }
            })

            const chapterData = {
                id: chapter.id,
                // data: text,
                bookId: book.id
            }
            const write = await zrealm.write(() => {
                zrealm.create('Chapter', chapterData, true)
            });
            chaptersData.push(chapterData)
        }
        const bookData = {
            id: book.id,
            name: book.name,
            ord: parseInt(book.ord),
            version: version,
            // chapters:chaptersData,
            chaptersCount: chaptersData.length
        }

        const write = await zrealm.write(() => {
            zrealm.create('Book', bookData, true)
        });


    }
    console.log('done')

    await fs_ex.copy('default.realm', '../local_modules/react-native-bible-realm/android/src/main/res/raw/bible.realm')
    // ../android/app/src/main/assets/bible.realm'
    // ../local_modules/react-native-bible-realm/android/src/main/res/raw/bible.realm
    zrealm.close()
    process.exit()

}
// test()
// main()
// generateJsonIndex()


// saveRealm()


