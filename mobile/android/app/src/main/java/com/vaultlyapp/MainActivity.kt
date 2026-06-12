package com.vaultlyapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.content.Intent
import android.os.Bundle
import android.util.Log

class MainActivity : ReactActivity() {

    companion object {
        var sharedText: String? = null
    }

    override fun getMainComponentName(): String = "VaultlyApp"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(
            this,
            mainComponentName,
            fabricEnabled
        )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        handleShareIntent(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)

        handleShareIntent(intent)
    }

    private fun handleShareIntent(intent: Intent?) {

        if (intent?.action == Intent.ACTION_SEND) {

            val receivedText =
                intent.getStringExtra(
                    Intent.EXTRA_TEXT
                )

            sharedText = receivedText

            if (receivedText != null) {

                ShareModule.sendShareEvent(
                    receivedText
                )

            }

            Log.d(
                "VaultlyShare",
                "SAVED = $receivedText"
            )

            Log.d(
                "VaultlyShare",
                "RECEIVED = $receivedText"
            )
        }
    }
}