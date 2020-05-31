<template>
    <div>

        <input type="text" class="form-control" placeholder="username" v-model="nameField">
        <div style="padding-left:65px;padding-top:20px">
            <button type="button" class="btn btn-primary" @click="onCreateAccountButtonClicked">Create Account!</button>

        </div>


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
