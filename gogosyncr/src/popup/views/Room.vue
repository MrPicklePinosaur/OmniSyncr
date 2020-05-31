<template>
    <div>

    <div v-if="room_info!=null">

        <p style="padding-left:65px" >Room Code: {{room_info.code}}</p>
        <!--div>
                    <p>currently watching:</p>
                    <p v-if="currentlyWatching!=null" v-text="currentlyWatching"></p>
                    <p v-else>Nothin :(</p>
                </div-->


                <div class="card">
                    <ul class="list-group list-group-flush">

                        <li class="list-group-item" v-for="(member,i) in members" v-bind:key="i">{{member}}</li>

                    </ul>
                </div>


        <div style="padding-left:85px">
         <button type="button" class="btn btn-warning" @click="leaveRoom">Leave room</button>
        </div>




    </div>


    <div v-else>
        <p>Whoops, you are not in a room</p>
    </div>

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

    computed: {
        room_info: function() {
            return this.$store.state.room_info;
        },
        members: function() {
            return this.$store.state.members;
        }
    },

    methods: {

        leaveRoom: function() {
            this.$router.push('/popup/popup.html');
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