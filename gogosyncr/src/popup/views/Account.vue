<template>
    <div>

        <p v-text="nameField"></p>
        <input type="text" class="form-control" placeholder="username" v-model="nameField">
        <button type="button" class="btn btn-primary" @click="onCreateAccountButtonClicked">Create Account!</button>

    </div>
</template>

<script>
export default {
    name: 'Account',

    data: function() {
        return {
            nameField: '',
        }
        
    },

    
    methods: {
        onCreateAccountButtonClicked: function() {
            this.$store.commit('setUsername',{"username": this.nameField});

            //push to main page
            this.$router.push('/popup/popup.html');
        }
    }
    


}
</script>

<style lang="scss" scoped>
p {
	font-size: 20px;
}
</style>
