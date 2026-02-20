<script lang="ts" setup>
definePageMeta({ layout: "page" });

const targetYears = ref<string[]>([]);

const {
	filteredGroupedImages,
	pending,
	error: _error,
	selectedYears,
	selectedAuthors,
	availableAuthors,
	availableYears,
} = useBestvinaImages("gallery", targetYears, { enableUrlSync: true });
</script>

<template>
	<UPage>
		<UPageHeader title="Galerie" />
		<UPageBody>
			<div class="grid grid-cols-1 lg:grid-cols-4">
				<div
					ref="sidebar"
					class="lg:sticky lg:top-(--ui-header-height) h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 p-4"
				>
					<p class="text-xl font-bold md:col-span-2 lg:col-span-1">
						Filtrování
					</p>
					<UFormField
						class="w-full"
						label="Filtrovat podle ročníku"
					>
						<USelectMenu
							v-model="selectedYears"
							:items="availableYears"
							:search-input="{ autofocus: false }"
							:ui="{
								value: 'text-ellipsis text-start',
							}"
							class="w-full"
							multiple
							placeholder="Všechny ročníky"
						/>
					</UFormField>
					<UFormField
						class="w-full"
						label="Filtrovat podle autora"
					>
						<USelectMenu
							v-model="selectedAuthors"
							:items="availableAuthors"
							:search-input="{ autofocus: false }"
							:ui="{
								value: 'text-ellipsis text-start',
							}"
							class="w-full"
							label-key="name"
							multiple
							placeholder="Všichni autoři"
							value-key="shortcut"
						/>
					</UFormField>
				</div>

				<ClientOnly>
					<div
						v-if="pending"
						class="w-full h-full flex flex-row justify-center items-center my-16 lg:col-span-3"
					>
						<UIcon
							class="text-muted"
							name="i-svg-spinners-bars-scale-middle"
							size="48"
						/>
					</div>

					<div
						v-else
						class="px-4 lg:col-span-3"
					>
						<JustifiedImageLayout
							:grouped-images="filteredGroupedImages"
						>
							<template #empty>
								<UEmpty
									description="Těmto filtrům neodpovídají žádné fotky. Zkus některé filtry odebrat!"
									icon="i-mdi-filter-variant-remove"
									title="Kde nic, tu nic..."
								/>
							</template>
						</JustifiedImageLayout>
					</div>
				</ClientOnly>
			</div>
		</UPageBody>
	</UPage>
</template>

<style scoped />
