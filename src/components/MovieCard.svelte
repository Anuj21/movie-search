<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ISearchedMoveis } from '../routes/search/[id].svelte';

	export let movie: ISearchedMoveis;
</script>

<a
	class="p-6 bg-white text-center rounded-md shadoow-sm hover:shadow-md flex flex-col items-center"
	href={`/movie/${movie.imdbID}`}
	transition:fade
>
	<img class="mb-2 h-40v" src={movie.Poster} alt={movie.Title} />
	<h2 class="capitalize text-2xl">{movie.Title} ({movie.Type})</h2>
</a>
