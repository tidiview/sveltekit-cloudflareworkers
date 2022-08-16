<script>
	/** @type {import('./$types').PageData} */
    export let data;
    export let lang = data.params.lang;
	// console.log(data);
</script>

this is: <br/>
<pre>{lang}<br/></pre>
<pre>[lang]<br/></pre>
<br/>
with:
<pre>[lang]: {lang}</pre>