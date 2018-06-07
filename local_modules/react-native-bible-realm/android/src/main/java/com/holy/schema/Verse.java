package com.holy.schema;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.Required;

/**
 * Created by Terence on 18/05/2018.
 */

public class Verse extends RealmObject {

    @PrimaryKey
    @Required
    private String id;

    @Required
    private String data;


    private  int ord;

    @Required
    private  String bookId;

    @Required
    private  String chapterId;

    public WritableMap getWritableMap(){
        WritableMap map = Arguments.createMap();
        map.putString("id",getId());
        map.putString("data",getData());
        map.putInt("ord",getOrd());
        map.putString("bookId",getBookId());
        map.putString("chapterId",getChapterId());
        return map;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public int getOrd() {
        return ord;
    }

    public void setOrd(int ord) {
        this.ord = ord;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getChapterId() {
        return chapterId;
    }

    public void setChapterId(String chapterId) {
        this.chapterId = chapterId;
    }




}
