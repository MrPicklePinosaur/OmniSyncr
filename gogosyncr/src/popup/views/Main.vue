<template>
    <div class="container" style="text-align: center">

        <button type="button" class="btn btn-primary" @click="createRoom">Create Room</button>
        
        <p> - OR - </p>

        <div class="container">
            <div class="col"><button type="button" class="btn btn-primary" @click="onJoinRoomButtonSubmit">Join Room</button></div>
            <div class="col"><input type="text" class="form-control" placeholder="room code" v-model="joinRoomCode"></div>
        </div>
        
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
            this.$store.dispatch('joinRoom',{"code": this.joinRoomCode});
            
        },

    },
}
</script>

<style lang="scss" scoped>
p {
	font-size: 20px;
}
</style>