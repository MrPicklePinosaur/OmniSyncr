<template>
    <div>
        <h1>Main</h1>

        <button type="button" class="btn btn-primary" @click="creatRoom">Create Room</button>
        <br>
        <button type="button" class="btn btn-primary" @click="onJoinRoomButtonSubmit">Join Room</button>
        <input type="text" class="form-control" placeholder="room code" v-model="joinRoomCode">
        
    </div>
</template>

<script>
export default {
    name: 'Main',

    data: function() {
        return {
            joinRoomCode: '',
        }
    },

    methods: {
        createRoom: function() {
            
            //send request - save room info

            //redirect to room page
        },

        onJoinRoomButtonSubmit: function() {
            console.log(`Trying to join room with code ${this.joinRoomCode}`);

            //send request

            //check if room was successfully joined

            //redirect to room page
        },

    },
}
</script>

<style lang="scss" scoped>
p {
	font-size: 20px;
}
</style>