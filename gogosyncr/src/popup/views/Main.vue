<template>
    <div>
        <h1>Main</h1>

        <button type="button" class="btn btn-primary" @click="createRoom">Create Room</button>
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
            this.$store.dispatch('createRoom');
        },

        onJoinRoomButtonSubmit: function() {
            console.log(`Trying to join room with code ${this.joinRoomCode}`);
            //dispatch the ting

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