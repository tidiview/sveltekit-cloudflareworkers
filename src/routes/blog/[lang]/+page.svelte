<script>
	/** @type {import('./$types').PageData} */
    export let data;
    export let section;
    export let lang = data.params.lang;
</script>

from [section] / [lang] / index.svelte,<br/>
this is: <br/>
<pre>{section}   /   {lang}<br/></pre>
<pre>[section]   /   [lang]<br/></pre>
<br/>
with:
<pre>[section]: {section}</pre>
<pre>[lang]: {lang}</pre>

prout blog