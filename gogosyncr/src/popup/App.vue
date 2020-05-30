<template>
	<div style="width: 250px; height: 400px;">
		
		<div class="container">
			<h1>gogoSyncr</h1>
		</div>

		<nav class="navbar">

			<ul class="navbar-nav">

				<li><router-link to="/">Home</router-link></li>
				<li><router-link to="/test">Test</router-link></li>
				<li><router-link to="/room">Room</router-link></li>

			</ul>

		</nav>

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
