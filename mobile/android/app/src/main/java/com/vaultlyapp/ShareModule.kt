package com.vaultlyapp

import com.facebook.react.bridge.*

import com.facebook.react.modules.core.DeviceEventManagerModule

class ShareModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    companion object {

        var reactContextInstance:
            ReactApplicationContext? = null

        fun sendShareEvent(
            text: String
        ) {

            reactContextInstance
                ?.getJSModule(
                    DeviceEventManagerModule
                        .RCTDeviceEventEmitter::class.java
                )
                ?.emit(
                    "VaultlyShareReceived",
                    text
                )
        }
    }

    init {
        reactContextInstance = reactContext
    }

    override fun getName(): String {
        return "ShareModule"
    }

    @ReactMethod
    fun getInitialSharedText(
        promise: Promise
    ) {

        promise.resolve(
            MainActivity.sharedText
        )

    }
    @ReactMethod
    fun closeApp() {

        getCurrentActivity()?.finish()

    }
}