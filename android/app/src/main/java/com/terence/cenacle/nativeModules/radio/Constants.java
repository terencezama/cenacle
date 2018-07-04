package com.terence.cenacle.nativeModules.radio;

/**
 * Created by leonardolerasse on 2018/05/08.
 */

public class Constants {
    public static String MEDIA_URL  = "media_url";
    public static String IS_LOCAL   = "is_local";
    public static String LOCAL_PATH = "local_path";

    public static String PLAY_RADIO  = "rc_play_radio";
    public static String PAUSE_RADIO = "rc_pause_radio";
    public static String STOP_RADIO  = "rc_stop_radio";
    public static String RADIO_ERROR = "rc_radio_error";

    public static String RADIO_ACTION = "action";
    public static String RADIO_DURATION = "duration";
    public static String RADIO_PROGRESS = "progress";

    //from service to view
    public static String RN_ACTION = "action";
    public static String BROADCAST_ACTION = "rc_radio_broadcast_action";
    public static String BROADCAST_ACTION_PARAM = "rc_radio_broadcast_action_param";

    public static String BROADCAST_PROGRESS_ACTION = "rc_radio_Progress_action";
    public static String BROADCAST_PROGRESS_PARAM = "rc_radio_progress_param";

    //from view to service.  User presses play pause on view, update notification bar view + pause service
    public static String BROADCAST_SERVICE_ACTION = "rc_radio_broadcast_service_action";

}
