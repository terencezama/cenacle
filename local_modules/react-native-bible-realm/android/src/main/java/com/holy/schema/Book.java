package com.holy.schema;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import io.realm.RealmList;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.RealmClass;
import io.realm.annotations.Required;

/**
 * Created by Terence on 18/05/2018.
 */
@RealmClass
public class Book extends RealmObject {


    /*
    id:  'string',
    name: 'string',
    ord: 'int',
    version: 'string',
    chapters: 'Chapter[]',
    chaptersCount:'int'
     */

    @PrimaryKey
    @Required
    private String id;

    @Required
    private String name;


    private int ord;

    @Required
    private String version;





    private int chaptersCount;

    public WritableMap getWritableMap(){
        WritableMap map = Arguments.createMap();
        map.putString("id",getId());
        map.putString("name",getName());
        map.putInt("ord",getOrd());
        map.putInt("chaptersCount",getChaptersCount());

        return map;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getOrd() {
        return ord;
    }

    public void setOrd(int ord) {
        this.ord = ord;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }



    public int getChaptersCount() {
        return chaptersCount;
    }

    public void setChaptersCount(int chaptersCount) {
        this.chaptersCount = chaptersCount;
    }





}
