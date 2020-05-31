<template>
	<div style="width: 300px; height: 350px; margin: 5px">

		<div class="d-flex justify-content-center" style="background-color: lightgrey;">

			<h1 style="margin-top: 10px; margin-bottom: 10px">omniSyncr</h1>
		</div>
		<div style="height: 30px;">
        		</div>

		<router-view></router-view>


	</div>
</template>

<script>
export default {
	data: function () {
		return {

		}
	}
}
</script>

<style lang="scss" scoped>
p {
	font-size: 20px;
}
</style>
