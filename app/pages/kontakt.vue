<script lang="ts" setup>
import type { ButtonProps } from "#ui/components/Button.vue";

definePageMeta({
	layout: "page",
});

const contactAction: ButtonProps = {
	label: "Napsat mail",
	icon: "i-lucide-mail-plus",
	color: "secondary",
	variant: "outline",
	to: "mailto:ferencij@vscht.cz",
};

const img = useImage();

const contacts = ref([
	{
		name: "Jan Kotek",
		role: "hlavní vedoucí",
		organization: "Katedra anorganické chemie,\nPřírodovědecká fakulta Univerzita Karlova",
		address: "Hlavova 2030/8\n128 00, Praha 2",
		img: "imgs/people/contacts/kotek_jan.jpg",
		email: "modrej@natur.cuni.cz",
	},
	{
		name: "Zuzana Kotková",
		role: "tajemnice Chemické olympiády",
		organization: "Ústav učitelství chemie a humanitních věd,\nVysoká škola chemicko-technologická v Praze",
		address: "Technická 5\n168 28, Praha 6",
		img: "imgs/people/contacts/kotkova_zuzana.jpg",
		email: "Zuzana.Kotkova@vscht.cz",
	},
	{
		name: "Lenka Libusová",
		role: "tajemnice Biologické olympiády",
		organization: "Katedra buněčné biologie,\nPřírodovědecká fakulta Univerzita Karlova",
		address: "Viničná 7\n128 04, Praha 2",
		img: "imgs/people/contacts/libusova_lenka.jpg",
		email: "lenka.libusova@natur.cuni.cz",
	},
]);
</script>

<template>
	<UPage>
		<UPageHeader
			title="Kontakt"
		/>
		<UPageBody>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full justify-items-stretch items-stretch gap-8 lg:gap-16">
				<UCard
					v-for="(person, i) in contacts"
					:key="i"
					:ui="{
						root: 'bg-muted flex flex-col justify-between',
						header: 'flex flex-col items-center',
						body: '',
						footer: 'flex flex-col items-center gap-4',
					}"
				>
					<template #header>
						<NuxtImg
							:placeholder="img(person.img, { }, { preset: 'thumbnailXXSm' })"
							:src="person.img"
							class="object-cover rounded-full w-2/3 aspect-square"
							preset="thumbnailMd"
						/>
						<p
							class="mt-8 text-highlighted text-2xl font-bold"
						>
							{{ person.name }}
						</p>
						<p
							class="text-muted text-center"
						>
							{{ person.role }}
						</p>
					</template>

					<template #default>
						<!--						<div class="flex flex-col gap-4 text-center whitespace-pre-wrap"> -->
						<!--							<p class="font-"> -->
						<!--								{{ person.organization }} -->
						<!--							</p> -->
						<!--							<p class="text-muted"> -->
						<!--								{{ person.address }} -->
						<!--							</p> -->
						<!--						</div> -->
						<CardAddressBlock
							:name="person.organization"
							:street="person.address"
							class="whitespace-pre-wrap"
							size="sm"
						/>
					</template>

					<template #footer>
						<div class="flex flex-row-reverse justify-center gap-4 w-full">
							<UButton
								:to="`mailto:${person.email}`"
								color="secondary"
								icon="i-mdi-email"
								label="Napsat"
								variant="solid"
							/>
							<UInput
								v-model="person.email"
								:ui="{ trailing: 'pr-0.5', root: 'w-3/5', base: 'w-full text-center' }"
								disabled
								size="lg"
								variant="outline"
							>
								<template
									v-if="person.email?.length"
									#trailing
								>
									<CopyButton
										:value="person.email"
									/>
								</template>
							</UInput>
						</div>
					</template>
				</UCard>
			</div>

			<!--			<InDevelopment
				:action="contactAction"
				description="Na této stránce se usilovně pracuje a není proto ještě dostupná. 😢 Pokud mátě jakékoli otázky, kontaktujte mě pomocí tlačítka níže."
			/> -->
		</UPageBody>
	</UPage>
</template>
