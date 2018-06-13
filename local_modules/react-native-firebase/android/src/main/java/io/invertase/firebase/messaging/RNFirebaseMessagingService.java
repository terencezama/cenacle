package io.invertase.firebase.messaging;

import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

import io.invertase.firebase.R;
import io.invertase.firebase.Utils;

public class RNFirebaseMessagingService extends FirebaseMessagingService {
  private static final String TAG = "RNFMessagingService";
  public static final String MESSAGE_EVENT = "messaging-message";
  public static final String REMOTE_NOTIFICATION_EVENT = "notifications-remote-notification";

  @Override
  public void onMessageReceived(RemoteMessage message) {
    Log.d(TAG, "onMessageReceived nice event received");
      Map<String,String> data = message.getData();
      Log.d(TAG, "map:"+data.toString());
    if (message.getNotification() != null) {
      // It's a notification, pass to the Notifications module
      Intent notificationEvent = new Intent(REMOTE_NOTIFICATION_EVENT);
      notificationEvent.putExtra("notification", message);

      // Broadcast it to the (foreground) RN Application
      LocalBroadcastManager.getInstance(this).sendBroadcast(notificationEvent);
    } else {
      // It's a data message


      if(data.containsKey("type") && data.get("type").equalsIgnoreCase("notif")){
        //Background Heads up Notification message
        NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.notif)
                .setContentTitle(data.get("title"))
                .setContentText(data.get("message"))
                .setPriority(NotificationCompat.PRIORITY_HIGH);


        return;
      }
      // If the app is in the foreground we send it to the Messaging module
      if (Utils.isAppInForeground(this.getApplicationContext())) {
        Intent messagingEvent = new Intent(MESSAGE_EVENT);
        messagingEvent.putExtra("message", message);
        // Broadcast it so it is only available to the RN Application
        LocalBroadcastManager.getInstance(this).sendBroadcast(messagingEvent);
      } else {
        try {
          // If the app is in the background we send it to the Headless JS Service
          Intent headlessIntent = new Intent(this.getApplicationContext(), RNFirebaseBackgroundMessagingService.class);
          headlessIntent.putExtra("message", message);
          this.getApplicationContext().startService(headlessIntent);
          HeadlessJsTaskService.acquireWakeLockNow(this.getApplicationContext());
        } catch (IllegalStateException ex) {
          Log.e(TAG, "Background messages will only work if the message priority is set to 'high'", ex);
        }
      }
    }
  }
}
