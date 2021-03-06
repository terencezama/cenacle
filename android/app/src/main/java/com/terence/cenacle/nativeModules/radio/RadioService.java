package com.terence.cenacle.nativeModules.radio;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Binder;
import android.os.Handler;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.NotificationManagerCompat;
import android.util.Log;
import android.widget.RemoteViews;
import android.widget.Toast;

import com.facebook.react.bridge.ReactContext;
import com.terence.cenacle.MainActivity;
import com.terence.cenacle.R;


import java.io.IOException;

/**
 * Created by leonardolerasse on 2018/05/25.
 */

public class RadioService extends Service implements
        MediaPlayer.OnCompletionListener,
        MediaPlayer.OnPreparedListener,
        MediaPlayer.OnErrorListener {

    private MediaPlayer mediaPlayer;

    private static final int NOTIF_ID = 130;
    private Notification notification;
    private RemoteViews notificationViews;
    private NotificationManagerCompat notificationManager;
    private ReactContext reactContext;
    private boolean isRadioPlaying;
    public int duration = 0;
    public String mMediaUrl;
    public String currentUrl = "";

    //for updating UI with file progress
    private Handler mSeekbarUpdateHandler = new Handler();

    public void seekMediaTo(int position) {
        mediaPlayer.seekTo(position);
    }

    public class LocalBinder extends Binder {
        public RadioService getService() {
            return RadioService.this;
        }
    }

    // Binder given to clients
    private final IBinder iBinder = new LocalBinder();

    @Override
    public void onCreate() {
        super.onCreate();
        registerRadioReceivers();
    }

    /**
     * Receives commands from notification view
     */
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if(reactContext == null){
            reactContext = new ReactContext(getApplicationContext());
        }

        try {
            //Called from activity if service not bound
            if (intent.getAction().equals(Constants.PLAY_RADIO)) {

                String url = intent.getStringExtra(Constants.MEDIA_URL);

                if(mediaPlayer == null || url != null){
                    if(!currentUrl.equals(url)){
                        currentUrl = url;
                        initMediaPlayer(
                                url,
                                intent.getBooleanExtra(Constants.IS_LOCAL, false),
                                intent.getStringExtra(Constants.LOCAL_PATH));
                    }else{
                        playMedia();
                    }
                } else{
                    playMedia();
                }
            }
            else if (intent.getAction().equals(Constants.PAUSE_RADIO)) {
                 pauseMedia();

            }
            else if(intent.getAction().equals(Constants.STOP_RADIO)){
                stopMedia();
            }
        }catch (Exception e){
            stopSelf();
        }

        return super.onStartCommand(intent, flags, startId);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return iBinder;
    }

    /**
     * Release instance of mediaPlayer if file is playing
     */

    private void releaseMP() {
        if (mediaPlayer != null) {
            try {
                mediaPlayer.release();
                mediaPlayer = null;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * When user presses play on UI, service is initiated here
     */
    private void initMediaPlayer(String mediaUrl, boolean isLocal, String localPath) {

        releaseMP();

        if(isLocal){
            mMediaUrl = localPath;
        }else{
            mMediaUrl = mediaUrl;
        }

        mediaPlayer = new MediaPlayer();
        //Set up MediaPlayer event listeners
        mediaPlayer.setOnCompletionListener(this);
        mediaPlayer.setOnErrorListener(this);
        mediaPlayer.setOnPreparedListener(this);

        try {

            if(isLocal){
                mediaPlayer.setDataSource(localPath);
            }
            else{
                mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
                mediaPlayer.setDataSource(mediaUrl);
            }
        } catch (IOException e) {
            e.printStackTrace();
            stopSelf();
        }
        mediaPlayer.prepareAsync();

    }

    private void removeNotification() {
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.cancel(NOTIF_ID);
    }

    public void showNotification(){

        //Open an activity in the app that corresponds to the notification
        Intent notificationIntent = new Intent(reactContext, MainActivity.class);
        notificationIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent contentPendingIntent = PendingIntent.getActivity(this, (int)System.currentTimeMillis(), notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        notificationViews = new RemoteViews(reactContext.getPackageName(), R.layout.notification_layout);
        //Bind views to intent
        notificationViews.setOnClickPendingIntent(R.id.imgNotifPlay, pauseRadio());
        notificationViews.setOnClickPendingIntent(R.id.imgNotifClear, stopRadio() );
//
        notificationViews.setTextViewText(R.id.txtNotifTitle, reactContext.getResources().getString(R.string.notif_player_title));

        notification = new NotificationCompat.Builder(reactContext)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContent(notificationViews)
                .setAutoCancel(false)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                // Set the intent that will fire when the user taps the notification
                .setContentIntent(contentPendingIntent)
                .setOngoing(true)
                .setShowWhen(false)
                .build();

        notificationManager = NotificationManagerCompat.from(reactContext);
        // notificationId is a unique int for each notification that you must define
        notificationManager.notify(NOTIF_ID, notification);
    }

    public void playMedia() {
        if (!mediaPlayer.isPlaying()) {
            showNotification();

            isRadioPlaying = true;
            mediaPlayer.start();

            notificationViews.setOnClickPendingIntent(R.id.imgNotifPlay, pauseRadio());
            notificationViews.setImageViewResource(R.id.imgNotifPlay, R.drawable.ic_pause_black_24dp);
            notification.contentView = notificationViews;
            notificationManager.notify(NOTIF_ID, notification);

            Intent broadcastIntent = new Intent(Constants.BROADCAST_ACTION);
            broadcastIntent.putExtra(Constants.BROADCAST_ACTION_PARAM, Constants.PLAY_RADIO);
            sendBroadcast(broadcastIntent);


            //update UI's progress seekbar

            mSeekbarUpdateHandler.postDelayed(mUpdateSeekbar, 0);
        }
    }

    private void stopMedia() {
        if (mediaPlayer == null) return;

        if (mediaPlayer.isPlaying()) {
            isRadioPlaying = false;
            mediaPlayer.stop();
            mediaPlayer.release();
        }

        mediaPlayer = null;
        stopSelf();
        removeNotification();

        Intent broadcastIntent = new Intent(Constants.BROADCAST_ACTION);
        broadcastIntent.putExtra(Constants.BROADCAST_ACTION_PARAM, Constants.PAUSE_RADIO);
        sendBroadcast(broadcastIntent);

        mSeekbarUpdateHandler.removeCallbacks(mUpdateSeekbar);
    }

    public void pauseMedia() {
        if (mediaPlayer.isPlaying()) {
            isRadioPlaying = false;
            mediaPlayer.pause();

            notificationViews.setOnClickPendingIntent(R.id.imgNotifPlay, playRadio());
            notificationViews.setImageViewResource(R.id.imgNotifPlay, R.drawable.ic_play_arrow_black_24dp);
            notification.contentView = notificationViews;
            notificationManager.notify(NOTIF_ID, notification);

            Intent broadcastIntent = new Intent(Constants.BROADCAST_ACTION);
            broadcastIntent.putExtra(Constants.BROADCAST_ACTION_PARAM, Constants.PAUSE_RADIO);
            sendBroadcast(broadcastIntent);

            mSeekbarUpdateHandler.removeCallbacks(mUpdateSeekbar);
        }
    }

    /**
     * For updating UI Views
     * */
    public int getMediaPlayerDuration(){
        return  duration;
    }

    /**
     *Intents for notification view layout buttons
     */
    private PendingIntent pauseRadio(){
        Intent pauseIntent = new Intent(reactContext, RadioService.class);
        pauseIntent.setAction(Constants.PAUSE_RADIO);
        return PendingIntent.getService(reactContext, 0, pauseIntent, 0);
    }

    private PendingIntent playRadio(){
        Intent playIntent = new Intent(reactContext, RadioService.class);
        playIntent.setAction(Constants.PLAY_RADIO);
        return PendingIntent.getService(reactContext, 1, playIntent, 0);
    }

    private PendingIntent stopRadio(){
        Intent playIntent = new Intent(reactContext, RadioService.class);
        playIntent.setAction(Constants.STOP_RADIO);
        return PendingIntent.getService(reactContext, 2, playIntent, 0);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        stopMedia();
    }

    @Override
    public void onCompletion(MediaPlayer mediaPlayer) {

        //when finished reading file
        Intent broadcastIntent = new Intent(Constants.BROADCAST_ACTION);
        broadcastIntent.putExtra(Constants.BROADCAST_ACTION_PARAM, Constants.RADIO_FINISHED);
        sendBroadcast(broadcastIntent);

        stopRadio();
        stopSelf();
    }

    @Override
    public boolean onError(MediaPlayer mediaPlayer, int errorId, int extra) {
        switch (errorId) {
            case MediaPlayer.MEDIA_ERROR_NOT_VALID_FOR_PROGRESSIVE_PLAYBACK:
                Log.d("MediaPlayer Error", "MEDIA ERROR NOT VALID FOR PROGRESSIVE PLAYBACK " + extra);
                break;
            case MediaPlayer.MEDIA_ERROR_SERVER_DIED:
                Log.d("MediaPlayer Error", "MEDIA ERROR SERVER DIED " + extra);
                break;
            case MediaPlayer.MEDIA_ERROR_UNKNOWN:
                Log.d("MediaPlayer Error", "MEDIA ERROR UNKNOWN " + extra);
                break;
        }

        stopMedia();

        Intent broadcastIntent = new Intent(Constants.BROADCAST_ACTION);
        broadcastIntent.putExtra(Constants.BROADCAST_ACTION_PARAM, Constants.RADIO_ERROR);
        sendBroadcast(broadcastIntent);

        return false;
    }

    @Override
    public void onPrepared(MediaPlayer mediaPlayer) {
        MediaPlayer mp = MediaPlayer.create(this, Uri.parse(mMediaUrl));
        duration = mp.getDuration();
        mp.release();
        playMedia();
    }

    /**
     * Broadcast receivers, UI update service state
     */

    private BroadcastReceiver radioServiceReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getStringExtra(Constants.BROADCAST_ACTION);
            if(action.equals(Constants.PAUSE_RADIO)){
                pauseMedia();
            }
        }
    };

    private void registerRadioReceivers() {
        //Register playNewMedia receiver
        IntentFilter filter = new IntentFilter(Constants.BROADCAST_SERVICE_ACTION);
        registerReceiver(radioServiceReceiver, filter);
    }

    //function to send event to update UI's Seekbar
    private Runnable mUpdateSeekbar = new Runnable() {
        @Override
        public void run() {

            Intent broadcastIntent = new Intent(Constants.BROADCAST_PROGRESS_ACTION);
            broadcastIntent.putExtra(Constants.BROADCAST_PROGRESS_PARAM, mediaPlayer.getCurrentPosition());
            sendBroadcast(broadcastIntent);
            mSeekbarUpdateHandler.postDelayed(this, 1000);
        }
    };

}
