<script lang="ts" setup>
const features = ref([
	{
		title: "Nové znalosti a dovednosti",
		description:
        "Během čtrnácti dní se naučíš obrovské množství nových informací, "
        + "které uplatníš nejen v dalších ročnících olympiád, "
        + "ale také třeba ve škole nebo i při poznávání světa kolem nás. "
        + "Mnohdy jde o témata, kterým se běžně na střední škole ani nevěnuje čas, což ti dá velkou výhodu v budoucím životě.",
		icon: "i-lucide-book-open-text",
	},
	{
		title: "Přátelé na celý život",
		description:
        "Každé létu se na Běstvině sejde přes 120 nadšenců jako ty! "
        + "Najít si mezi nimi někoho, s kým by sis sedl, je statisticky téměř nemožné. "
        + "Většina bývalých účastníků si zde našla přátele, ba i partnera/ku na celý život. "
        + "S některými navíc můžeš sdílet i svůj budoucí život na vysoké škole.",
		icon: "i-lucide-hand-heart",
	},
	{
		title: "Seznámení se s budoucími učiteli",
		description:
        "Těš se na přednášky od vyučujících přímo z vysokých škol – dost možná i z tvé budoucí alma mater. "
        + "Díky tomu si vybuduješ užitečné kontakty ještě před nástupem na univerzitu, což ti budou spolužáci závidět. "
        + "Kdo z nich se může pochlubit, že si tyká s profesorem?! A co víc, tyto kontakty jsou skvělá výhoda, "
        + "pokud chceš v budoucích letech řešit SOČku.",
		icon: "i-mdi-university-outline",
	},
]);

const links: ButtonProps[] = ref([
	{
		color: "secondary",
		label: "Chci vědět víc",
		to: "/informace",
		trailingIcon: "i-lucide-arrow-right",
		variant: "outline",
	},
]);
</script>

<template>
	<UPageSection
		:features="features"
		:links="links"
		title="Tři důvody proč jet na Běstvinu..."
	/>
</template>

<style scoped>

</style>
