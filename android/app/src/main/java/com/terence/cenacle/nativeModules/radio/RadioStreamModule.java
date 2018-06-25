package com.terence.cenacle.nativeModules.radio;

import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by leonardolerasse on 2018/05/25.
 */

public class RadioStreamModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private static final String MODULE_NAME = "RadioStreamModule";
    private RadioService radioService;
    private boolean serviceBound = false;

    public RadioStreamModule(ReactApplicationContext reactContext) {
        super(reactContext);
        registerRadioReceivers();
        getReactApplicationContext().addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void playRadio(String radioUrl) {

        Intent playerIntent = new Intent(getReactApplicationContext(), RadioService.class);
        playerIntent.putExtra(Constants.MEDIA_URL, radioUrl );
        playerIntent.setAction(Constants.PLAY_RADIO);
        getReactApplicationContext().startService(playerIntent);

        getReactApplicationContext().bindService(playerIntent, serviceConnection, Context.BIND_AUTO_CREATE);
    }

    @ReactMethod
    public void pauseRadio() {
        Intent broadcastIntent = new Intent(Constants.BROADCAST_SERVICE_ACTION);
        broadcastIntent.putExtra(Constants.BROADCAST_ACTION, Constants.PAUSE_RADIO);
        getReactApplicationContext().sendBroadcast(broadcastIntent);
    }

    //Binding this Client to the AudioPlayer Service
    private ServiceConnection serviceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            // We've bound to LocalService, cast the IBinder and get LocalService instance
            RadioService.LocalBinder binder = (RadioService.LocalBinder) service;
            radioService = binder.getService();
            serviceBound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            serviceBound = false;
        }
    };

    //Lifecycle Methods
    @Override
    public void onHostResume() {}

    @Override
    public void onHostPause() {}

    @Override
    public void onHostDestroy() {
        if (serviceBound) {
            getReactApplicationContext().unbindService(serviceConnection);
            radioService.stopSelf();
        }
    }

    /**
     * Broadcast receivers
     *
     * RECEIVER FOR PLAY PAUSE
     */
    private BroadcastReceiver radioServiceReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {

            //Action strings to know if radio is playing or paused
            String value = intent.getStringExtra(Constants.BROADCAST_ACTION_PARAM);

            WritableMap actionMap = Arguments.createMap();
            actionMap.putString("type", Constants.RADIO_ACTION);
            actionMap.putString("value", value);

            WritableMap params = Arguments.createMap();
            params.putMap(Constants.RN_ACTION, actionMap);
            sendEvent(getReactApplicationContext(), Constants.BROADCAST_ACTION, params);

            //update the ui wih the duration of the file once the file is ready and playing
            if(value.equals(Constants.PLAY_RADIO)){
                getPlayerDuration();
            }
        }
    };

    /***
     *
     * RECEIVER FOR FILE PROGRESS
     */
    private BroadcastReceiver streamProgressReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {

            //Action strings to know if radio is playing or paused
            String value = intent.getStringExtra(Constants.BROADCAST_PROGRESS_PARAM);

            WritableMap actionMap = Arguments.createMap();
            actionMap.putString("type", Constants.RADIO_PROGRESS);
            actionMap.putString("value", value);

            WritableMap params = Arguments.createMap();
            params.putMap(Constants.RN_ACTION, actionMap);
            sendEvent(getReactApplicationContext(), Constants.BROADCAST_ACTION, params);

        }
    };

    private void registerRadioReceivers() {
        IntentFilter filter = new IntentFilter(Constants.BROADCAST_ACTION);
        getReactApplicationContext().registerReceiver(radioServiceReceiver, filter);

        IntentFilter filterProgress = new IntentFilter(Constants.BROADCAST_PROGRESS_ACTION);
        getReactApplicationContext().registerReceiver(streamProgressReceiver, filterProgress);
    }

     /*
     * Send events to Js
     */
    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    /**
     * Utils
     */

    public void  getPlayerDuration(){
        String progress = "";
        if(radioService != null){
            progress = radioService.getMediaPlayerDuration();

        }

        WritableMap durationMap = Arguments.createMap();
        durationMap.putString("type", Constants.RADIO_DURATION);
        durationMap.putString("value", progress);

        WritableMap params = Arguments.createMap();
        params.putMap (Constants.RN_ACTION, durationMap );
        sendEvent(getReactApplicationContext(), Constants.BROADCAST_ACTION, params);
    }

}
