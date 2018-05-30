package com.holy;

import android.content.Context;
import android.os.Handler;
import android.support.design.widget.TabLayout;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ProgressBar;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;


import io.realm.Realm;
import io.realm.RealmResults;

public class ChapterSelectorViewManager extends SimpleViewManager<View> {

    BRListView _booksView;
    BRChapterView _chaptersView;
    LinearLayout _listLayout;
    EventDispatcher eventDispatcher;

    public static final String REACT_CLASS = "ChapterSelector";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected View createViewInstance(ThemedReactContext reactContext) {

        eventDispatcher = reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();

        final View view = reactContext.getCurrentActivity().getLayoutInflater().inflate(R.layout.chapter_selector_layout,null);

        _listLayout = (LinearLayout) view.findViewById(R.id.listlayout);
        _booksView = (BRListView) view.findViewById(R.id.list);
        _chaptersView = (BRChapterView) view.findViewById(R.id.grid);
//        _listLayout.setVisibility(View.GONE);
        _chaptersView.setVisibility(View.INVISIBLE);

        _booksView.callback = new ChapterSelectorViewAdapter.Callback() {
            @Override
            public void onBookSelected(final WritableMap book) {
                _chaptersView.currentBook = Arguments.createMap();
                _chaptersView.currentBook.merge(book);

                _chaptersView.count = book.getInt("chaptersCount");
                _chaptersView.adapter.notifyDataSetChanged();
                _chaptersView.refresh();

                _chaptersView.setVisibility(View.VISIBLE);
                _listLayout.setVisibility(View.INVISIBLE);

                notifyBookSelected(view,book);


            }
        };

        _chaptersView.callback = new BRChapterView.ChapterSelectedCallback() {
            @Override
            public void selected(WritableMap chapter) {
                notifyChapterSelected(view,chapter);
            }
        };


        TabLayout tabLayout = (TabLayout) view.findViewById(R.id.tablayout);
        tabLayout.setOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                setOrder(view,tab.getPosition());
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

        return view;
    }

    @ReactProp(name = "order")
    public void setOrder(View parent, int order) {
        Log.d("nice","logging order"+order);
        BRListView list = (BRListView) parent.findViewById(R.id.list);
        if(order == 0){
            list.sortByOrder();
        }else{
            list.sortByName();
        }
    }

    @ReactProp(name = "viewType")
    public void setViewType(View parent, int type){
        Log.d("nice","logging type "+type);
        _chaptersView.setVisibility(View.INVISIBLE);
        _listLayout.setVisibility(View.VISIBLE);

    }

    @ReactProp(name = "scrollPosition")
    public void setScrollPosition(View parent, int position){
        BRListView list = (BRListView) parent.findViewById(R.id.list);
        Log.d("nice","scrolling to position"+position);
        list.adapter.selectedPosition = position;
        list.scrollToPosition(position);
//        RecyclerView.ViewHolder viewHolder = list.findViewHolderForAdapterPosition(position);
//        list.scrollToPositionWithOffset(0,viewHolder.itemView.getTop());

    }


    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "onBookSelected",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onBookSelected")))
                .put(
                        "onChapterSelected",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onChapterSelected")))
                .build();
    }


    //region event
    public void notifyBookSelected(final View view, final WritableMap book){


//        Handler handler = new Handler();
//        handler.postDelayed(new Runnable() {
//            @Override
//            public void run() {
//
//            }
//        },300);
        eventDispatcher.dispatchEvent(new Event(view.getId()) {
            @Override
            public String getEventName() {
                return "onBookSelected";
            }

            @Override
            public void dispatch(RCTEventEmitter rctEventEmitter) {
                rctEventEmitter.receiveEvent(getViewTag(),"onBookSelected",book);
            }
        });
    }

    public void notifyChapterSelected(final View view, final WritableMap chapter){
        eventDispatcher.dispatchEvent(new Event(view.getId()) {
            @Override
            public String getEventName() {
                return "onChapterSelected";
            }

            @Override
            public void dispatch(RCTEventEmitter rctEventEmitter) {
                rctEventEmitter.receiveEvent(getViewTag(),"onChapterSelected",chapter);
            }
        });
    }
    //endregion



}