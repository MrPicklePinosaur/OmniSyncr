<template>
    <div>
        <h1>Room</h1>

        <p v-text="roomCode"></p>

        <div>
            <p>currently watching:</p>
            <h4 v-text="currentlyWatching"></h4>
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
            roomCode: 'Room code',
            currentlyWatching: 'YESTERDAY WO UTATTE EPISODE 9 ENGLISH SUBBED',
            members: [
                {
                    name: 'Nithin',
                    privilege: 'viewer',
                },
                {
                    name: 'Noor',
                    privilege: 'owner',
                },
            ],
        }
    },

    methods: {
        leaveRoom: function() {
            
        }
    }
}
</script>

<style lang="scss" scoped>
p {
	font-size: 20px;
}
</style>