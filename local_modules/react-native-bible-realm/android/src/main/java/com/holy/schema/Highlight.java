package com.holy.schema;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.util.Date;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.Required;

/**
 * Created by Terence on 26/05/2018.
 */

public class Highlight extends RealmObject {

    @Required
    private String chapterId;

    @PrimaryKey
    @Required
    private String verseId;

    private int verseIndex;

    @Required
    private String title;

    @Required
    private String data;

    public WritableMap getWritableMap(){
        WritableMap map = Arguments.createMap();
        map.putString("chapterId",getChapterId());
        map.putString("date",getDate().toString());
        map.putInt("verseIndex",getVerseIndex());
        map.putString("title",getTitle());
        map.putString("data",getData());
        return map;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Required
    private Date date;

    public String getChapterId() {
        return chapterId;
    }

    public void setChapterId(String chapterId) {
        this.chapterId = chapterId;
    }

    public String getVerseId() {
        return verseId;
    }

    public void setVerseId(String verseId) {
        this.verseId = verseId;
    }

    public int getVerseIndex() {
        return verseIndex;
    }

    public void setVerseIndex(int verseIndex) {
        this.verseIndex = verseIndex;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
