package com.holy.schema;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.util.Date;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.Required;

/**
 * Created by Terence on 24/05/2018.
 */

public class History extends RealmObject {



    @Required
    private String chapterId;

    @Required
    private Date date;

    @Required
    private String title;

    public WritableMap getWritableMap(){
        WritableMap map = Arguments.createMap();
        map.putString("chapterId",getChapterId());
        map.putString("date",getDate().toString());
        map.putString("title",getTitle());
        return map;
    }

    public String getChapterId() {
        return chapterId;
    }

    public void setChapterId(String chapterId) {
        this.chapterId = chapterId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
