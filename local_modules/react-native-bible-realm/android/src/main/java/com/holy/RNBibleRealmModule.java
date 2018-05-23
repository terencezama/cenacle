
package com.holy;

import android.os.Handler;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.holy.R;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmQuery;
import io.realm.RealmResults;

public class RNBibleRealmModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  RealmConfiguration config = null;
  /*
        version: 'fra-LSG',
        book: 'Gen',
        ord:1,
        chapter: 50,
   */



  private int chapters = 0;
  private int ord = -1;
  private int fontSize = 18;

  public RNBibleRealmModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;

    copyBundledRealmFile(reactContext.getResources().openRawResource(R.raw.bible), "bible.realm");
    Realm.init(reactContext);
    config = RealmDao.shared().getConfig();

  }

  @Override
  public String getName() {
    return "RNBibleRealm";
  }

  private String copyBundledRealmFile(InputStream inputStream, String outFileName) {
    try {
      File file = new File(reactContext.getFilesDir(), outFileName);
//      Log.d("bible_realm",reactContext.getFilesDir().getAbsolutePath());
      if(file.exists()){
        return null;
      }
      FileOutputStream outputStream = new FileOutputStream(file);
      byte[] buf = new byte[1024];
      int bytesRead;
      while ((bytesRead = inputStream.read(buf)) > 0) {
        outputStream.write(buf, 0, bytesRead);
      }
      outputStream.close();
      return file.getAbsolutePath();
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }
  @ReactMethod
  public void setFontSize(int _fontSize){
    fontSize = _fontSize;
  }

  //region Bible Page Api Method
  private String parseVerses(RealmResults<Verse> results){

    String data = "<html><body style=\"font-size:"+fontSize+"px;\">\n";
    for(Verse verse:results){
      data+= verse.getData();
    }
    data += "<script></script><div style=\"height:50px;\"></div></body></html>";
    return data;
  }

  @ReactMethod
  public void setChapter(final ReadableMap map){
    new Handler().post(new Runnable() {
      @Override
      public void run() {
        Realm realm = null;
        try {
          realm = Realm.getInstance(config);
          realm.executeTransaction(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {
//              Chapter chapter = realm.where(Chapter.class).equalTo("id",chapterId).findFirst();
//              sendEvent("bible-realm-set-chapter",chapter.getWritableMap());
              String bookId = map.getString("version")+":"+map.getString("book");
              String chapterId = bookId+"."+map.getInt("chapter");


              WritableMap index = Arguments.createMap();
              index.merge(map);

              Book book = realm.where(Book.class).equalTo("id",bookId).findFirst();
              chapters = book.getChaptersCount();
              ord = book.getOrd();

              RealmResults<Verse> results = realm.where(Verse.class).equalTo("chapterId",chapterId).findAll();
              String data = parseVerses(results);

              WritableMap map = Arguments.createMap();
              map.putString("data",data);
              map.putMap("index",index);
              map.putMap("book",book.getWritableMap());
              sendEvent("bible-realm-set-chapter",map);



            }
          });
        } finally {
          if(realm != null) {
            realm.close();
          }
        }
      }
    });

  }


  public void setBook(final int nord, final int delta){
    new Handler().post(new Runnable() {
      @Override
      public void run() {
        Realm realm = null;
        try {
          realm = Realm.getInstance(config);
          realm.executeTransaction(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {

              Book book = realm.where(Book.class).equalTo("ord",nord).findFirst();
              chapters = book.getChaptersCount();
              ord = book.getOrd();

              int chapter = delta == 1?1:chapters;
              String bookId = book.getId();
              String chapterId = bookId+"."+chapter;
              RealmResults<Verse> results = realm.where(Verse.class).equalTo("chapterId",chapterId).findAll();

              String data = parseVerses(results);

              WritableMap index = Arguments.createMap();
//              index.merge(map);
              index.putString("version",bookId.split(":")[0]);
              index.putString("book",bookId.split(":")[1]);
              index.putInt("ord",nord);
              index.putInt("chapter",chapter);

              WritableMap map = Arguments.createMap();
              map.putString("data",data);
              map.putMap("index",index);
              map.putMap("book",book.getWritableMap());
              sendEvent("bible-realm-set-chapter",map);



            }
          });
        } finally {
          if(realm != null) {
            realm.close();
          }
        }
      }
    });
  }

  @ReactMethod
  public void changeChapter(ReadableMap map){
    /*
    delta + or -1
    index
     */
    ReadableMap index = map.getMap("index");
    int delta         = map.getInt("delta");
    int chapter       = index.getInt("chapter");
    int nchapter      = chapter + delta;
    if(nchapter > chapters || nchapter < 1){
      //change of book
      int nord = ord + delta;
      if(nord <1 || nord > 66){
        nord = (delta == 1)? 1:66;
      }
      setBook(nord,delta);


    }else{
      WritableMap windex = Arguments.createMap();
      windex.merge(index);
      windex.putInt("chapter",nchapter);
      setChapter(windex);
    }

  }
  //endregion

  //region Bible Book Selector APi
  @ReactMethod
  public void fetchBooks(final ReadableMap map, final Promise promise){
    new Handler().post(new Runnable() {
      @Override
      public void run() {
        Realm realm = null;
        try {
          realm = Realm.getInstance(config);
          realm.executeTransaction(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {

              String order = map.getString("order");
              RealmResults<Book> result = realm.where(Book.class).findAll();
              if(order.equalsIgnoreCase("traditional")){
                result = result.sort("ord");
              }else if (order.equalsIgnoreCase("alphabetical")){
                result = result.sort("name");
              }

              WritableArray books = Arguments.createArray();
              for(Book book:result){
                books.pushMap(book.getWritableMap());
              }

//              sendEvent("bible-realm-books-fetched",books);
              promise.resolve(books);


            }
          });
        } finally {
          if(realm != null) {
            realm.close();
          }
        }
      }
    });
  }
  //endregion

  //region Events
  private void sendEvent(String event,@Nullable Object params) {
    this.reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(event, params);
  }

  //endregion
}