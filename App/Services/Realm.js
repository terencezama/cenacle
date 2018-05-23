import schema from '../../bible/schema'
// import Realm from 'realm'
import fs from 'react-native-fs'




// fs.copyFileAssets('index.realm', fs.DocumentDirectoryPath + '/index.realm').
// then((result) => {
//   console.log('copy result',result)
//   readAssetDir()
//   readDocDir()

//   console.log('realm',realm)
// }).catch((error) => console.log(error));

let _realm = null
const realmString = 'index.realm'
const forceCopy = false

checkRealmInAssets = async () => {
const assetResult = await fs.readDirAssets('')
  const constainsInAsset = assetResult.some((elem)=>{
    return elem.name.includes(realmString)
  })
  console.log('contains index realm in asset',constainsInAsset)
  return constainsInAsset
}

checkRealmInDocs = async () => {
  //read doc directory check for index.realm 
  const docResult = await fs.readDir(fs.DocumentDirectoryPath)
  const containsInDoc = docResult.some((elem)=>{
    return elem.name.includes(realmString)
  })
  console.log('contains index realm in doc',containsInDoc)
  return containsInDoc
}

deleteRealmInDocs = async () => {
  return await fs.unlink(fs.DocumentDirectoryPath+`/${realmString}`)
}
//file to be used is name index.realm 
loadRealm = async () => {
  
  // await deleteRealmInDocs()
  await checkRealmInAssets()
  const containsInDoc = await checkRealmInDocs()
  
  if(!containsInDoc || forceCopy){
    //copying index.realm
    console.log('copying realm ...')
    const copyResult = await fs.copyFileAssets(realmString,fs.DocumentDirectoryPath+`/${realmString}`)
    console.log('copyResult',copyResult)

    //verifying file exist
    await checkRealmInAssets()
  }

}
realm =()=>{
  if(_realm)return _realm;

  Realm.open({
    path:fs.DocumentDirectoryPath+`/${realmString}`,
    schema:[schema.BookSchema,schema.ChapterSchema],
    readOnly: true
  }).then(realm=>{
    _realm = realm
    console.log('realm loaded')
  }).catch(error=>{

  });
  return _realm
}

loadRealm()

/*
new Realm({
  path:fs.DocumentDirectoryPath+'/index.realm',
  schema:[schema.BookSchema,schema.ChapterSchema],
  readOnly: true
});
*/
export default realm


