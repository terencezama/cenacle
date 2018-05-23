package com.holy;

import io.realm.RealmConfiguration;

/**
 * Created by Terence on 22/05/2018.
 */

public class RealmDao {
    private static final RealmDao ourInstance = new RealmDao();

    public static RealmDao shared() {
        return ourInstance;
    }
    RealmConfiguration config = null;

    private RealmDao() {
    }

    public RealmConfiguration getConfig(){
        if(config == null){
            config = new RealmConfiguration.Builder()
                    .name("bible.realm")
                    .schemaVersion(1)
                    .build();
        }
        return config;
    }
}
