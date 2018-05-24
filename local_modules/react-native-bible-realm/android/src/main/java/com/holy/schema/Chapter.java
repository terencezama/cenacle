package com.holy.schema;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.RealmClass;
import io.realm.annotations.Required;

/**
 * Created by Terence on 18/05/2018.
 */
@RealmClass
public class Chapter extends RealmObject {
    /*
    id:     'string',
    data: 'string',
    bookId: 'string'
    */
    @PrimaryKey
    @Required
    private String id;


    private String data;
    @Required
    private String bookId;

    public WritableMap getWritableMap(){
        WritableMap map = Arguments.createMap();
        map.putString("id",getId());
        map.putString("data",getData());
        map.putString("bookId",getBookId());
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

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }


}
