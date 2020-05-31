<template>
    <div>
        <h1>Main</h1>

        <button type="button" class="btn btn-primary">Create Room</button>
        <br>

        <b-form @sumbit="onSubmit" @reset="onReset">
            <b-form-group
                id="join-room-form-group"
            >
                <b-form-input
                    id="join-room-field"
                    v-model="joinRoomCode"
                    type="text"
                    required
                    placeholder="Room Code"
                ></b-form-input>
            
            </b-form-group>


            <b-button type="submit" variant="primary">Join Room</b-button>
        </b-form>
        
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
        onSubmit: function(evt) {
            evt.preventDefault();
            console.log(`Trying to join room with code ${this.joinRoomCode}`);
        },
        onReset: function(evt) {
            evt.preventDefault();
            this.joinRoomCode = ''
        }
    },
}
</script>

<style lang="scss" scoped>
p {
	font-size: 20px;
}
</style>