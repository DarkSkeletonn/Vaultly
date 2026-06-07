package com.vaultlyapp

import android.provider.MediaStore
import com.facebook.react.bridge.*
import android.util.Log
import android.content.ContentUris
import android.os.Environment
import java.io.File

class GalleryModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "GalleryModule"
    }

    @ReactMethod
    fun getImages(promise: Promise) {

        try {

            val images = Arguments.createArray()

            val projection = arrayOf(
                MediaStore.Images.Media._ID,
                MediaStore.Images.Media.DISPLAY_NAME
            )

            val cursor = reactApplicationContext.contentResolver.query(
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                projection,
                null,
                null,
                null
            )

            cursor?.use {

                println("TOTAL IMAGES = " + it.count)
                Log.d("Vaultly", "TOTAL IMAGES = ${it.count}")

                val idColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Images.Media._ID
                    )

                val nameColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Images.Media.DISPLAY_NAME
                    )

                while (it.moveToNext()) {

                    val image = Arguments.createMap()

                    val imageId =
                        it.getLong(idColumn)

                    val contentUri =
                        ContentUris.withAppendedId(
                            MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                            imageId
                        )

                    image.putString(
                        "id",
                        imageId.toString()
                    )

                    image.putString(
                        "name",
                        it.getString(nameColumn)
                    )

                    image.putString(
                        "uri",
                        contentUri.toString()
                    )

                    images.pushMap(image)
                }
            }

            promise.resolve(images)

        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }
    @ReactMethod
    fun getVideos(promise: Promise) {

        try {

            val videos = Arguments.createArray()

            val projection = arrayOf(
                MediaStore.Video.Media._ID,
                MediaStore.Video.Media.DISPLAY_NAME
            )

            val cursor = reactApplicationContext.contentResolver.query(
                MediaStore.Video.Media.EXTERNAL_CONTENT_URI,
                projection,
                null,
                null,
                null
            )

            cursor?.use {

                Log.d("Vaultly", "TOTAL VIDEOS = ${it.count}")

                val idColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Video.Media._ID
                    )

                val nameColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Video.Media.DISPLAY_NAME
                    )

                while (it.moveToNext()) {

                    val video = Arguments.createMap()

                    val videoId =
                        it.getLong(idColumn)

                    val contentUri =
                        ContentUris.withAppendedId(
                            MediaStore.Video.Media.EXTERNAL_CONTENT_URI,
                            videoId
                        )

                    video.putString(
                        "id",
                        videoId.toString()
                    )

                    video.putString(
                        "name",
                        it.getString(nameColumn)
                    )

                    video.putString(
                        "uri",
                        contentUri.toString()
                    )

                    videos.pushMap(video)
                }
            }

            promise.resolve(videos)

        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }
    @ReactMethod
    fun getPdfs(promise: Promise) {

        try {

            val filesArray = Arguments.createArray()

            val projection = arrayOf(
                MediaStore.Files.FileColumns._ID,
                MediaStore.Files.FileColumns.DISPLAY_NAME,
                MediaStore.Files.FileColumns.MIME_TYPE
            )

            val cursor =
                reactApplicationContext.contentResolver.query(
                    MediaStore.Files.getContentUri("external"),
                    projection,
                    null,
                    null,
                    null
                )

            cursor?.use {

                val idColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Files.FileColumns._ID
                    )

                val nameColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Files.FileColumns.DISPLAY_NAME
                    )

                val mimeColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Files.FileColumns.MIME_TYPE
                    )

                while (it.moveToNext()) {

                    val file = Arguments.createMap()

                    file.putString(
                        "id",
                        it.getLong(idColumn).toString()
                    )

                    file.putString(
                        "name",
                        it.getString(nameColumn)
                    )

                    file.putString(
                        "mime",
                        it.getString(mimeColumn)
                    )

                    filesArray.pushMap(file)
                }
            }

            promise.resolve(filesArray)

        } catch (e: Exception) {

            promise.reject("ERROR", e)

        }
    }
}