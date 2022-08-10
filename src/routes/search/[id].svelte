<script context="module" lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	export let SearchedMovies: Writable<Array<ISearchedMoveis>> = writable([]);

	export interface ISearchedMoveis {
		Poster: string;
		Title: string;
		Type: string;
		Year: string;
		imdbID: string;
	}

	export async function load({ fetch, params }: { fetch: any; params: any }) {
		const res = await fetch(`https://omdbapi.com/?s=${params.id}&apikey=6c3a2d45`);

		const data = await res.json();
		SearchedMovies.set(data.Search);
	}
</script>

<script lang="ts">
	import MovieCard from '../../components/MovieCard.svelte';
</script>

<section>
	<button
		type="button"
		on:click={() => goto('/')}
		class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
	>
		<svg
			aria-hidden="true"
			class="ml-2 -mr-1 w-5 h-5"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
			/>
		</svg>
		<span class="ml-2">Back to search</span>
	</button>
	{#if $SearchedMovies}
		<div class="py-4 grid gap-4 md:grid-cols-3 grid-cols-2">
			{#each $SearchedMovies as movie}
				<MovieCard {movie} />
			{/each}
		</div>
	{:else}
		<div class="w-full flex items-center justify-center h-80v ">No results found !!!</div>
	{/if}
</section>
