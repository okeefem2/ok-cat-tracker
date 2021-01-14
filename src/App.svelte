<script lang='ts'>
    import { format } from 'date-fns';
    import { auth, db } from './firebase';
    import { authState } from 'rxfire/auth';
    import PortionTable from './PortionTable/PortionTable.svelte';
    const today = format(new Date(), 'yyyy-MM-dd');

    let email = '';
    let password = '';
    let user;

    authState(auth).subscribe(u => user = u);
    let portions = 1;

    function signIn() {
        if (email && password) {
            auth.signInWithEmailAndPassword(email, password);
            (email = undefined), (password = undefined);
        }
    }

    function signUp() {
        if (email && password) {
            auth.createUserWithEmailAndPassword(email, password);
            (email = undefined), (password = undefined);
        }
    }


    function updatePortions(mod = 1) {
        if (portions > 1 || mod === 1) {
            portions += mod;
        }
    }

    function feedKitties() {
        const feeding = {
            date: today,
            portions,
            time: format(new Date(), 'yyyy-MM-dd HH:mm '),
        };
        db.collection(`users/${user.uid}/feedings`).add(feeding);
    }
</script>

<style lang='scss' global>
    @import 'index';
</style>

<main>
    {#if user}
        <h1>Cat Tracker {today}</h1>

        <div class='row'>
            <button
                class='button right-spaced'
                on:click={() => updatePortions(-1)}>Less</button>
            <p class='portions right-spaced'>{portions} Portions</p>
            <button
                class='button'
                on:click={() => updatePortions(1)}>More</button>
        </div>
        <div class='row'>
            <button class='button' on:click={feedKitties}>Feed</button>
        </div>

        <PortionTable uid={user.uid}/>
    {:else}
        <div class='row sign-in-row'>
            <div class='input-field right-spaced'>
                <input
                    type='email'
                    name='email'
                    bind:value={email}
                    class={email ? 'has-value' : ''} />
                <span class='bar' />
                <label for='email' class='input-label'>Email</label>
            </div>
            <div class='input-field right-spaced'>
                <input
                    type='password'
                    name='password'
                    bind:value={password}
                    class={password ? 'has-value' : ''} />
                <span class='bar' />
                <label for='password' class='input-label'>Password</label>
            </div>
            <button
                class='button right-spaced'
                on:click={signIn}
                disabled={!email || !password}>
                Sign In
            </button>
            <p class='right-spaced'>Or</p>
            <button
                class='button'
                on:click={signUp}
                disabled={!email || !password}>
                Sign Up
            </button>
        </div>
    {/if}
</main>
