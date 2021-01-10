<script lang="ts">
	import { format } from 'date-fns';
	import PortionListItem from './PortionListItem.svelte';
	const today = format(new Date, 'yyyy-MM-dd');
	const portions = 1;
	interface Feeding {
		time: string;
		portions: number;
	}

	const feedings = Array.from({ length: 1000 }, () => ({ time: today, portions: 1 }));
</script>

<main>
	<h1>Cat Tracker {today}</h1>

	<div class="row">
		<button>Less</button>
		<p class="portions">{ portions } Portions</p>
		<button>More</button>
	</div>
	<div class="row">
		<button>Feed</button>
	</div>

	<div class="portions-table-container">
		<button>Today</button>
		<input type="date" value="{today}"/>
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

<style lang="scss">
	:global {
		@import 'index.scss';
	}

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
	}
	.portions-table {
		overflow-y: atuo;
		width: 100%;
	}
	table, tr {
		width: 100%;
	}

	tr {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
