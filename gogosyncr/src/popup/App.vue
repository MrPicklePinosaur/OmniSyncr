<template>
	<div style="width: 250px; height: 400px; margin: 5px">
		
		<div class="d-flex justify-content-center" style="background-color: lightgrey;">
			<h1 style="margin-top: 10px; margin-bottom: 10px">VidSyncr</h1>
		</div>



		<div class="navbar">

			<div>

				<router-link to="/popup/popup.html">Home</router-link>
				<router-link to="/popup/popup.html/test">Test</router-link>
				<router-link to="/popup/popup.html/room">Room</router-link>

			</div>

		</div>

		<router-view></router-view>

		<div></div>

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
