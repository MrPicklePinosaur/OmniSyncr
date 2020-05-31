<template>
    <div>
        <h1>Room</h1>

        <p v-text="roomCode"></p>

        <div>
            <p>currently watching:</p>
            <p v-if="currentlyWatching!=null" v-text="currentlyWatching"></p>
            <p v-else>Nothin :(</p>
        </div>


        <div class="card">
            <ul class="list-group list-group-flush">

                <li class="list-group-item" v-for="(member,i) in members" v-bind:key="i">{{member.name}}</li>

            </ul>
        </div>

        <button type="button" class="btn btn-warning">Leave room</button>

    </div>
</template>

<script>

/*
Room code
List of ppl in room
Leave room

*/
export default {
    name: 'Room',

    data: function() {
        return {
            
        }
    },

    methods: {

        leaveRoom: function() {

            //send request

            //redirect

        }
    }
}
</script>

<style lang="scss" scoped>
p {
	font-size: 20px;
}
</style>