<script lang="ts" setup>
import { onMounted } from "#imports";

const appContainer = useTemplateRef<HTMLElement>("app-container");
onMounted(() => {
	useNuxtApp().provide("appContainer", appContainer);
	console.log(appContainer.value);
});
</script>

<template>
	<div
		ref="app-container"
		class="h-[100vh] overflow-y-auto"
	>
		<UApp>
			<NuxtLoadingIndicator
				:height="
					2"
				color="var(--ui-secondary)"
			/>

			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</UApp>
	</div>
</template>
