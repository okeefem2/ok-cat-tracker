<script lang="ts">
	import { format } from 'date-fns';
	import PortionListItem from './PortionListItem.svelte';
	const today = format(new Date, 'yyyy-MM-dd');
	const portions = 1;
	interface Feeding {
		time: string;
		portions: number;
	}

	const feedings = Array.from({ length: 10 }, () => ({ time: today, portions: 1 }));
</script>

<main>
	<h1>Cat Tracker {today}</h1>

	<div class="row">
		<button class="button">Less</button>
		<p class="portions">{ portions } Portions</p>
		<button class="button">More</button>
	</div>
	<div class="row">
		<button class="button">Feed</button>
	</div>

	<div class="portions-table-container table-row">
		<button class="button">Today</button>
		<input class="input-field" type="date" value="{today}" name="date"/>
	</div>

	<div class="portions-table-container">
		<table>
			<thead>
				<tr>
					<th>Time</th>
					<th>Portions</th>
				</tr>
			</thead>
			<tbody>
				{#each feedings as feeding}
					<PortionListItem {...feeding}/>
				{/each}
			</tbody>
		</table>
	</div>

</main>


<style lang="scss" global>
	@import "index.scss";

	main {
		height: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.portions {
		margin: 0 1rem;
	}

	.row {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.portions-table-container {
		width: 50%;
		display: flex;
	}

	table, tr {
		width: 100%;
	}

	tr, .table-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
