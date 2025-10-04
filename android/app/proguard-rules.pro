# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.yoga.** { *; }
-keep class com.facebook.soloader.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.uimanager.** { *; }
-keep class com.facebook.react.modules.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# React Native Reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# React Native Vector Icons
-keep class com.oblador.vectoricons.** { *; }

# React Native Paper
-keep class com.callstack.reactnativepaper.** { *; }

# React Native Safe Area Context
-keep class com.th3rdwave.safeareacontext.** { *; }

# React Native Gesture Handler
-keep class com.swmansion.gesturehandler.** { *; }

# React Native Screens
-keep class com.swmansion.rnscreens.** { *; }

# React Native SVG
-keep class com.horcrux.svg.** { *; }

# React Native WebView
-keep class com.reactnativecommunity.webview.** { *; }

# React Native Device Info
-keep class com.learnium.RNDeviceInfo.** { *; }

# React Native Async Storage
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# React Native Toast Message
-keep class com.reactnativetoastmessage.** { *; }

# React Native Modal
-keep class com.reactnativecommunity.modal.** { *; }

# React Native Swiper
-keep class com.reactnativecommunity.swiper.** { *; }

# React Native Loading Spinner Overlay
-keep class com.reactnativecommunity.loadingspinneroverlay.** { *; }

# React Native Raw Bottom Sheet
-keep class com.reactnativecommunity.rawbottomsheet.** { *; }

# React Native Size Matters
-keep class com.reactnativecommunity.sizematters.** { *; }

# React Native Freshchat SDK
-keep class com.freshchat.** { *; }
-keep class com.freshworks.** { *; }
-keep class com.freshchat.consumer.sdk.** { *; }
-keep class com.freshchat.consumer.sdk.react.** { *; }
-keep class com.google.firebase.** { *; }
-dontwarn com.freshchat.**
-dontwarn com.freshworks.**
-dontwarn com.google.firebase.**

# Expo
-keep class expo.modules.** { *; }
-keep class com.facebook.react.bridge.** { *; }

# Redux
-keep class com.reactredux.** { *; }

# Axios
-keep class com.axios.** { *; }

# Moment.js
-keep class com.moment.** { *; }

# Date-fns
-keep class com.datefns.** { *; }

# Lottie
-keep class com.airbnb.lottie.** { *; }

# Lucide React Native
-keep class com.lucide.** { *; }

# General React Native rules
-keep class * extends com.facebook.react.bridge.ReactContextBaseJavaModule { *; }
-keep class * extends com.facebook.react.bridge.BaseJavaModule { *; }
-keep class * extends com.facebook.react.bridge.ReactMethod { *; }

# Keep native methods
-keepclassmembers class * {
    native <methods>;
}

# Keep serializable classes
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# Keep enums
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep Parcelable
-keep class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}

# Keep R class
-keep class **.R
-keep class **.R$* {
    <fields>;
}

# Keep all native library names
-keep class * {
    native <methods>;
}

# BouncyCastle and cryptography related rules
-keep class org.bouncycastle.** { *; }
-dontwarn org.bouncycastle.**

# JNDI/LDAP related classes (not available on Android)
-dontwarn javax.naming.**
-dontwarn javax.naming.directory.**
-dontwarn javax.naming.spi.**

# Keep BouncyCastle provider
-keep class org.bouncycastle.jce.provider.** { *; }

# Freshchat specific rules for BouncyCastle
-keep class com.freshchat.** { *; }
-dontwarn com.freshchat.**
-keep class com.freshworks.** { *; }
-dontwarn com.freshworks.**

# Don't warn about missing classes
-dontwarn com.facebook.react.**
-dontwarn com.facebook.jni.**
-dontwarn com.facebook.yoga.**
-dontwarn com.facebook.soloader.**
-dontwarn expo.modules.**
-dontwarn com.swmansion.**
-dontwarn com.oblador.**
-dontwarn com.callstack.**
-dontwarn com.th3rdwave.**
-dontwarn com.horcrux.**
-dontwarn com.reactnativecommunity.**
-dontwarn com.learnium.**
-dontwarn com.airbnb.**
-dontwarn com.lucide.**
-dontwarn com.axios.**
-dontwarn com.moment.**
-dontwarn com.datefns.**
-dontwarn com.reactredux.**
-dontwarn com.reactnativetoastmessage.**

# Additional cryptography rules
-keepclassmembers class * {
    native <methods>;
}

# Keep all crypto classes
-keep class javax.crypto.** { *; }
-keep class java.security.** { *; }
-dontwarn javax.crypto.**
-dontwarn java.security.**

# Keep all SSL/TLS related classes
-keep class javax.net.ssl.** { *; }
-keep class com.android.org.conscrypt.** { *; }
-dontwarn javax.net.ssl.**
-dontwarn com.android.org.conscrypt.**
