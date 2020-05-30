<template>
    <div>
        <h1>Room</h1>

        <p v-text="roomCode"></p>

        <ul>
            <li v-for="(member,i) in members" v-bind:key="i">{{member.name}}</li>
        </ul>

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
            members: [
                {
                    name: 'Nithin',
                },
                {
                    name: 'Noor',
                },
            ],
        }
    }
}
</script>

<style lang="scss" scoped>
p {
	font-size: 20px;
}
</style>