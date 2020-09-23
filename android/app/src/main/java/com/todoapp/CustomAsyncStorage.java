package com.todoapp;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

import android.content.Context;
import android.content.SharedPreferences;
import com.facebook.react.bridge.Callback;

public class CustomAsyncStorage extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private SharedPreferences mSharedPreferences;
  private String shared_name = "custom_storate";
  private String appStateKey = "appState";

  CustomAsyncStorage(ReactApplicationContext context) {
    super(context);
    reactContext = context;

    mSharedPreferences = context.getSharedPreferences(shared_name, Context.MODE_PRIVATE);
  }

  @Override
  public String getName() {
    return "CustomAsyncStorage";
  }

  @ReactMethod
  public void storeAppState(String appState) {
    SharedPreferences.Editor editor = mSharedPreferences.edit();
    editor.putString(appStateKey, (String) appState).commit();
  }

  @ReactMethod
  public void getAppState(Callback successCallback) {
    String appState = mSharedPreferences.getString(appStateKey, null);
    successCallback.invoke(appState);
  }
}