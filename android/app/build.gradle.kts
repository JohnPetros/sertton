import java.util.Properties
import java.io.FileInputStream

plugins {
  id("com.android.application")
  id("kotlin-android")
  id("dev.flutter.flutter-gradle-plugin")
}

val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("key.properties")
val hasKeystore = keystorePropertiesFile.exists()

if (hasKeystore) {
  keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}

android {
  namespace = "br.com.sertton.sertton"
  compileSdk = flutter.compileSdkVersion
  ndkVersion = flutter.ndkVersion

  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }

  kotlinOptions { jvmTarget = JavaVersion.VERSION_17.toString() }

  defaultConfig {
    applicationId = "br.com.sertton.sertton"
    minSdk = flutter.minSdkVersion
    targetSdk = flutter.targetSdkVersion
    versionCode = flutter.versionCode
    versionName = flutter.versionName
  }

  signingConfigs {
    if (hasKeystore) {
      create("release") {
        fun req(name: String) =
          keystoreProperties.getProperty(name)
            ?: error("Missing '$name' in android/key.properties")

        keyAlias = req("keyAlias")
        keyPassword = req("keyPassword")
        storeFile = file(req("storeFile"))
        storePassword = req("storePassword")
      }
    }
  }

  buildTypes {
    release {
      // só aplica se existir
      if (hasKeystore) {
        signingConfig = signingConfigs.getByName("release")
      }
      isMinifyEnabled = false
      isShrinkResources = false
    }
  }
}

flutter { source = "../.." }
