
var request = require('request')
var fs = require('fs');
var mkdirp = require('mkdirp');
// username = "john",
// password = "1234",
// url = "http://" + username + ":" + password + "@www.example.com";

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
    console.log('checking if book json exists')
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

const fetchVerse = async (chapterId) =>{
    console.log(`checking if ${chapterId} verse json exists`)
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

const parseVerseToHtml = async(chapterId,versesJson) =>{
    const s = chapterId.split(':')
    const ver = s[0]
    const book = s[1].split('.')[0]

    await asyncMkdir(`html/${ver}/${book}`)
    let file = `html/${ver}/${book}/${chapterId}.html`
    const text = parseVerse(versesJson)
    await asyncWrite(file,text)


}

const parseVerse =  (versesJson) =>{
    const {response:{verses}} = versesJson
    let text = ""
    const versesLength = verses.length

    for(let i=0; i<versesLength; i++){
        const verse = verses[i]
        text += verse.text
    }
    // text = text.replace('<p class="p">','<span class="p">')
    text = text.replace(/<p class="p">/g, '<span class="p">')
    text = text.replace(/<\/p>/g, '</span>')

    return text

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
    for(let i=0;i<booksLength;i++){
        const book = books[i]
        let chaptersJson = await fetchChapters(book.id)
        const {response:{chapters}} = chaptersJson
        
        const chaptersLength = chapters.length
        for(let j=0; j<chaptersLength; j++){
            const chapter = chapters[j]
            
            // REMOVE AWAIT FOR DOWNLOAD
            let verseJson =  await fetchVerse(chapter.id)
            // console.log(verseJson)

            //HTML PARSING
            // parseVerseToHtml(chapter.id,verseJson)

            
        }
    }

    

    


    // const bookNames = books.map(data => {
    //     return data.name
    // })
    // console.log(bookNames)


    // const chaptersJson = await fetchChapters('fra-LSG:Gen')
    // const {response:{chapters}} = chaptersJson
    // console.log(chapters)
    // chapters.forEach(chapter => {
    //     console.log(chapter.id)
    // });

    // const bookId = 'fra-LSG:Gen'
    // const file = `${path}/${bookId}-chapters.json`
    // json = await asyncRead(file)
    //     console.log(JSON.parse(json))

    // const verse  = await fetchVerse('fra-LSG:Gen.1')
    // console.log(verse)


}


const test = async ()=>{
    let json = {}
    await asyncMkdir(`${path}/${version}/chapters`)
    const booksJson = await fetchBooks()
    const { response: { books } } = booksJson

    const booksLength = books.length
    for(let i=0;i<booksLength;i++){
        const book = books[i]
        let chaptersJson = await fetchChapters(book.id)
        const {response:{chapters}} = chaptersJson
        json[book.id] = {chapters,verses:{}}
        const chaptersLength = chapters.length
        for(let j=0; j<chaptersLength; j++){
            const chapter = chapters[j]
            
            // REMOVE AWAIT FOR DOWNLOAD
            let verseJson =  await fetchVerse(chapter.id)
            // console.log(verseJson)
            json[book.id]['verses'][chapter.id] = parseVerse(verseJson)
            //HTML PARSING
            // parseVerseToHtml(chapter.id,verseJson)

            
        }
    }

    // console.log(json)
    await asyncWrite('index.json',JSON.stringify(json))

    

    
}

// test()
