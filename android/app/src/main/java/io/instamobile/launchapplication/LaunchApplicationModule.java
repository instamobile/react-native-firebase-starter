package io.instamobile.launchapplication;

import android.app.KeyguardManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.app.Activity;
import android.os.PowerManager;
import android.view.WindowManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import static android.content.Context.POWER_SERVICE;

public class LaunchApplicationModule extends ReactContextBaseJavaModule {

  private String launchManagerData;
  private final ReactApplicationContext reactContext;

  public LaunchApplicationModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "LaunchManager";
  }

  @ReactMethod
  public void openAppWithData(String data) {
    this.launchManagerData = data;

    PowerManager.WakeLock screenLock = ((PowerManager) getReactApplicationContext().getSystemService(POWER_SERVICE)).newWakeLock(
            PowerManager.SCREEN_BRIGHT_WAKE_LOCK | PowerManager.ACQUIRE_CAUSES_WAKEUP, "TAG");
    screenLock.acquire();

    screenLock.release();
    KeyguardManager km = (KeyguardManager) getReactApplicationContext().getSystemService(Context.KEYGUARD_SERVICE);
    final KeyguardManager.KeyguardLock kl = km.newKeyguardLock("MyKeyguardLock");
    kl.disableKeyguard();

  //  Intent dialogIntent = new Intent(getReactApplicationContext(), MainActivity.class);
    Intent dialogIntent = getReactApplicationContext().getPackageManager().getLaunchIntentForPackage("io.instamobile");

    dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK );
    dialogIntent.addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED +
            WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD +
            //      WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON +
            WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);

    getReactApplicationContext().startActivity(dialogIntent);
  }

  @ReactMethod
  public void getLaunchManagerData(Callback callback) {
    callback.invoke(this.launchManagerData);
  }
  
  @ReactMethod
  public void resetLaunchManagerData() {
      this.launchManagerData = null;
  }
}