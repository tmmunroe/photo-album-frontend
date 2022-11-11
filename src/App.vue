<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  
      <nav class="navbar fixed-top navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="60" height="60"/>
          </a>
          <a class="navbar-brand"> PhotoAlbum </a>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
              <a class="nav-link" href="/search">Search</a>
              <a class="nav-link" href="/upload">Upload</a>
            </div>
          </div>
        </div>
      </nav>

  <main class="container" style="margin-top: 90px;">
    <div class="container-fluid">
      <RouterView />
    </div>
  </main>
</template>

<style scoped> </style>
