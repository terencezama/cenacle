package com.holy;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.support.annotation.Nullable;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.AppCompatTextView;
import android.util.AttributeSet;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.TextView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

/**
 * Created by Terence on 23/05/2018.
 */

public class BRChapterView extends GridView {
    public interface ChapterSelectedCallback{
        public void selected(WritableMap chapter);
    }

    public int count = 10;
    public Adapter adapter = null;
    public ChapterSelectedCallback callback = null;
    public WritableMap currentBook = null;

    //region constructpr
    public BRChapterView(Context context) {
        super(context);
        init();
    }

    public BRChapterView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public BRChapterView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    //endregion

    //region Initialization
    public void init(){
        adapter = new Adapter();
        setAdapter(adapter);

        setOnItemClickListener(new OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                if(callback != null){
                    WritableMap map = Arguments.createMap();
                    map.merge(currentBook);
                    map.putInt("chapter",i+1);
                    callback.selected(map);
                }
            }
        });
    }
    //endregion


    //region Adapter Class
    public class Adapter extends BaseAdapter{

        @Override
        public int getCount() {
            return count;
        }

        @Override
        public Object getItem(int i) {
            return null;
        }

        @Override
        public long getItemId(int i) {
            return i;
        }

        @Override
        public View getView(int i, View view, ViewGroup viewGroup) {
            BRChapterNumber dummyTextView = new BRChapterNumber(getContext());
            dummyTextView.setText(String.valueOf(i+1));
            dummyTextView.setGravity(Gravity.CENTER);
            dummyTextView.setBackground(ContextCompat.getDrawable(getContext(),R.drawable.border));
            return dummyTextView;
        }
    }
    //endregion

    //region TextView Class
    public class BRChapterNumber extends AppCompatTextView{

        public BRChapterNumber(Context context) {
            super(context);
        }

        public BRChapterNumber(Context context, @Nullable AttributeSet attrs) {
            super(context, attrs);
        }

        public BRChapterNumber(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
            super(context, attrs, defStyleAttr);
        }

        @Override
        protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
            super.onMeasure(widthMeasureSpec, widthMeasureSpec);
        }



    }
    //endregion

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
}
