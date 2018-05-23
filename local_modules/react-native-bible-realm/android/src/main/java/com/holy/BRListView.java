package com.holy;

import android.content.Context;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.DisplayMetricsHolder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.ArrayList;
import java.util.List;

import io.realm.OrderedRealmCollection;
import io.realm.Realm;

/**
 * Created by Terence on 22/05/2018.
 */

public class BRListView extends RecyclerView {
    public ChapterSelectorViewAdapter adapter;
    private OrderedRealmCollection<Book> data;
    public ChapterSelectorViewAdapter.Callback callback;




    //region constructor
    public BRListView(Context context) {
        super(context);
        init();
    }

    public BRListView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public BRListView(Context context, @Nullable AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }
    //endregion

    public void init(){
        setLayoutManager(new LinearLayoutManager(getContext()));
        Realm realm = Realm.getInstance(RealmDao.shared().getConfig());
        data = realm.where(Book.class).findAll();
        adapter = new ChapterSelectorViewAdapter(getContext(), data, new ChapterSelectorViewAdapter.Callback() {
            @Override
            public void onBookSelected(WritableMap book) {
                itemClicked(book);
            }
        });
        setAdapter(adapter);
//        eventDispatcher = ((ReactContext) getContext()).getNativeModule(UIManagerModule.class).getEventDispatcher();
    }

    //region item management
    public void itemClicked(final WritableMap book){
        Log.d("nice","itemClicked "+book.toString());
        if(callback != null){
            callback.onBookSelected(book);
        }

    }
    //endregion

    //region sorting
    public void sortByOrder(){
       adapter.sortByOrder();
        adapter.notifyDataSetChanged();
        refresh();
    }
    public void sortByName(){
        adapter.sortByName();
        adapter.notifyDataSetChanged();
        refresh();
    }
    //endregion

    //region ui refresh
    public void refresh(){
        this.measure(
                MeasureSpec.makeMeasureSpec(getMeasuredWidth(), MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(getMeasuredHeight(), MeasureSpec.EXACTLY)
        );
        this.layout(
                getLeft(),
                getTop(),
                getMeasuredWidth()+getLeft(),
                getMeasuredHeight()+getTop());
    }
    //endregion







}
