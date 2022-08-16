<script>
	/** @type {import('./$types').PageData} */
    export let data;
    export let lang = data.params.lang;
	// console.log(data);
</script>

this is: <br/>
<pre>c-u / {lang}<br/></pre>
<pre>c-u / [lang]<br/></pre>
<br/>
with:
<pre>[lang]: {lang}</pre>