package io.instamobile.videoplayer;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.provider.MediaStore;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class VideoPlayerModule extends ReactContextBaseJavaModule implements ActivityEventListener {

  public final int VIDEO_CODE = 1;

  public VideoPlayerModule(ReactApplicationContext reactContext) {
      super(reactContext);
  }

  @Override
  public String getName() {
      return "VideoPlayerManager";
  }

  @ReactMethod
  public void showVideoPlayer(String url) {
      Activity currentActivity = getCurrentActivity();
      if (currentActivity != null) {
          Intent videoIntent = new Intent(Intent.ACTION_VIEW);
          videoIntent.setDataAndType(Uri.parse(url), "video/*");
          currentActivity.startActivityForResult(videoIntent, VIDEO_CODE);
      }
  }

  @Override
  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
      if (requestCode == VIDEO_CODE) {
          getCurrentActivity().finish();
      }
  }

  @Override
  public void onNewIntent(Intent intent) {

  }
}
