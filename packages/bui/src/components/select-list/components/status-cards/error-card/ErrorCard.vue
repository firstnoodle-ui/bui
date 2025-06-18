<template>
    <StatusCard :status="message" variant="error">
        <svg width="37" height="50" viewBox="0 0 37 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5369 1.94446C15.5369 1.94446 5.52391 3.36996 1.83341 15.1295C-1.27759 25.042 3.94441 41.9445 23.2614 46.1665" stroke="#C44836" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M25.9997 48.1889C27.5125 48.1889 28.7387 46.9626 28.7387 45.4499C28.7387 43.9372 27.5125 42.7109 25.9997 42.7109C24.487 42.7109 23.2607 43.9372 23.2607 45.4499C23.2607 46.9626 24.487 48.1889 25.9997 48.1889Z" stroke="#C44836" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M14.6998 23.153C17.4629 23.153 19.7028 20.9131 19.7028 18.15C19.7028 15.3869 17.4629 13.147 14.6998 13.147C11.9367 13.147 9.69678 15.3869 9.69678 18.15C9.69678 20.9131 11.9367 23.153 14.6998 23.153Z" stroke="#C44836" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M21.7593 25.4259C21.7593 25.4259 23.8148 28.5369 27.7498 27.7224" stroke="#C44836" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M22.7901 34.6389C29.0291 33.0074 31.2711 28.0774 31.7481 24.8944C31.7841 24.6529 31.9971 24.4779 32.2406 24.4779H34.6821C35.3996 24.4779 35.9811 23.8964 35.9811 23.1789C35.5506 19.5239 32.4851 5.23991 23.6876 2.17041C23.3106 2.03891 22.9346 2.38891 23.0396 2.77441C26.3746 15.0469 19.7031 18.1499 19.7031 18.1499" stroke="#C44836" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>
    </StatusCard>
</template>

<script setup lang="ts">
import { StatusCard } from "../status-card";
defineProps<{ message:string }>();
</script>