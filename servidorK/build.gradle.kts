val ktorVersion: String by project
val kotlinVersion: String by project
val logbackVersion: String by project
val postgresVersion : String by project
val h2Version : String by project
val exposedVersion : String by project

plugins {
    application
    kotlin("jvm") version "1.8.21"
    id("io.ktor.plugin") version "2.3.0"
    id("org.jetbrains.kotlin.plugin.serialization") version "1.8.21"
}

group = "com.example"
version = "0.0.1"
application {
    mainClass.set("io.ktor.server.netty.EngineMain")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {

    //Ktor
    implementation("io.ktor:ktor-server-content-negotiation-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-core-jvm:$ktorVersion")
    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-netty-jvm:$ktorVersion")
    implementation("ch.qos.logback:logback-classic:$logbackVersion")

    //Base de datos
    implementation("org.postgresql:postgresql:$postgresVersion")
    implementation("com.h2database:h2:$h2Version")
    implementation("mysql:mysql-connector-java:8.0.22")

    //ORM Exposed
    implementation("org.jetbrains.exposed:exposed-core:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-dao:$exposedVersion")

    //Manejar el Pool de Conexiones
    implementation("com.zaxxer:HikariCP:5.0.1")

    //Imprimir mensajes en consola
    implementation("io.github.microutils:kotlin-logging-jvm:2.1.20")

    //BCrypt
    implementation("at.favre.lib:bcrypt:0.9.0")

    // Para manejar las fechas
    implementation("org.jetbrains.exposed:exposed-java-time:$exposedVersion")


    //Enviroment
    implementation("io.github.cdimascio:dotenv-kotlin:6.4.0")


    //Test
    testImplementation("io.ktor:ktor-server-tests-jvm:$ktorVersion")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlinVersion")

    //Cors
    implementation("io.ktor:ktor-server-cors-jvm:$ktorVersion")


    //MAIL
    implementation("com.sun.mail:javax.mail:1.6.2")
    implementation("javax.mail:javax.mail-api:1.6.2")
    implementation("com.sun.mail:javax.mail:1.6.2")


    //Gson
    implementation ("com.google.code.gson:gson:2.10.1")


    //Token
    implementation ("io.jsonwebtoken:jjwt-api:0.11.2")
    runtimeOnly ("io.jsonwebtoken:jjwt-impl:0.11.2")
    runtimeOnly ("io.jsonwebtoken:jjwt-jackson:0.11.2")
}