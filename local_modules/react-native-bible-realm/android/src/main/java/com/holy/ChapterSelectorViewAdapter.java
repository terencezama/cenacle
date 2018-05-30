package com.holy;
import android.content.Context;
import android.graphics.Color;
import android.support.annotation.Nullable;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.TextView;

import com.facebook.react.bridge.WritableMap;
import com.holy.schema.Book;

import io.realm.OrderedRealmCollection;

/**
 * Created by Terence on 22/05/2018.
 */

public class ChapterSelectorViewAdapter extends RecyclerView.Adapter<ChapterSelectorViewAdapter.ViewHolder> {
    OrderedRealmCollection<Book> _data;
    Context _context;
    Callback _callback;
    public  int selectedPosition;
    public void sortByOrder(){
        _data = _data.sort("ord");
        notifyDataSetChanged();
    }
    public void sortByName(){
        _data = _data.sort("name");
        notifyDataSetChanged();
    }


    public ChapterSelectorViewAdapter(Context context, @Nullable OrderedRealmCollection<Book> data, Callback callback) {
        _context = context;
       _data = data;
       _callback = callback;

    }


    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.row, parent, false);
        return new ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        final Book book = _data.get(position);
        holder.data = book;
        holder.title.setText(book.getName());
        Log.d("nice","Binding");
        if(position == selectedPosition){
            holder.title.setTextColor(Color.parseColor("#F76926"));
        }else{
            holder.title.setTextColor(Color.parseColor("#757575"));

        }
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(_callback != null){
                    _callback.onBookSelected(book.getWritableMap());
                }
            }
        });

    }



//    @Override
//    public long getItemId(int index) {
//        //noinspection ConstantConditions
//        return index;
//    }

    @Override
    public int getItemCount() {
        return _data.size();
    }


    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView title;
        CheckBox deletedCheckBox;
        public Book data;

        ViewHolder(View view) {
            super(view);
            title = (TextView) view.findViewById(R.id.textview);
//            deletedCheckBox = view.findViewById(R.id.checkBox);
        }
    }

    public interface Callback{
        public void onBookSelected(WritableMap book);
    }
}
