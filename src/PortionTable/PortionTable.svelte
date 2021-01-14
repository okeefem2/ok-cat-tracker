<script>
    import { format } from 'date-fns';
    import PortionListItem from './PortionListItem.svelte';
    import { db } from '../firebase';
    import { startWith, map, switchMap } from 'rxjs/operators';
    import { collectionData } from 'rxfire/firestore';
    import { BehaviorSubject } from 'rxjs';

    export let uid;

    const today = format(new Date(), 'yyyy-MM-dd');

    let historyDate = today;

    const query = new BehaviorSubject(historyDate);

    const feedings = query.pipe(
        map(date => db.collection(`users/${uid}/feedings`).where('date', '==', date)),
        switchMap(q => collectionData(q)),
        startWith([])
    );

    function setFeedingHistoryToToday() {
        query.next(today);
    }

    function updateFeedingsHistory() {
        query.next(historyDate);
    }
</script>

<div class="portion-table-container">
    <div class="table-row">
        <button class="button"on:click={setFeedingHistoryToToday}>Today</button>
        <div class="search-input-row">
            <div class="input-field right-spaced">
                <input type="date" bind:value="{historyDate}" name="date" class={historyDate ? 'has-value' : ''}/>
                <span class="bar"></span>
                <label for="date" class="input-label">Select Date</label>
            </div>
            <button class="button" on:click={updateFeedingsHistory}>Set Date</button>
        </div>
    </div>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Portions</th>
                </tr>
            </thead>
            <tbody>
                {#each $feedings as feeding}
                    <PortionListItem time={feeding.time} portions={feeding.portions}/>
                {/each}
            </tbody>
        </table>
    </div>
</div>


<style lang='scss'>
    @import '../scss/variables';
    @import 'portion-table';
</style>
