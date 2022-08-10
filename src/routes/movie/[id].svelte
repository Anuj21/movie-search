<script context="module" lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { goto, afterNavigate } from '$app/navigation';
	export let movieDetail: Writable<IMovieDetail> = writable();
	export interface Rating {
		Source: string;
		Value: string;
	}

	export interface IMovieDetail {
		Title: string;
		Year: string;
		Rated: string;
		Released: string;
		Runtime: string;
		Genre: string;
		Director: string;
		Writer: string;
		Actors: string;
		Plot: string;
		Language: string;
		Country: string;
		Awards: string;
		Poster: string;
		Ratings: Rating[];
		Metascore: string;
		imdbRating: string;
		imdbVotes: string;
		imdbID: string;
		Type: string;
		DVD: string;
		BoxOffice: string;
		Production: string;
		Website: string;
		Response: string;
	}

	export async function load({ fetch, params }: { fetch: any; params: any }) {
		const res = await fetch(`https://omdbapi.com/?i=${params.id}&apikey=6c3a2d45`);

		const data = await res.json();
		console.log(data);
		movieDetail.set(data);
	}
</script>

<script lang="ts">
	import Fa from 'svelte-fa';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

	let previousPage: string;
	let displayFullPlot: boolean = false;
	let isPlotTooLong: boolean;
	afterNavigate((navigaton) => {
		previousPage = navigaton.from?.pathname || '';
	});

	export function toggleDisplay(plot: string) {
		displayFullPlot = !displayFullPlot;
		displayPlot(plot, displayFullPlot);
	}

	export function displayPlot(plot: string, displayFull: boolean): string {
		if (plot.length > 200) {
			isPlotTooLong = true;
		} else {
			isPlotTooLong = false;
		}
		if (plot.length > 200 && !displayFull) {
			return plot.substring(0, 200).concat('...');
		}
		return plot;
	}
</script>

<section>
	<div
		class="flex p-6 w-full bg-white text-center rounded-md shadoow-sm hover:shadow-md flex flex-col items-center m-auto mt-6"
	>
		<div class="relative w-full">
			<a class="absolute left-0" href={previousPage}>
				<!-- <Fa icon={faArrowLeft} /> -->
				<span>back</span>
			</a>
			<h1 class="text-4xl text-center uppercase mb-6">{$movieDetail.Title}</h1>
		</div>
		<div class="grid grid-cols-3 gap-2">
			<img class="card-image mb-8" src={$movieDetail.Poster} alt={$movieDetail.Title} />
			<ul class="text-left col-span-2">
				<li class="m-4">
					<strong>Release Date:</strong>
					{$movieDetail.Released}
				</li>
				<li class="m-4">
					<strong>Box Office:</strong>
					{$movieDetail.BoxOffice}
				</li>
				<li class="m-4">
					<strong>Language:</strong>
					{$movieDetail.Language}
				</li>
				<li class="m-4">
					<strong>Country:</strong>
					{$movieDetail.Country}
				</li>
				<li class="m-4">
					<strong>Director:</strong>
					{$movieDetail.Director}
				</li>
				<li class="m-4">
					<strong>Actors:</strong>
					{$movieDetail.Actors}
				</li>
				<li class="m-4">
					<strong>Writer:</strong>
					{$movieDetail.Writer}
				</li>
				<li class="m-4">
					<strong>Plot:</strong>
					{displayPlot($movieDetail.Plot, displayFullPlot)} <br />
					{#if isPlotTooLong}
						<button
							class="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							on:click={() => toggleDisplay($movieDetail.Plot)}
						>
							{#if !displayFullPlot}
								read more
							{:else}
								collapse
							{/if}
						</button>
					{/if}
				</li>
			</ul>
		</div>
	</div>
</section>
