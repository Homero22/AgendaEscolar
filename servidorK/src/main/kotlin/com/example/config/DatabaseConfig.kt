package com.example.config

interface DatabaseConfig {
    val url: String;
    val driver: String;
    val user: String;
    val password: String;
}