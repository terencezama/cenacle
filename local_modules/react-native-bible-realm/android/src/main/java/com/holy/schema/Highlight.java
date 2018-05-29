package com.holy.schema;

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
